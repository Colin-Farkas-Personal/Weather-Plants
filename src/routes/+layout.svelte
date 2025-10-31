<script lang="ts">
	import '$lib/styles/styles.scss';
	import { pwaInfo } from 'virtual:pwa-info';

	let { children } = $props();
	const webManifestLink = pwaInfo?.webManifest?.linkTag ?? '';
</script>

<svelte:head>
	{@html webManifestLink}
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="Weather Pot" />
	<link rel="apple-touch-icon" href="/icons/icon-large.png" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

{@render children?.()}
