<script lang="ts">
  type Props = {
    icon?: string,
    title: string,
    subtitle?: string,
  }

  let { icon, title, subtitle }: Props = $props()
</script>

<div class="suggestion-box">
    {#if icon}
        <img src={icon} alt={`${title} Icon`} class="icon" />
    {/if}
    <div class="title-container">
        <span class="title">{title}</span>
        {#if subtitle}
            <span class="subtitle">{subtitle}</span>
        {/if}
    </div>
</div>

<style>
    .suggestion-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        animation: fadeIn 0.4s ease both;

        img {
            width: 50%;
            height: auto;
        }

        .title-container {
            display: flex;
            flex-direction: column;

            font-family: 'MinecraftDefault';
            color: white;
            text-align: center;
            line-height: normal;
            font-size: 2em;

            .title { 
                font-weight: bold;
                font-size: 1.25em;
            }
            .subtitle { 
                font-style: italic; 
                opacity: 0.5; 
            }
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            scale: 0.95;
        }
        100% {
            opacity: 1;
            scale: 1;
        }
    }
</style>