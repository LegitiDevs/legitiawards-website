<script lang="ts">
	import { CURRENT_EVENT } from "#lib/constants.ts";
	import { onMount } from "svelte";
	import type { Categories } from "../../../api/categories/+server";
	import TabContainer from "./TabContainer.svelte";
  import "./layout.css";
	import type { SerializedNominationsDocument } from "#lib/schemas/collections.ts";
	import { countCategoryValues, fetchInitialData, getNomineeNames } from ".";
	import NominationSubmissionTab from "./NominationSubmissionTab.svelte";
	import Tab from "./Tab.svelte";
	import { BarChart } from "layerchart";
	import type { Votes } from "#lib/schemas/voting.ts";
	import NominationsFrequencyTab from "./NominationsFrequencyTab.svelte";

  // lmfao this code is so horrible

  let nominations = $state<SerializedNominationsDocument[]>();
  let categories = $state<Categories>()

  async function refreshData() { 
    [nominations, categories] = await fetchInitialData(); 
  }

  onMount(refreshData)
</script>

<div class="main-container">
  <div class="block no-outline full-row" style="padding-block: 2rem;">
    <h1>Admin Dashboard</h1>
    <p>Do not leak!</p>
    <br />
    <button onclick={refreshData}>Refresh data</button>
  </div>
  <div class="block">
    <h2>Current Event</h2>
    <p class="data">{CURRENT_EVENT}</p>
  </div>
  <div class="block">
    <h2>Submission Count (Nominations)</h2>
    <p class="data">{nominations?.length}</p>
  </div>
  <div class="block full-row">
    <h2 class="big">Submissions (Nominations)</h2>
    <TabContainer>
      {#each nominations as nomination (nomination._id)}
        <NominationSubmissionTab 
          nomination={nomination}
          ondelete={refreshData}
        />
      {/each}
    </TabContainer>
  </div>
  <div class="block full-row">
    <h2 class="big">Nominations Frequency</h2>
    {#if categories}
    <TabContainer>
      {#each Object.keys(categories.categories) as category (category)}
        {let data = $derived(countCategoryValues(nominations as Votes[], category as keyof Votes['categories']))}
        <NominationsFrequencyTab category={category} data={data} />
      {/each}
    </TabContainer>
    {/if}
  </div>
</div>

<style>
  .main-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    @media (max-width: 48rem) { grid-template-columns: 1fr 1fr; }

    min-height: 100vh;

    font-family: 'Poppins', 'Helvetica';
    color: white;

    padding: 2rem;
    gap: 1rem;
    background-color: rgb(17, 23, 19);
  }
</style>