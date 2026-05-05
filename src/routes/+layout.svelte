<script>
	import { page } from '$app/state';
	import '$lib/global.css'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/assets/img/press_kit/community_legitiawards_logo.png" />
	<title>Community LegitiAwards</title>
	<meta property="og:title" content="The Community LegitiAwards" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{page.url.origin}" />
	<meta property="og:image" content="/assets/img/press_kit/community_legitiawards_banner.png" />
</svelte:head>

{@render children()}
