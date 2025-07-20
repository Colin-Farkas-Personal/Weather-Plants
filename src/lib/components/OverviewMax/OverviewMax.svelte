<script lang="ts">
	import { toTemperatureUnit } from "$lib/utilities/formatted-weather";


    interface OverviewMaxProps {
        maxTemp: number;
    }

	let { maxTemp }: OverviewMaxProps = $props();
</script>

<div>
  <span>{toTemperatureUnit(maxTemp, 'celsius')}</span>
</div>
