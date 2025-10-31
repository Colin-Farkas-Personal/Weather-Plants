<script lang="ts">
	import '$lib/styles/styles.scss';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="Weather Plants" />
	<link rel="apple-touch-icon" href="/icons/icon-large.png" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

{@render children?.()}
