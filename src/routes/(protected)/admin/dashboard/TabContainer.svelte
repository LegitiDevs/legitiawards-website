<script lang="ts">
  import "./layout.css";
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

<div class="tab-container block">
  <div class="button-row">
    {#each tabs.tabIds as tabId}
      <button onclick={() => { tabs.active = tabId }} class={{'active': tabs.active == tabId}}>{tabId}</button>
    {/each}
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .tab-container {
    padding: 0;
    border-top-left-radius: 0;
  }

  .button-row {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid rgb(0, 0, 0, 0.5);
    background-color: rgb(0, 0, 0, 0.25);
    max-width: 100%;
    overflow-x: scroll;
    
    scrollbar-width: thin;
    scrollbar-color: rgb(255, 255, 255, 0.05) rgb(0, 0, 0, 0.5);

    button {
      all: unset;
      line-height: normal;
      padding-inline: 1.5rem;
      padding-block: 0.35rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      &.active {
        background-color: rgb(0, 0, 0, 0.5);
      }
    }
  }

  .content {
    padding: 1rem;
  }
</style>