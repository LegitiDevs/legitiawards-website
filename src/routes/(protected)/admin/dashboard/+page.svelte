<script lang="ts">
	import { CURRENT_EVENT } from "#lib/constants.ts";
	import { adminStore } from "#lib/stores/session.ts";
	import { onMount } from "svelte";
	import type { Categories } from "../../../api/categories/+server";
	import type { Votes } from "#lib/schemas/voting.ts";
	import TabContainer from "./TabContainer.svelte";
	import Tab from "./Tab.svelte";

  let nominations = $state<Votes[]>();
  let categories = $state<Categories>()

  onMount(async () => {
    const nominationsRes = await fetch('/api/nominations', {
      headers: { 'Authorization': adminStore.current.password! }
    })
    nominations = await nominationsRes.json();
  })

  function wait(data: any) {
    return data == undefined ? "..." : data
  }
</script>

<div class="main-container">
  <div class="block no-outline full-row" style="padding-block: 2rem;">
    <h1>Admin Dashboard</h1>
    <p>Do not leak!</p>
  </div>
  <div class="block">
    <h2>Current Event</h2>
    <p class="data">{CURRENT_EVENT}</p>
  </div>
  <div class="block">
    <h2>Submission Count (Nominations)</h2>
    <p class="data">{wait(nominations?.length)}</p>
  </div>
  <div class="block full-row">
    <h2>ae</h2>
    <TabContainer>
      <Tab id="tab1">
        <h1>this is tab 1</h1>
        <p>foo</p>
      </Tab>
      <Tab id="tab2">
        <h1>this is tab 2</h1>
        <p>bar</p>
      </Tab>
      <Tab id="tab3">
        <h1>this is tab 3</h1>
        <p>baz</p>
      </Tab>
    </TabContainer>
  </div>
</div>

<style>
  .main-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    @media (max-width: 48rem) { grid-template-columns: 1fr; }

    min-height: 100vh;

    font-family: 'Poppins', 'Helvetica';
    color: white;

    padding: 2rem;
    gap: 1rem;
    background-color: rgb(17, 23, 19);
  }

  .block {
    background-color: transparent;
    outline: 1px rgb(255, 255, 255, 0.2) solid;
    padding: 1rem;
    border-radius: 8px;
    height: max-content;

    &.no-outline { outline: none; }
    &.full-row { grid-column: 1 / -1; }

    h2 {
      font-size: 1rem;
      font-weight: normal;
    }

    p.data {
      font-size: 2rem;
    }
  }

  code {
    background-color: rgb(10, 10, 10);
    outline: 1px rgb(255, 255, 255, 0.1) solid;
    padding-block: 0.2rem;
    padding-inline: 0.3rem;
    border-radius: 4px;
    font-family: 'Cascadia Code', 'Consolas';
  }
</style>