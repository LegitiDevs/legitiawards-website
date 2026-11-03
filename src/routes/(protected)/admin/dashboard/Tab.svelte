<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import { getTabContext } from "./tabcontext";

  type Props = { id: string, children?: Snippet }

  let { id, children }: Props = $props();

  let tabContext = getTabContext();

  onMount(() => {
    tabContext.tabIds.push(id) 
  })

  onDestroy(() => {
    const index = tabContext.tabIds.findIndex(v => v == id)
    if (index != -1) tabContext.tabIds.splice(index, 1)
  })
</script>

{#if tabContext.active == id}
  {@render children?.()}
{/if}