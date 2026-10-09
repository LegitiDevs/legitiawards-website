<script>
	import GoldLine from "#lib/components/GoldLine.svelte";
	import LegitiDevsButton from "#lib/components/LegitiDevsButton.svelte";
	import HeroSection from "./main/HeroSection.svelte";
	import NominateButton from "./main/NominateButton.svelte";
	import PastWinnersSection from "./main/PastWinnersSection.svelte";
</script>

<LegitiDevsButton />
<HeroSection />
<GoldLine />
<div class="bottom-section">
    <div class="event-description">
        <span>The BIGGEST awarding ceremony in the Legitimoose Minecraft server celebrating creators and their work.</span>
        <span>Presented by <a href="https://legiti.dev/">LegitiDevs</a></span>
    </div>
    <PastWinnersSection />
</div>
<NominateButton />

<style>
    .bottom-section {
        background-image: url('/assets/img/cyan_background.png');
        background-position: center;
        background-size: 100% auto;
        background-repeat: repeat-y;
    }

    .event-description {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;
        gap: 100px;

        padding-block: 150px;

        font-family: 'MinecraftDefault', 'Cascadia Code';
        font-size: 1.5rem;
        text-align: center;
        line-height: 0.8;
        color: white;

        & span { 
            max-width: min(950px, 80%); 
            
            & a {
                color: white;
                text-decoration: underline;
            }
        }

        > span:first-child {
            font-size: 3.5rem;

            @media (max-width: 800px) {
                font-size: calc(80% + 1rem);
            }
        }
    }
</style>
