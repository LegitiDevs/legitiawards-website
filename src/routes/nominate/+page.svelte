<script lang="ts">
	import Footer from "#lib/components/Footer.svelte";
	import GoldLine from "#lib/components/GoldLine.svelte";
	import LegitiAwardsButton from "#lib/components/LegitiAwardsButton.svelte";
	import { onMount } from "svelte";

    type CategoryMetadata = {
        type: string,
        title: string,
        description: string
    }

    let isFetchingCategories = $state(true);
    let categories: {
        order: string[];
        categories: { [k: string]: CategoryMetadata };
    } = $state({order: [], categories: {}});

    let currentTitle = $state("");
    let currentDescription = $state("");

    onMount(async () => {
        const res = await fetch("/api/categories");
        categories = await res.json();

        currentTitle = categories.categories[categories.order[0]].title
        currentDescription = categories.categories[categories.order[0]].description

        isFetchingCategories = false;
    })

</script>

<LegitiAwardsButton />
<div class="main-section">
    {#if isFetchingCategories}
        <span>Getting categories...</span>
    {:else}
        <div class="category-info-container">
            <div class="category-info-wrapper">
                <div class="category-title">{currentTitle}</div>
                <div class="category-description">{currentDescription}</div>
            </div>
            <GoldLine orientation="vertical" />
        </div>   
    {/if} 
</div>
<Footer />