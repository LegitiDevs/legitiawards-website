<script lang="ts">
    import { LEGITIMOOSE_API, PLAYERDB_MC } from "#lib/constants.ts";
	import GoldLine from "#lib/components/GoldLine.svelte";
	import LegitiAwardsButton from "#lib/components/LegitiAwardsButton.svelte";
	import type { Votes } from "#lib/schemas/voting.ts";
	import { onMount } from "svelte";
	import SearchInput from "./SearchInput.svelte";
	import PickedNomineeVisual from "./PickedNomineeVisual.svelte";
	import SuggestionBox from "./SuggestionBox.svelte";
    import { resource } from "runed";
	import { redirect } from "@sveltejs/kit";
 
    type CategoryMetadata = {
        type: "world" | "player" | "any",
        title: string,
        description: string
    }
 
    type Categories = {
        order: (keyof Votes['categories'])[];
        categories: { [k: string]: CategoryMetadata };
    }
 
    let isFetchingCategories = $state(true);
    let categories: Categories = $state({} as Categories);
    
    let currentIndex = $state(0);
    let currentName = $derived(categories.order[currentIndex]);
    let currentCategory = $derived(categories.categories[currentName]);
 
    onMount(async () => {
        const res = await fetch("/api/categories");
        categories = await res.json();
 
        isFetchingCategories = false;
    })

    //--------------------------------------------------

    let searchValue = $state("");

    const WORLD_UUID_REGEX = /^[0-9a-f]{8}(-?)(?:[0-9a-f]{4}\1){3}[0-9a-f]{12}$|^lobby$/i
    const AUTOCOMPLETE_LIMIT = 10;
 
    const searchResults = resource(
        () => searchValue.trim(),
        async (value) => {
            if (value.length == 0) return []
            switch (currentCategory.type) {
                case "world": {
                    let worlds: any = null;

                    if (WORLD_UUID_REGEX.test(value)) {
                        const res = await fetch(`${LEGITIMOOSE_API}/v4/worlds/${encodeURIComponent(value)}?project=world_uuid,name,owner_name,icon`);
                        worlds = [await res.json()];
                    } else {
                        const url = new URL(`/v4/worlds/search?project=world_uuid,name,owner_name,icon&limit=${AUTOCOMPLETE_LIMIT}`, LEGITIMOOSE_API)
                        url.searchParams.append("query", value)
 
                        const res = await fetch(url);
                        worlds = await res.json();
                    }

                    const transformedWorld = worlds.map((v: any) => {
                        let icon = v.icon == "minecraft:player_head" ?
                            `https://mc-heads.net/head/${v.owner_name}/left` :
                            `https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/${v.icon.replace("minecraft:", "")}.png`

                        return {
                            name: v.name,
                            subtitle: `by ${v.owner_name}`,
                            uuid: v.world_uuid,
                            icon
                        }
                    })
                    
                    return transformedWorld
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
 
                    return values.map(v => {
                        return {
                            name: v.name,
                            uuid: v.uuid,
                            icon: `https://mc-heads.net/head/${v.uuid}/left`
                        }
                    });
                }
                case "any": {
                    return [{ name: value, uuid: value }]
                }
            }
        },
        {
            debounce: 300,
            lazy: true
        }
    )

    //--------------------------------------------------

    let nominationVotes: Partial<{[k in keyof Votes['categories']]: any}> = $state({});

    function submitNomination(nominationInfo: any) {
        nominationVotes[currentName] = nominationInfo;
        searchValue = "";
        searchResults.mutate([])
    }
</script>
 
<LegitiAwardsButton />
<div class="main-section">
    {#if isFetchingCategories}
        <span>...</span>
    {:else if currentIndex < categories.order.length}
        <div class="category-info-container">
            <div class="category-info-wrapper">
                <div class="category-title">{currentCategory.title}</div>
                <div class="category-description">{currentCategory.description}</div>
            </div>
        </div>  
        <GoldLine orientation="vertical" thickness="10px" />
        <div class="input-container">
            {#if nominationVotes[currentName]}
                {#key currentIndex}
                    <PickedNomineeVisual 
                        title={nominationVotes[currentName]?.name}
                        subtitle={nominationVotes[currentName]?.subtitle}
                        icon={nominationVotes[currentName]?.icon}
                    />
                {/key}
            {/if}
            <div class="picker-container">
                <SearchInput bind:value={searchValue} />
                <div class="search-container">
                    {#if searchResults.loading}
                        <span>Loading...</span>
                    {:else if searchResults.error}
                        <span>An error occured: {searchResults.error.message}</span>
                    {:else}
                        {#each searchResults.current ?? [] as value}
                            <SuggestionBox
                                title={value?.name}
                                subtitle={value?.subtitle}
                                icon={value?.icon}
                                onclick={() => submitNomination(value)}
                            />
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
        {#if currentIndex != 0}
        <button class="arrows back-arrow" onclick={() => currentIndex--}>&larr;</button>
        {/if}
        {#if nominationVotes[currentName]}
            <button class="arrows forward-arrow" onclick={() => currentIndex++}>&rarr;</button>
        {/if}
    {:else}
        <div class="summary-container">
            <p>You nominated:</p>
            {#each categories.order as categoryName}
                <div class="left">
                    <span>{categories.categories[categoryName].title}</span>
                </div>
                <div class="right">
                    <span>{nominationVotes[categoryName].name}</span>
                </div>
            {/each}
            
        </div>
    {/if} 
</div>

<style>
    .main-section {
        height: 100vh;
        background-image: url('/assets/img/cyan_background.png');
        background-position: center;
        background-size: 100%;
        background-repeat: repeat-y;
        position: relative;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        > div {
            flex: 1;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }

    .category-info-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(to left, #271d0233, #a18a0722);

        .category-info-wrapper {
            justify-content: center;
            align-items: start;
            padding: 50px;
            max-width: 90%;

            .category-title {
                font-family: 'MinecraftTen', 'Cascadia Code';
                font-size: calc(4vw + 1rem);
                line-height: 1;

                color: #4effb8;
                text-shadow: 0 0.8vw #05120d;

                padding-bottom: 1.25vw;
            }

            .category-description {
                font-family: 'MinecraftDefault', 'Cascadia Code';
                font-size: 1.8vw;
                color: white;
                line-height: 2vw;
            }
        }
    }

    .category-info-wrapper, .input-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .picker-container {
        display: flex;
        flex-direction: column;
        width: 70%;
        gap: 10px;

        .search-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 5px;
            padding: 12px;

            max-height: 400px;
            overflow-y: scroll;
            scroll-behavior: smooth;
            scrollbar-color: #131314 transparent;
            scrollbar-width: none;

            mask-image: linear-gradient(to bottom, rgb(0, 0, 0, 0.75) 0%, black 10%, black 90%, rgb(0, 0, 0, 0.5) 100%);
        }
    }

    .arrows {
        all: unset;

        position: absolute;
        top: 50%;
        translate: 0 -50%;
        color: white;

        animation: fadeIn 0.3s ease-in both;

        &.back-arrow { left: 1rem; }
        &.forward-arrow { right: 1rem; }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>