<a href="/nominate" class="nominate-button">Nominate for CLAs 2027</a>

<style>
    .nominate-button {
        display: inline-block;
        
        position: fixed;
        z-index: 2;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%);

        padding: 20px;

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

        &:hover {
            background-color: rgb(255, 197, 73);

            box-shadow: 
                -3px -3px rgb(255, 213, 98),
                3px 3px rgb(255, 213, 98),
                -3px 3px rgb(255, 213, 98),
                3px -3px rgb(255, 213, 98),
                0 0 0 3px rgb(255, 197, 73),
                0 10px 0 3px rgb(209, 109, 14),
                0 0 0 6px black,
                0 10px 0 6px black,
                0 0 0 9px white,
                0 10px 0 9px white;
        }

        font-family: 'MinecraftTen';
        font-size: 2.5rem;
        text-decoration: none;
        text-align: center;
        color: white;
        line-height: 0.75;
        text-shadow: 2px 2px rgba(143, 50, 7, 0.5);
        letter-spacing: 2px;
        -webkit-font-smoothing: none;
        image-rendering: pixelated;

        animation: 1s ease-in-out 1s flyUp backwards;

        @media (max-width: 800px) {
            font-size: 2rem;
            letter-spacing: 0px;
            line-height: 1;
            padding: 5px;
            text-wrap: nowrap;
        }
    }

    @keyframes flyUp {
        0% {
            opacity: 0;
            translate: 0px 40px;
        }
        100% {
            opacity: 1;
            translate: 0px 0px;
        }
    }
</style>