<script lang="ts">
    let { temperature, feelsLike}: { temperature: number, feelsLike: number} = $props();
</script>

<h2>{temperature}°C</h2>
<p>Feels like {feelsLike}°C</p>