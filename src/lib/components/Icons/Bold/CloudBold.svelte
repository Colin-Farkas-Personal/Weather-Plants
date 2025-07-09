<script module lang="ts">
	const componentName: string = getComponentName(import.meta.url);
</script>

<script lang="ts">
	import type { IconProps } from '$lib/types/icon-component';
	import SvgIcon, { getComponentName } from '../SvgIcon.svelte';

	let props: IconProps = $props();
</script>

<SvgIcon {...props} parentName={componentName}>
	<path
		d="M160,36A92.09,92.09,0,0,0,79,84.36,68,68,0,1,0,72,220h88a92,92,0,0,0,0-184Zm0,160H72a44,44,0,0,1-1.82-88A91.86,91.86,0,0,0,68,128a12,12,0,0,0,24,0,68,68,0,1,1,68,68Z"
	/>
</SvgIcon>
