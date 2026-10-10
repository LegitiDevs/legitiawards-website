<script lang="ts">
	import GoldLine from "#lib/components/GoldLine.svelte";
	import LegitiAwardsButton from "#lib/components/LegitiAwardsButton.svelte";
	import type { Votes } from "#lib/schemas/voting.ts";
	import { nominationsStore } from "#lib/stores/persistent.ts";
	import { onMount } from "svelte";
	import NominationPicker from "./NominationPicker.svelte";
 
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
 
    onMount(async () => {
        const res = await fetch("/api/categories");
        categories = await res.json();
 
        isFetchingCategories = false;
    })
 
    function setNomination(value: string) {
        // todo: validate
        nominationsStore.current.categories[currentName] = value;
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
        </div>  
        <GoldLine orientation="vertical" thickness="10px" />
        <div class="input-container">
            <div class="search-container">
                {#key currentName}
                    <NominationPicker type={currentCategory.type} onpick={handleButtonClick} />
                {/key}
            </div>
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
            }

            .category-description {
                font-family: 'MinecraftDefault', 'Cascadia Code';
                font-size: 1.8vw;
                color: white;
            }
        }
    }

    .category-info-wrapper, .input-container {
        display: flex;
        flex-direction: column;
    }

    .search-container {
        display: flex;
        flex-direction: column;
        width: 60%;
        gap: 10px;
    }
</style>