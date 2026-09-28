<script>
	import { onMount } from "svelte";
	import WinnerCard from "./WinnerCard.svelte";

    let results = $state({});

    onMount(async () => {
        const response = await fetch("/results_archive/cla2.json");
        results = await response.json();
    })
</script>
<div class="past-winners-section">
    <span class="title" data-title="2026 Winners">2026 Winners</span>
    <span class="event-info">{results.}</span>
    <WinnerCard category-name="World of the Year" winner-name="Battle Train" owned-by="Railroad Xing (team)" />
    <WinnerCard category-name="Best Resource Pack for Textures and Models" winner-name="Battle Train" owned-by="Railroad Xing (team)" />
    <WinnerCard category-name="World of the Year" winner-name="Battle Train" owned-by="Railroad Xing (team)" />
</div>

<style>
    .past-winners-section {
        display: flex;
        flex-direction: column;
        width: 100%;

        justify-content: center;
        align-items: center;
        gap: 30px;

        > .event-info {
            font-family: 'MinecraftDefault', 'Cascadia Code';
            color: white;
            font-size: 2rem;
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