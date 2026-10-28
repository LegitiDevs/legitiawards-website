<script lang="ts">
	import { setTabContext, type TabContainer } from "./tabcontext";

  let { children } = $props();

  let tabs = $state<TabContainer>({ tabIds: [], active: "" })
  setTabContext(tabs)

  $effect(() => {
    if (tabs.tabIds.length > 0) {
      tabs.active = tabs.tabIds[0]
    }
  })
</script>

{#each tabs.tabIds as tabId}
  <button onclick={() => { tabs.active = tabId }}>{tabId}</button>
{/each}
{@render children()}