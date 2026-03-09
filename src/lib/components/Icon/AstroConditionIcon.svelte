<script lang="ts">
	import { type AstroStatus, parseAstroIcon } from './AstroConditionIcon.parseAstroIcon';

	// Props
	interface AstroConditionIconProps {
		astroStatus: AstroStatus;
	}

	let { astroStatus }: AstroConditionIconProps = $props();

	// State
	let Icon = $derived(parseAstroIcon(astroStatus));
</script>

{#if Icon}<Icon />{/if}
