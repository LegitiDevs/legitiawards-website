<script>
    let {
        "category-name": categoryName,
        "winner-name": winnerName,
        "owned-by": ownedBy
    } = $props();

    // svelte-ignore state_referenced_locally
    const isTitleShort = categoryName.length <= 25;
</script>

<div class="winner-card">
    <span class={{'title': true, 'short': isTitleShort, 'long': !isTitleShort}}>{categoryName}</span>
    <div class="winner-info">
        <span class="winner-name">{winnerName}</span>
        <span class="owned-by">by {ownedBy}</span>
    </div>
    <svg class="left-shape" viewBox="0 0 1216.5 239" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_86_251)">
        <path d="M0 0H1172.5L963 239H0V0Z" fill="#060212"/>
        </g>
        <defs>
        <filter id="filter0_d_86_251" x="0" y="0" width="1212.5" height="239" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="40"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_86_251"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_86_251" result="shape"/>
        </filter>
        </defs>
    </svg>
</div>

<style>
    .winner-card {
        position: relative;

        display: flex;
        flex-direction: row;
        width: min(1300px, 90%);
        height: 200px;
        
        justify-content: space-between;
        align-items: center;

        background-color: #8a00ca;
        padding-block: 30px;
        padding-inline: 30px;

        color: white;
        line-height: 1;

        @media (max-width: 800px) { height: 100px; }

        .left-shape {
            position: absolute;
            top: 0;
            left: 0;
            width: 66%;
            height: 100%;

            @media (max-width: 800px) { width: 50%; }
        }

        .title {
            max-width: 55%;
            font-size: 4rem;
            font-family: 'MinecraftTen', 'Cascadia Code';
            z-index: 1;

            &.short {
                font-size: 4rem;
                @media (max-width: 800px) { font-size: 1.5rem; }
            }

            &.long {
                font-size: 3rem;
                @media (max-width: 800px) { font-size: 1rem; }
            }

            @media (max-width: 800px) { width: 40% }
        }

        .winner-info {
            display: flex;
            flex-direction: column;

            justify-content: center;
            align-items: end;

            text-align: right;

            .winner-name {
                font-family: 'MinecraftDefault', 'Cascadia Code';
                font-size: 3rem;

                @media (max-width: 800px) { font-size: 1.5rem; }
            }

            .owned-by {
                font-family: 'MinecraftDefault', 'Cascadia Code';
                font-size: 2rem;
                color: rgba(255, 255, 255, 0.5);

                @media (max-width: 800px) { font-size: 1.2rem; }
            }
        }
    }
</style>