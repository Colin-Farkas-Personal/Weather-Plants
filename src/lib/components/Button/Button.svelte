<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		variant?: 'primary' | 'secondary';
		size?: 'medium' | 'large';
		onClick?: () => void;
		children: Snippet;
	}

	let {
		type,
		disabled = false,
		variant = 'primary',
		size = 'medium',
		onClick,
		children,
	}: ButtonProps = $props();
</script>

<Button.Root
	class="button {variant} {size}"
	{type}
	{disabled}
	aria-disabled={disabled || undefined}
	onclick={onClick}
>
	{@render children?.()}
</Button.Root>

<style lang="scss">
	:global {
		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 4px;

			padding: 6px 12px;

			background: none;
			border-radius: 30px;

			font-size: 16px;
			font-weight: bold;

			cursor: pointer;

			&:hover {
				color: var(--theme-bg-primary-inversed);
			}

			&.primary {
				background-color: var(--theme-bg-primary);
				border: 2px solid var(--theme-border-primary);
				color: var(--theme-text-primary);

				&:hover {
					background-color: var(--theme-bg-primary-hover);
				}
			}
			&.secondary {
				border: none;
				color: var(--theme-text-secondary);
				outline-width: 2px;
				outline-style: solid;
				outline-color: inherit;

				&:active,
				&:focus-visible {
					outline: 2px solid var(--theme-border-primary);
					background-color: var(--theme-border-primary);
					color: var(--theme-text-primary);
				}
			}
		}
	}
</style>
