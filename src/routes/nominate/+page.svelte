<script lang="ts">
	import Footer from "#lib/components/Footer.svelte";
	import GoldLine from "#lib/components/GoldLine.svelte";
	import LegitiAwardsButton from "#lib/components/LegitiAwardsButton.svelte";
	import type { Votes } from "#lib/schemas/voting.ts";
	import { nominationsStore } from "#lib/stores/persistent.ts";
	import { onMount } from "svelte";
	import SearchInput from "./SearchInput.svelte";
	import type { ResourceReturn } from "runed";
	import SuggestionBox from "./SuggestionBox.svelte";

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

    let currentName = $derived(categories.order[nominationsStore.current.current_index]);
    let currentCategory = $derived(categories.categories[currentName]);

    let currentInput = $state("");
    let searchResults = $state<ResourceReturn<any>>();

    onMount(async () => {
        const res = await fetch("/api/categories");
        categories = await res.json();

        isFetchingCategories = false;
    })

    function setNomination(value: string) {
        // todo: validate
        nominationsStore.current.categories[currentName] = value;
        currentInput = "";
    }

    function handleButtonClick(value: string) {
        setNomination(value);
        nominationsStore.current.current_index++
    }

</script>

<LegitiAwardsButton />
<div class="main-section">
    {#if isFetchingCategories}
        <span>Getting categories...</span>
    {:else}
        <div class="category-info-container">
            <div class="category-info-wrapper">
                <div class="category-title">{currentCategory.title}</div>
                <div class="category-description">{currentCategory.description}</div>
            </div>
            <GoldLine orientation="vertical" />
        </div>  
        <div class="input-container">
            <SearchInput type={currentCategory.type} bind:input_value={currentInput} bind:search_results={searchResults} />
            {#if searchResults}
            {#if searchResults.loading}
                <span>Loading...</span>
            {:else if searchResults.error}
                <span>An error occured: {searchResults.error.message}</span>
            {:else}
                {#each searchResults.current ?? [] as value}
                    {#if currentCategory.type == "world"}
                        <SuggestionBox 
                            title={value.name}
                            subtitle={value.owner_name}
                            icon={`https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/${value.icon}.png`}
                            onclick={() => {console.log(`Selected ${value.name} (${value.world_uuid})`); handleButtonClick(value.world_uuid)}}
                        />
                    {:else if currentCategory.type == "player"}
                        <SuggestionBox 
                            title={value.name}
                            icon={`https://mc-heads.net/head/${value.uuid}/left`}
                            onclick={() => {console.log(`Selected ${value.name} (${value.uuid})`); handleButtonClick(value.uuid)}}
                        />
                    {:else if currentCategory.type == "any"}
                        <SuggestionBox 
                            title={value}
                            onclick={() => {console.log(`Selected ${value}`); handleButtonClick(value)}}
                        />
                    {:else}
                        <span>Unsupported category type.</span>
                    {/if}
                {/each}
            {/if}
            {/if}
        </div> 
    {/if} 
</div>

<style>
    .main-section {
        height: 100vh;
        background-image: url('/assets/img/cyan_background.png');
        background-position: center;
        background-size: 100% auto;
        background-repeat: repeat-y;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .category-info-container {
        display: flex;
        flex-direction: row;
    }

    .category-info-wrapper, .input-container {
        display: flex;
        flex-direction: column;
    }
</style>