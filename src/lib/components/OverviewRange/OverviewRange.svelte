<script lang="ts">
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '$lib/components/Icon/Bold/ThermometerHot.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import Divider from '../Divider/Divider.svelte';
	import OverviewRangeDescriptive from './OverviewRangeDescriptive.svelte';
	import OverviewRangeMinimal from './OverviewRangeMinimal.svelte';

	interface OverviewRangeProps {
		min: number;
		max: number;
	}
	let { min, max }: OverviewRangeProps = $props();

	const orientation = windowOrientation;
</script>

<dl role="group" class={`overview-range ${$orientation}`}>
	{#if $orientation === 'portrait'}
		<OverviewRangeMinimal
			Icon={ThermometerCold}
			temp={min}
			ariaLabel="Lowest temperature today"
		/>
		<Divider type="bull" />
		<OverviewRangeMinimal
			Icon={ThermometerHot}
			temp={max}
			ariaLabel="Highest temperature today"
		/>
	{:else if $orientation === 'landscape'}
		<OverviewRangeDescriptive
			Icon={ThermometerCold}
			label="Lowest"
			temp={min}
			ariaLabel="Lowest temperature today"
		/>
		<OverviewRangeDescriptive
			Icon={ThermometerHot}
			label="Highest"
			temp={max}
			ariaLabel="Highest temperature today"
		/>
	{/if}
</dl>

<style lang="scss">
	.overview-range {
		display: flex;
		flex-flow: wrap;
		align-items: center;
		justify-content: center;
	}

	.portrait {
		gap: var(--fluid-size-em-small);
	}

	.landscape {
		gap: var(--fluid-size-em-medium);
	}
</style>
