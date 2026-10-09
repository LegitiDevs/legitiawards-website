<a href="https://legiti.dev/" class="legitidevs-button">
    <img src="https://legiti.dev/img/legitimoose-api-mark.webp" alt="LegitiDevs Logo" />
</a>

<style>
    .legitidevs-button {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 2;

        view-transition-name: legitidevs-button;

        & img {
            width: 50px;
            height: auto;
            image-rendering: pixelated;
        }
    }

    :root::view-transition-old(legitidevs-button) {
        animation: 0.5s ease both slideRight;
    }

    :root::view-transition-new(legitidevs-button) {
        animation: 0.5s ease both slideRight reverse;
    }

    @keyframes slideRight {
        0% {
            translate: 0px 0px;
        }
        80% {
            translate: 200% 0px;
        }
        100% {
            translate: 200% 0px;
        }
    }
</style>