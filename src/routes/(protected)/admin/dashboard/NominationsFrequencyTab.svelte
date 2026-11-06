<script lang="ts">
	import { BarChart } from "layerchart";
	import { getNomineeNames, type NomineeNames, type VoteCount } from ".";
	import Tab from "./Tab.svelte";

  type Props = {
    category: string
    data: VoteCount[]
  }

  let { category, data }: Props = $props();
</script>

{#snippet barChart(data: VoteCount[], displayNames: NomineeNames = {})}
<BarChart
  {data}
  x="votes"
  y="id"
  labels
  orientation="horizontal"
  axis="y"
  rule={false}
  props={{
    yAxis: {
      tickLabelProps: {
        format: v => Object.keys(displayNames).length > 0 ? displayNames[v] : v,
        textAnchor: 'start',
        dx: 6,
        dy: 2,
        style: 'color: black; font-size: clamp(10px, 1vw, 4rem);'
      },
      tickLength: 0
    }
  }}
  padding={{ left: 0, bottom: 16 }}
  height={500}
/>
{/snippet}

<Tab id={category}>
  <h2>{category}</h2>
  {#await getNomineeNames(data)}
    {@render barChart(data)}
  {:then names}
    {@render barChart(data, names)}
  {/await}
</Tab>