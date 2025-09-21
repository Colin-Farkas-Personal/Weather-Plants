<script lang="ts">
	import type { IconProps } from '$lib/types/icon-component';
	import type { Snippet } from 'svelte';
	import { transformToTestId } from './SvgIcon.helper';

	interface SVGIconProps extends IconProps {
		children: Snippet;
		parentName: string;
		ariaLabel?: string;
	}

	// Props
	let { children, parentName, size = '24', ariaLabel }: SVGIconProps = $props();
	const testId = parentName && 'svg-icon-' + transformToTestId(parentName);
</script>

<svg
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 256 256"
	fill="currentColor"
	data-testid={testId}
	aria-hidden={!ariaLabel}
	aria-label={ariaLabel}
>
	{@render children?.()}
</svg>
