<script module lang="ts">
	export function getComponentName(pathString: string): string {
		if (!pathString.endsWith('.svelte')) {
			return '';			
		}
		
		const pathParts = pathString.split('/');
		const fileName = pathParts[pathParts.length - 1];
		return fileName.replace('.svelte', '') || '';
	}

	export function transformToTestId(parentName: string): string {
		return parentName
			.replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen before uppercase letters
			.toLowerCase(); // Convert to lowercase
	}
</script>

<script lang="ts">
	import type { SVGIconProps } from '$lib/types/icon-component';

	// Props
	let { children, parentName, size = '24' }: SVGIconProps = $props()
	const testId = parentName && ("svg-icon-" + transformToTestId(parentName));
</script>

<svg
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 256 256"
	fill="currentColor"
	data-testid={testId}
>
	{@render children?.()}
</svg>
