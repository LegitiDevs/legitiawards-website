<script lang="ts">
	import { LEGITIMOOSE_API, PLAYERDB_MC } from "#lib/constants.ts";
	import { resource } from "runed";

    type Props = {
        type: "world" | "player" | "any";
        input_value: string,
        returned_value?: any
    }

    let { type = "any", input_value = $bindable(), returned_value = $bindable() }: Props = $props();

    const WORLD_UUID_REGEX = /^[0-9a-f]{8}(-?)(?:[0-9a-f]{4}\1){3}[0-9a-f]{12}$|^lobby$/i
    const AUTOCOMPLETE_LIMIT = 15;

    let autocompleteValues = resource(
        () => input_value.trim(),
        async (value) => {
            if (value.length == 0) return []
            switch (type) {
                case "world": {
                    if (WORLD_UUID_REGEX.test(value)) {
                        const res = await fetch(`${LEGITIMOOSE_API}/v4/worlds/${encodeURIComponent(value)}?project=world_uuid,name,owner_name&limit=${AUTOCOMPLETE_LIMIT}`);
                        return [await res.json()];
                    }

                    const url = new URL(`/v4/worlds/search?project=world_uuid,name,owner_name&limit=${AUTOCOMPLETE_LIMIT}`, LEGITIMOOSE_API)
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
                    return [input_value]
                }
            }
        },
        {
            debounce: 300,
            lazy: true
        }
    )
</script>

<input bind:value={input_value} />
{#if autocompleteValues.loading}
    <span>Loading...</span>
{:else if autocompleteValues.error}
    <span>An error occured: {autocompleteValues.error.message}</span>
{:else}
    <ul>
        {#each autocompleteValues.current ?? [] as value }
            <li>{JSON.stringify(value)}</li>
        {/each}
    </ul>
{/if}