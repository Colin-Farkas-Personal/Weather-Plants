<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		label: string;
		Icon?: Snippet;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		variant?: 'primary' | 'secondary';
		size?: 'medium' | 'large';
		onClick?: () => void;
	}

	let {
		label,
		Icon,
		type = 'button',
		disabled = false,
		variant = 'primary',
		size = 'medium',
		onClick,
	}: ButtonProps = $props();
</script>

<button
	class="button {variant} {size}"
	{type}
	{disabled}
	aria-disabled={disabled || undefined}
	onclick={onClick}
>
	{#if Icon}
		<span class="button-icon" aria-hidden="true">{@render Icon?.()}</span>
	{/if}
	<span class="button-label">{label}</span>
</button>

<style lang="scss">
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
		color: var(--theme-text-secondary-inversed);

		cursor: pointer;

		&:hover {
			color: var(--theme-bg-primary-inversed);
		}

		&.primary {
			background-color: var(--theme-bg-primary);
			border: 2px solid var(--theme-border-primary);
			color: var(--theme-text-primary);
		}
		&.secondary {
			border: none;
			color: var(--theme-text-secondary-inversed);
		}
	}
</style>
