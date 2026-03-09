<script lang="ts">
	import type { ConditionStatus } from '$lib/globals/conditionStatusStore.svelte';
	import ClockBoldIcon from '~icons/ph/clock-bold';
	import WeatherConditionIcon from '../Icon/WeatherConditionIcon.svelte';
	import AstroConditionIcon from '../Icon/AstroConditionIcon.svelte';

	export type HourCondition = {
		hour: number;
		condition: ConditionStatus;
		astro: 'SUNRISE' | 'SUNSET' | undefined;
	};
	interface DisplayWheelProp {
		currentHour: number;
		forecastHour: number;
		dailyConditionForecast: HourCondition[];
	}

	let { currentHour, forecastHour, dailyConditionForecast }: DisplayWheelProp = $props();

	const forecastTime = $derived(toHourMinuteValue(forecastHour));
	const diffHours = $derived(getDiffHours(currentHour, forecastHour));

	$effect(() => {
		syncWheelPast();
		syncWheelFuture();
	});

	let timeLineElementPast: HTMLDivElement;
	let timeLineElementFuture: HTMLDivElement;

	const itemElementsFuture = {
		items: [] as HTMLDivElement[],

		get get(): HTMLDivElement[] {
			return this.items;
		},
		set add(value: HTMLDivElement) {
			this.items.push(value);
		},
	};

	const itemElementsPast = {
		items: [] as HTMLDivElement[],

		get get(): HTMLDivElement[] {
			return this.items;
		},
		set add(value: HTMLDivElement) {
			this.items.push(value);
		},
	};

	function toHourMinuteValue(hour: number): string {
		// Convert a decimal hour (e.g., 14.5) to "HH:MM" format.
		// This version rounds to the nearest minute and never produces negative minutes.
		if (!Number.isFinite(hour)) return '00:00';

		// Round the total minutes first (this avoids negative minute artifacts like 15:-30).
		const totalMinutesRounded = Math.round(hour * 60);

		// Normalize into a 0..1439 minute range (handles negatives and >24h safely).
		const minutesInDay = 24 * 60;
		const normalized = ((totalMinutesRounded % minutesInDay) + minutesInDay) % minutesInDay;

		const h = Math.round(normalized / 60);
		const m = normalized % 60;

		return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
	}

	function getDiffHours(currentHour: number, forecastHour: number) {
		// Calculate the diff hour string (e.g., "+2", "-1", "0")
		const diff = Math.round(forecastHour - currentHour);

		if (diff === 0) {
			return `${diff}`;
		} else if (diff > 0) {
			return `+${diff}`;
		} else {
			return `${diff}`;
		}
	}

	function syncWheelPast() {
		if (!timeLineElementPast) return;

		const totalHours = dailyConditionForecast.length;
		const scrollWidth = timeLineElementPast.scrollWidth - timeLineElementPast.clientWidth;
		const scrollPosition = (forecastHour / totalHours) * scrollWidth;
		timeLineElementPast.scrollLeft = scrollPosition;
	}

	function syncWheelFuture() {
		if (!timeLineElementFuture) return;

		const forecastHourFuture = forecastHour + 1;
		const totalHours = dailyConditionForecast.length;
		const scrollWidth = timeLineElementFuture.scrollWidth - timeLineElementFuture.clientWidth;
		const scrollPosition = (forecastHourFuture / totalHours) * scrollWidth;
		timeLineElementFuture.scrollLeft = scrollPosition;
	}
</script>

<div id="display-wheel" class="display-wheel">
	<div class="time-display">
		<div class="time">
			<ClockBoldIcon />
			<span class="hour-minute">{forecastTime}</span>
		</div>
		<span class="diff">{diffHours}</span>
	</div>
	<div class="container">
		<div class="time-line leading" bind:this={timeLineElementPast}>
			<div class="spacer"></div>
			{#each dailyConditionForecast as hourCondition (hourCondition.hour)}
				<div class="hour-condition" bind:this={itemElementsPast.add}>
					<span class="hour">{hourCondition.hour}</span>
					<span class="condition">
						{#if hourCondition.astro}
							<AstroConditionIcon astroStatus={hourCondition.astro} />
						{:else}
							<WeatherConditionIcon conditionStatus={hourCondition.condition} />
						{/if}
					</span>
				</div>
			{/each}
		</div>
		<span class="block"></span>
		<div class="time-line trailing" bind:this={timeLineElementFuture}>
			{#each dailyConditionForecast as hourCondition (hourCondition.hour)}
				<div class="hour-condition" bind:this={itemElementsFuture.add}>
					<span class="hour">{hourCondition.hour}</span>
					<span class="condition">
						{#if hourCondition.astro}
							<AstroConditionIcon astroStatus={hourCondition.astro} />
						{:else}
							<WeatherConditionIcon conditionStatus={hourCondition.condition} />
						{/if}
					</span>
				</div>
			{/each}
			<div class="spacer"></div>
		</div>
	</div>
</div>

<style lang="scss">
	.display-wheel {
		position: relative;
		display: flex;

		color: white;

		max-width: 420px;
		border-radius: 100vh;

		animation: growFromTop 250ms ease-out;

		@keyframes growFromTop {
			from {
				transform: scale(0.9);
				opacity: 0;
			}
			to {
				transform: scale(1);
				opacity: 1;
			}
		}

		.time-display {
			z-index: 1;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 6px;
			padding: 6px 12px;
			border-radius: 30px;
			background-color: #ffcbb8;
			font-size: 18px;
			font-weight: bold;

			.time {
				display: inherit;
				justify-content: inherit;
				align-items: inherit;
				gap: 2px;

				width: max-content;
				font-weight: bold;
				color: #5e2f1d;
			}

			.hour-minute {
				width: 4ch;
			}

			.diff {
				color: #926a5b;
				text-align: center;
				width: 3ch;
			}

			&::before {
				--r: 3px; /* border radius */
				--h: 18px; /* triangle height */

				content: '';
				position: absolute;
				left: -10px;
				top: 50%;
				transform: translateY(-50%);

				height: var(--h);
				aspect-ratio: cos(30deg);
				--_g: calc(tan(60deg) * var(--r)) right var(--r), #000 98%, #0000 101%;
				-webkit-mask:
					conic-gradient(
							from 240deg at calc(200% - 3 * var(--r) / 2),
							#000 60deg,
							#0000 0
						)
						100% 0 / calc(100% - 3 * var(--r) / 2) 100% no-repeat,
					radial-gradient(var(--r) at calc(2 * var(--r)) 50%, #000 98%, #0000 101%),
					radial-gradient(var(--r) at top var(--_g)),
					radial-gradient(var(--r) at bottom var(--_g));
				clip-path: polygon(0 50%, 100% 100%, 100% 0);
				background: inherit;
			}

			&::after {
				--r: 3px; /* border radius */
				--h: 18px; /* triangle height */

				content: '';
				position: absolute;
				right: -10px;
				top: 50%;
				transform: translateY(-50%);

				height: var(--h);
				aspect-ratio: cos(30deg);
				--_g: calc(tan(60deg) * var(--r)) left var(--r), #000 98%, #0000 101%;
				-webkit-mask:
					conic-gradient(from 60deg at calc(3 * var(--r) / 2 - 100%), #000 60deg, #0000 0)
						0 0 / calc(100% - 3 * var(--r) / 2) 100% no-repeat,
					radial-gradient(
						var(--r) at calc(100% - 2 * var(--r)) 50%,
						#000 98%,
						#0000 101%
					),
					radial-gradient(var(--r) at top var(--_g)),
					radial-gradient(var(--r) at bottom var(--_g));
				clip-path: polygon(100% 50%, 0 100%, 0 0);

				background: inherit;
			}
		}

		.block {
			display: block;
			flex: 1;
		}

		.container {
			display: flex;

			overflow: hidden;

			-webkit-mask-image: linear-gradient(
				to right,
				transparent 0%,
				black 50%,
				transparent 100%
			);
			mask-image: linear-gradient(from left, black, transparent);
			-webkit-mask-repeat: no-repeat;
			mask-repeat: no-repeat;
			-webkit-mask-size: 100% 100%;
			mask-size: 100% 100%;

			.time-line {
				flex: 1;
				display: flex;

				scrollbar-width: none;
				user-select: none;

				overflow: hidden;
				user-select: none;

				.spacer {
					display: block;
					flex: 0 0 100%;
					pointer-events: none;
				}

				.hour-condition {
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 2px;

					padding: 0 16px;

					.hour {
						color: #888f93;

						font-size: 14px;
						font-weight: bold;
						line-height: 1;
					}

					.condition {
						display: flex;
						justify-content: center;
						align-items: center;
						color: #906657;
						width: 24px;
						height: 24px;
					}
				}

				&.leading {
					padding-right: 20px;

					.hour-condition {
						&:not(:nth-child(2))::after {
							content: '';
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							right: 0;

							width: 3.5px;
							height: 50%;

							border-radius: 2px;
							background-color: #3d3d3d;
						}
					}
				}

				&.trailing {
					padding-left: 20px;

					.hour-condition {
						// The last child is the .spacer, so we exclude the second-to-last element (the final .hour-condition)
						&:not(:nth-last-child(2))::after {
							content: '';
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							right: 0;

							width: 3.5px;
							height: 50%;

							border-radius: 2px;
							background-color: #3d3d3d;
						}
					}
				}
			}
		}
	}
</style>
