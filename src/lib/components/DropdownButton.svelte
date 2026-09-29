<script lang="ts">
    type Props = {
        class?: string;
        toggled: boolean;
    }

    let {
        class: className,
        toggled = $bindable(false)
    }: Props = $props()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<img 
    src="/assets/svg/dropdown_arrow.svg" 
    alt="Dropdown Button" 
    class={["dropdown-button", className, {toggled: toggled}]}
    onclick={() => toggled = !toggled}
/>

<style>
    .dropdown-button {
        opacity: 0.5;
        transition: 0.1s ease opacity;

        width: 20px;
        height: auto;

        &:hover {
            opacity: 1;
        }

        &.toggled {
            rotate: 180deg;
        }
    }
</style>