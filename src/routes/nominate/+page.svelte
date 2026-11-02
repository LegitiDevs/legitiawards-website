<script lang="ts">
    import { CURRENT_EVENT, LEGITIMOOSE_API, PLAYERDB_MC } from "#lib/constants.ts";
	import LegitiAwardsButton from "#lib/components/LegitiAwardsButton.svelte";
	import type { Votes } from "#lib/schemas/voting.ts";
	import { onMount } from "svelte";
	import SearchInput from "./SearchInput.svelte";
	import PickedNomineeVisual from "./PickedNomineeVisual.svelte";
	import SuggestionBox from "./SuggestionBox.svelte";
    import { resource } from "runed";
	import { refreshAll } from "$app/navigation";

    type PageState = "loading" | "voting" | "summary" | "submitting" | "error" | "success";
    let pageState = $state<PageState>("loading");

    //-------------------------------------------------- DATA SETUP
 
    type CategoryMetadata = {
        type: "world" | "player" | "any",
        title: string,
        description: string
    }
 
    type Categories = {
        order: (keyof Votes['categories'])[];
        categories: { [k: string]: CategoryMetadata };
    }
 
    let categories: Categories = $state({} as Categories);
    
    let currentIndex = $state(0);
    let currentName = $derived(categories.order[currentIndex]);
    let currentCategory = $derived(categories.categories[currentName]);
 
    onMount(async () => {
        const res = await fetch("/api/categories");
        categories = await res.json();
 
        pageState = "voting"
    })

    //-------------------------------------------------- VOTING LOGIC

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

    let nominationVotes: Partial<{[k in keyof Votes['categories']]: any}> = $state({
        communitys_voice: {name: "Trplnr", uuid: "7036f914-10c8-44cc-848a-7a3980964496"},
        most_promising_player: {name: "Trplnr", uuid: "7036f914-10c8-44cc-848a-7a3980964496"},
        best_artist: {name: "Trplnr", uuid: "7036f914-10c8-44cc-848a-7a3980964496"},
        best_developer: {name: "Trplnr", uuid: "7036f914-10c8-44cc-848a-7a3980964496"},
        best_team: {name: "Trplnr", uuid: "Trplnr"},
        creator_of_the_year: {name: "Trplnr", uuid: "7036f914-10c8-44cc-848a-7a3980964496"},
        still_playing: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        most_captivating_world: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        best_sandbox_game: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        best_party_game: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        best_fighting: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        best_in_tech: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        best_in_fun: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        best_in_aesthetics: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        most_innovative: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
        world_of_the_year: {name: "Trplnr", uuid: "3b831533-caf3-4e4d-871d-6b4a83945d77", subtitle: "by Trplnr"},
    });

    function setNomination(nominationInfo: any) {
        nominationVotes[currentName] = nominationInfo;
        searchValue = "";
        searchResults.mutate([])
    }

    function switchPage(pageIndex: number, useDelta: boolean = true) {
        searchValue = "";
        searchResults.mutate([]);

        const newIndex = useDelta ? currentIndex + pageIndex : pageIndex

        if (newIndex < 0) { 
            // out of bounds
            throw new RangeError("Cannot switch page: delta puts index out of bounds.") 
        } else if (newIndex < categories.order.length) {
            // in voting page
            pageState = "voting";
            currentIndex = newIndex;
        } else if (newIndex >= categories.order.length) {
            // past voting page, go to summary
            pageState = "summary";
            currentIndex = categories.order.length - 1;
        }
    }

    // -------------------------------------------------- SUBMITTING LOGIC

    let submitError = $state<{
        status: number
        json: any | null
    }>({ status: -1, json: null });

    async function submitNominations() {
        const nominationVotesToSend = {
            event_id: CURRENT_EVENT,
            categories: Object.fromEntries(
                Object.entries(nominationVotes).map(([k, v]) => [k, v.uuid])
            )
        }

        const submitRes = await fetch('/api/nominations', {
            method: 'POST',
            body: JSON.stringify(nominationVotesToSend)
        })

        if (submitRes.status == 403 || submitRes.status == 409) {
            await refreshAll();
            return;
        }

        // Something went wrong, show error page or refresh to show updated info.
        if (!submitRes.ok) {
            // Nominations closed or already submitted.

            const hasJson = submitRes.headers.get('content-type')?.includes('application/json');
            submitError = {
                status: submitRes.status,
                json: hasJson ? await submitRes.json() : null
            }

            pageState = "error";
            return;
        }
    }
</script>
 
<LegitiAwardsButton />
<div class="main-section">
{#if pageState == "loading"}
    <span>...</span>
{:else if pageState == "voting"}
    {#key currentIndex}
    <div class="category-info-container">
        <p class="category-title">{currentCategory.title}</p>
        <p class="category-description">{currentCategory.description}</p>
    </div>
    {/key}
    <div class="input-container">
        {#if nominationVotes[currentName] && searchValue.length == 0}
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
                {:else if searchValue.length > 0}
                    {#each searchResults.current ?? [] as value}
                        <SuggestionBox
                            title={value?.name}
                            subtitle={value?.subtitle}
                            icon={value?.icon}
                            onclick={() => setNomination(value)}
                        />
                    {/each}
                {/if}
            </div>
        </div>
    </div>
    {#if currentIndex != 0}
        <button class="arrows back-arrow" onclick={() => switchPage(-1)}>&larr;</button>
    {/if}
    {#if nominationVotes[currentName]}
        <button class="arrows forward-arrow" onclick={() => switchPage(1)}>&rarr;</button>
    {/if}
{:else if pageState == "summary"}
    <button class="arrows back-arrow" onclick={() => switchPage(-1)}>&larr;</button>

    <div class="summary-container">
        <div class="summary-title">
            <h1>Summary</h1>
            <p style="margin-top: 1rem;">Review your nominations and submit!</p>
        </div>
        <p>You nominated</p>
        <div class="nomination-list-container">
            {#each categories.order as categoryName}
                <span class="title">{categories.categories[categoryName].title}</span>
                <span class="name">{nominationVotes[categoryName].name}</span>
            {/each}
        </div>
        <button class="submit-button" onclick={submitNominations}>Submit</button>
    </div>
{:else if pageState == "error"}
    <h1>Something went wrong :&lpar;</h1>
    <h2>{submitError.status}</h2>
    {#if submitError.json != null}
        <span>{submitError.json}</span>
    {/if}
{/if} 
</div>

<style>
    .main-section {
        background-image: url('/assets/img/cyan_background.png');
        background-position: center;
        background-size: 100%;
        background-repeat: repeat-y;
        position: relative;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        min-height: 100vh;
        
        > div { flex: 1; }
    }

    .category-info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        background-image: linear-gradient(to right, #8a650233, transparent);
        border-left: var(--accent-yellow-1) solid 5px;
        padding: 50px;

        height: 100vh;

        text-align: left;

        .category-title {
            z-index: 1;
            font-family: 'MinecraftTen', 'Cascadia Code';
            font-size: calc(4vw + 1rem);
            line-height: 1;

            color: #4effb8;
            text-shadow: 0 0.8vw #05120d;

            padding-bottom: 1.25vw;
        }

        .category-description {
            z-index: 1;
            font-family: 'MinecraftDefault', 'Cascadia Code';
            font-size: calc(0.5vw + 1rem);
            color: white;
            line-height: normal;
        }
    }

    .input-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;

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

                span {
                    text-align: center;
                    font-family: 'MinecraftFive';
                    color: white;
                    opacity: 0.5;
                }
            }
        }
    }

    .summary-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;

        padding: 50px;

        font-family: 'MinecraftDefault';
        color: white;
        font-size: 2em;
        line-height: normal;

        .summary-title {
            padding: 1rem;
            background-image: linear-gradient(to right, #8a650233 75%, transparent 100%);
            border-left: var(--accent-yellow-1) solid 5px;
            width: 100%;
        }

        .nomination-list-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            align-items: center;

            .title {
                justify-self: end;
                font-family: 'MinecraftTen';
                color: var(--accent-yellow-1);
            }
        }

        .submit-button {
            all: unset;

            background-color: rgb(243, 178, 38);
            box-shadow: 
                -3px -3px rgb(255, 207, 74),
                3px 3px rgb(255, 207, 74),
                -3px 3px rgb(255, 207, 74),
                3px -3px rgb(255, 207, 74),
                0 0 0 3px rgb(243, 178, 38),
                0 10px 0 3px rgb(209, 109, 14),
                0 0 0 6px black,
                0 10px 0 6px black;

            padding-inline: 20px;
            padding-top: 5px;
            padding-bottom: 8px;
            line-height: normal;

            font-family: 'MinecraftFive';
            color: white;
            text-shadow: 0px 4px rgba(143, 50, 7, 0.5);

            transition: scale 0.2s ease, filter 0.2s ease, padding 0.2s ease;

            &:hover {
                scale: 1.1;
                filter: brightness(1.05);
                padding-inline: 30px;
            }

            &:active {
                scale: 0.85;
                filter: brightness(1.05);
                padding-inline: 30px;
            }
        }
    }

    .arrows {
        all: unset;

        position: absolute;
        top: 50%;
        translate: 0 -50%;
        font-family: 'MinecraftDefault';
        color: white;
        
        transition: opacity 0.2s ease, scale 0.2s ease;

        &.back-arrow { 
            left: 1.5rem;
            opacity: 0.5;
            scale: 2;
            &:hover { opacity: 1; }
        }
        &.forward-arrow { 
            right: 1.5rem; 
            color: var(--accent-yellow-1);
            scale: 3;
            &:hover { scale: 3.5; }
        }
    }
</style>