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