<script lang="ts">
	import { LEGITIMOOSE_API, PLAYERDB_MC } from "#lib/constants.ts";
	import { resource } from "runed";
	import SearchInput from "./SearchInput.svelte";
	import SuggestionBox from "./SuggestionBox.svelte";
 
    type Props = {
        type: "world" | "player" | "any";
        onpick: (value: string) => void;
    }
 
    let { type, onpick }: Props = $props();
 
    const WORLD_UUID_REGEX = /^[0-9a-f]{8}(-?)(?:[0-9a-f]{4}\1){3}[0-9a-f]{12}$|^lobby$/i
    const AUTOCOMPLETE_LIMIT = 15;
 
    let input = $state("");
 
    const results = resource(
        () => input.trim(),
        async (value) => {
            if (value.length == 0) return []
            switch (type) {
                case "world": {
                    if (WORLD_UUID_REGEX.test(value)) {
                        const res = await fetch(`${LEGITIMOOSE_API}/v4/worlds/${encodeURIComponent(value)}?project=world_uuid,name,owner_name,icon&limit=${AUTOCOMPLETE_LIMIT}`);
                        return [await res.json()];
                    }
 
                    const url = new URL(`/v4/worlds/search?project=world_uuid,name,owner_name,icon&limit=${AUTOCOMPLETE_LIMIT}`, LEGITIMOOSE_API)
                    url.searchParams.append("query", value)
 
                    const res = await fetch(url);
                    return await res.json();
                }
                case "player": {
                    const values = [];
 
                    // Fetch autocomplete values
                    const legitidevsURL = new URL(`/v4/players/search?project=name,uuid&limit=${AUTOCOMPLETE_LIMIT}`, LEGITIMOOSE_API)
                    legitidevsURL.searchParams.append("query", value)
 
                    const legitidevsRes = await fetch(legitidevsURL);
                    values.push(...(await legitidevsRes.json()))
 
                    // Fetch playerdb for confirmation if player exists
                    const playerDBRes = await fetch(`${PLAYERDB_MC}/${encodeURIComponent(value)}`)
 
                    if (playerDBRes.ok) {
                        const playerDBJSON = await playerDBRes.json();
                        if (values.some(v => v.uuid == playerDBJSON.data.player.id)) return values;
                        values.push({
                            name: playerDBJSON.data.player.username,
                            uuid: playerDBJSON.data.player.id
                        })
                    }
 
                    return values;
                }
                case "any": {
                    return [value]
                }
            }
        },
        {
            debounce: 300,
            lazy: true
        }
    )
</script>
 
<SearchInput bind:value={input} />

<div class="picker-container">
    {#if results.loading}
        <span>Loading...</span>
    {:else if results.error}
        <span>An error occured: {results.error.message}</span>
    {:else}
        {#each results.current ?? [] as value}
            {#if type == "world"}
                <SuggestionBox
                    title={value.name}
                    subtitle={`by ${value.owner_name}`}
                    icon={`https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/${value.icon.replace("minecraft:", "")}.png`}
                    onclick={() => onpick(value.world_uuid)}
                />
            {:else if type == "player"}
                <SuggestionBox
                    title={value.name}
                    icon={`https://mc-heads.net/head/${value.uuid}/left`}
                    onclick={() => onpick(value.uuid)}
                />
            {:else if type == "any"}
                <SuggestionBox
                    title={value}
                    onclick={() => onpick(value)}
                />
            {/if}
        {/each}
    {/if}
</div>

<style>
    .picker-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        
        max-height: 400px;
        overflow-y: scroll;

        scroll-behavior: smooth;
        scrollbar-gutter: stable;
        scrollbar-color: #131314 transparent;
        scrollbar-width: thin;
        ::-webkit-scrollbar-button {
            display: none !important;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 0 !important;
        }
    }
</style>
 
