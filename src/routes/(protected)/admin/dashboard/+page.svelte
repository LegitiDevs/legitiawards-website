<script lang="ts">
	import { Chart, Circle, Axis, Layer, Line } from 'layerchart';
	import { onMount } from 'svelte';

  let data = $state([]);

  onMount(async () => {
    const res = await fetch('https://api.legiti.dev/v4/players?limit=10&sort_by=legiticoins');
    data = await res.json();
    data.reverse()
  })
</script>

<Chart
	{data}
	x="name"
	y="legiticoins"
	yNice
	padding={{ top: 20, bottom: 20, left: 24, right: 10 }}
	height={300}
>
	<Layer>
		<Line x1={0} x2="name" y1="legiticoins" y2="legiticoins" />
		<Axis placement="bottom" rule />
		<Axis placement="left" rule />
		<Circle cx="name" cy="legiticoins" r={5} class="fill-primary" />
	</Layer>
</Chart>