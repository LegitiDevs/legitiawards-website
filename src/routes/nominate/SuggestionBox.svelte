<script lang="ts">
    type Props = {
        icon?: string,
        title: string,
        subtitle?: string,
        onclick: () => any;
    }

    let { icon, title, subtitle, onclick }: Props = $props()
</script>

<button class="suggestion-box" onclick={onclick}>
    {#if icon}
        <img src={icon} alt={`${title} Icon`} class="icon" />
    {/if}
    <div class="title-container">
        <span class="title">{title}</span>
        {#if subtitle}
            <span class="subtitle">{subtitle}</span>
        {/if}
    </div>
</button>

<style>
    button.suggestion-box {
        all: unset;

        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        
        background-color: #131314;
        overflow: hidden;
        padding-inline: 10px;
        gap: 25px;
        color: white;
        outline: 3px solid #050506;
        height: 60px;

        > * {
            display: flex;
            flex-direction: column;
        }

        .icon {
            width: 50px;
            height: auto;
            scale: 1.75;
        }

        .title-container {
            font-family: 'MinecraftDefault', 'Cascadia Code';
            gap: 25px;
            line-height: 0;
            text-wrap: nowrap;

            .title {
                font-size: 2rem;
            }

            .subtitle {
                font-size: 1.5rem;
                font-style: italic;
                color: rgb(255, 255, 255, 0.5);
            }
        }

        &::after {
            content: '';
            
            position: absolute;
            right: 0;

            width: 80px;
            height: 100%;

            background-image: linear-gradient(to right, #13131400, #131314);
        }
    }
</style>