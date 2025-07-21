<script lang="ts">
	import type { Component } from "svelte";

    interface OverviewRangeDescriptiveProps {
        Icon: Component
        label: string,
        temp: number;
    }

    let { Icon, label, temp }: OverviewRangeDescriptiveProps = $props();
</script>

<div class="overview-range-descriptive">
    <Icon />
    <dt>{temp}</dt>
    <dt>{label}</dt>
</div>