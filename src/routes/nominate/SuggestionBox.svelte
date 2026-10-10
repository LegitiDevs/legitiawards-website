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
        background-color: white;

        padding: 10px;

        &:hover {
            outline: 2px solid black;
        }

        > * {
            display: flex;
            flex-direction: column;
        }

        .title-container {
            font-family: 'MinecraftDefault', 'Cascadia Code';
        }
    }
</style>