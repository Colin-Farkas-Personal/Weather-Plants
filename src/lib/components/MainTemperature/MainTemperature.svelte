<script lang="ts">
    let { temperature, feelsLike}: { temperature: number, feelsLike: number} = $props();
</script>

<h2 data-testid="main-temperature-temperature">{temperature}</h2>
<p data-testid="main-temperature-feels-like">Feels like {feelsLike}</p>