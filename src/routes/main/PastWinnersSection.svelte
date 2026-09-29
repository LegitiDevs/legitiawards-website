<script lang="ts">
	import { onMount } from "svelte";
	import WinnerCard from "./WinnerCard.svelte";
	import type { CommunityLegitiAwardsResultsSchema } from "$lib/types";

    // @ts-ignore
    let results: CommunityLegitiAwardsResultsSchema = $state({});
    let formatted_date = $state("")

    onMount(async () => {
        const response = await fetch("/results_archive/cla2.json");
        results = await response.json();

        formatted_date = new Intl.DateTimeFormat('en-US', { dateStyle: "full" }).format(new Date(results.datetime))
    })
</script>
<div class="past-winners-section">
    <span class="title" data-title="2026 Winners">2026 Winners</span>
    <span class="event-info">
        {results.display_name} hosted on {formatted_date}
    </span>
    {#each results.winners as winner}
        <WinnerCard 
            winner={winner} 
            results={results}
        />   
    {/each}
</div>

<style>
    .past-winners-section {
        display: flex;
        flex-direction: column;
        width: 100%;

        justify-content: center;
        align-items: center;
        gap: 30px;
        padding-bottom: 50px;

        > .event-info {
            font-family: 'MinecraftDefault', 'Cascadia Code';
            color: white;
            font-size: 2rem;
            text-align: center;
            line-height: 1;

            max-width: 80%;
        }

        > .title {
            position: relative;

            font-family: 'MinecraftFive';
            font-weight: bold;
            font-size: 11.55vw;
            text-align: center;
            color: white;

            &::before {
                content: attr(data-title);
                position: absolute;
                top: -25%;
                left: 0;
                color: transparent;
                -webkit-text-stroke: rgba(255, 255, 255, 0.4) 0.5px;
            }

            &::after {
                content: attr(data-title);
                position: absolute;
                top: 25%;
                left: 0;
                color: transparent;
                -webkit-text-stroke: rgba(255, 255, 255, 0.4) 0.5px;
            }
        }
    }
</style>