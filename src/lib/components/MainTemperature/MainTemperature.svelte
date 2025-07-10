<script lang="ts">
    let { temperature, feelsLike}: { temperature: string, feelsLike: string} = $props();
</script>

<h2 data-testid="main-temperature-temperature">{temperature}</h2>
<p data-testid="main-temperature-feels-like">Feels like {feelsLike}</p>