<a href="/" class="legitiawards-button">
    <img src="/assets/svg/legitiawards-icon.svg" alt="Legitiawards Logo" />
</a>

<style>
    .legitiawards-button {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 2;

        view-transition-name: legitiawards-button;

        & img {
            width: 40px;
            height: auto;
        }
    }

    :root::view-transition-old(legitiawards-button) {
        animation: 0.5s ease both slideRight;
    }

    :root::view-transition-new(legitiawards-button) {
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