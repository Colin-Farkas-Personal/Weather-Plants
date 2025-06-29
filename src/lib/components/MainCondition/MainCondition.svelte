
<script lang="ts">
    import type { Condition, DailyRange } from "$lib/types/weather";
    
    interface Props {
        condition: Condition['text'];
        min: DailyRange['min'];
        max: DailyRange['max'];
    }

    let { condition, min, max }: Props = $props();
</script>

<h3>L: {min} • {condition} • {max}</h3>