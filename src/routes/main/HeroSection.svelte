<div class="hero-section">
    <div class="graphics-container">
        <img class="hero-img" src="/assets/img/rendered_reef.png" alt="Amethyst Reef Trophy">
        <img class="hero-title" src="/assets/img/press_kit/community_legitiawards_wordmark.png" alt="The Community LegitiAwards">
    </div>
</div>

<style>
    .hero-section {
        height: 100vh;
        background-image: url('/assets/img/purple_background.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        @media (max-width: 800px) {
            height: max-content;
            padding-bottom: 50px;
        }
    }

    .graphics-container {
        display: flex;
        flex-direction: row;

        width: 100%;
        height: 100%;

        justify-content: space-between;
        align-items: center;

        & img.hero-img {
            width: 45%;
            height: auto;
        }

        & img.hero-title {
            width: 50%;
            height: auto;
            margin-right: 50px;
        }

        @media (max-width: 800px) {
            flex-direction: column;
            justify-content: start;
            gap: 20px;

            & img.hero-img {
                width: 100%;
            }

            & img.hero-title {
                width: 80%;
                margin-right: 0;
            }
        }
    }
</style>