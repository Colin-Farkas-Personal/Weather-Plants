<script lang="ts">
	import { toTemperatureUnit } from "$lib/utilities/formatted-weather";


    interface OverviewMinProps {
        minTemp: number;
    }

	let { minTemp }: OverviewMinProps = $props();
</script>

<div>
  <span>{toTemperatureUnit(minTemp, 'celsius')}</span>
</div>
