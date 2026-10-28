<script lang="ts">
	import { CURRENT_EVENT, LEGITIMOOSE_API } from "#lib/constants.ts";
	import { adminStore } from "#lib/stores/session.ts";
	import { onMount } from "svelte";
	import type { Categories } from "../../../api/categories/+server";
	import type { Votes } from "#lib/schemas/voting.ts";
	import TabContainer from "./TabContainer.svelte";
	import Tab from "./Tab.svelte";
  import "./layout.css";
	import { BarChart } from "layerchart";

  let nominations = $state<Votes[]>();
  let categories = $state<Categories>()

  onMount(async () => {
    const nominationsRes = await fetch('/api/nominations', {
      headers: { 'Authorization': adminStore.current.password! }
    })
    nominations = await nominationsRes.json();

    const categoriesRes = await fetch('/api/categories')
    categories = await categoriesRes.json();
  })

  function wait<Data, Fallback>(data: Data, fallback: Fallback = "..." as any) {
    return data == undefined ? fallback : data
  }

  function countNominees(nominees: string[]) {
    let counter: {[k: string]: number} = {};

    for (const nominee of nominees) {
      counter[nominee] ??= 0
      counter[nominee]++
    }

    let grouped = [];
    for (const [nominee, count] of Object.entries(counter)) {
      grouped.push({ nominee, count })
    }

    return grouped
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
    <h2 class="big">Nominations</h2>
    <TabContainer>
    {let categoryObj = $derived(wait(categories?.categories, {}))}
    {let categoryKeys = $derived(Object.keys(categoryObj)) as (keyof Votes['categories'])[]}
      {#each categoryKeys as categoryName}
        <Tab id={categoryName}>
          <h3><code>{categoryName}</code></h3>

          {const loadedNominations = $derived(wait(nominations, []))}
          {const categoryNominations = $derived(loadedNominations.map(v => v.categories[categoryName]))}
          {const data = $derived(countNominees(categoryNominations))}
          <BarChart 
            {data} 
            x="count" 
            y="nominee" 
            orientation="horizontal"
            labels
            axis="y"
            rule={false}
            height={500}
            props={{
              yAxis: {
                tickLabelProps: {
                  textAnchor: 'start',
                  dx: 6,
                  dy: 2,
                  style: 'color: black; font-size: 1em;'
                },
                tickLength: 0
              }
            }}
          />
        </Tab>
      {/each}
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
</style>