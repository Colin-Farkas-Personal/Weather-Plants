// Stars are visible at night, fade out after sunrise, and fade in after sunset.

interface UpdateStarProperties {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
}

export function updateNightTimeStarOpacity({
	hourOfDay,
	sunriseHour,
	sunsetHour,
}: UpdateStarProperties) {
	if (typeof document === 'undefined') {
		return;
	}

	const nightStarsElement = document.getElementById('night-stars') as HTMLElement | null;
	if (!nightStarsElement) return;

	// sunrise - fade out to 0% before sunriseHour
	// sunset - fade in to 100% after sunsetHour

	// Define transition windows (in hours)
	const FADE_DURATION = 2; // 2 hours fade in/out

	let opacity = 0;

	// Evening: fade in after sunset
	if (hourOfDay >= sunsetHour && hourOfDay < sunsetHour + FADE_DURATION) {
		const progress = (hourOfDay - sunsetHour) / FADE_DURATION;
		opacity = progress;
	}
	// Night before sunrise: fade out as we approach sunrise
	else if (hourOfDay >= sunriseHour - FADE_DURATION && hourOfDay < sunriseHour) {
		const progress = (sunriseHour - hourOfDay) / FADE_DURATION;
		opacity = progress;
	}
	// Full night (after fade-in window, before fade-out window)
	else if (hourOfDay >= sunsetHour + FADE_DURATION || hourOfDay < sunriseHour - FADE_DURATION) {
		opacity = 1;
	}

	// Clamp for safety (handles edge cases like weird input ranges)
	opacity = Math.min(1, Math.max(0, opacity));

	const opacityPercent = `${Math.round(opacity * 100)}%`;

	// Apply as percentage (opacity supports percentages in modern browsers)
	nightStarsElement.style.setProperty('--night-stars-opacity', opacityPercent);
}

export function updateNightTimeStarTransform({
	hourOfDay,
	sunriseHour,
	sunsetHour,
}: UpdateStarProperties) {
	if (typeof document === 'undefined') {
		return;
	}

	const nightStarsElement = document.getElementById('night-stars') as HTMLElement | null;
	if (!nightStarsElement) return;

	// Consider it "night" from sunset -> next sunrise (wraps across midnight)
	const isNight = hourOfDay >= sunsetHour || hourOfDay < sunriseHour;

	// If it's daytime, reset transforms so we don't "freeze" the last night position.
	if (!isNight) {
		nightStarsElement.style.setProperty('--night-stars-transform-x', '0px');
		nightStarsElement.style.setProperty('--night-stars-transform-y', '0px');
		return;
	}

	// Normalize a 0..1 progress across the whole night (sunset -> next sunrise),
	// even when we wrap past midnight.
	const hoursSinceSunset =
		hourOfDay >= sunsetHour ? hourOfDay - sunsetHour : hourOfDay + (24 - sunsetHour);
	const nightLength = 24 - sunsetHour + sunriseHour;
	const progress = nightLength > 0 ? hoursSinceSunset / nightLength : 0;

	// Map progress to a translation range (tweak these values to taste)
	const MAX_TRANSLATE_X_PX = 80;
	const MAX_TRANSLATE_Y_PX = -40;

	const x = progress * MAX_TRANSLATE_X_PX;
	const y = progress * MAX_TRANSLATE_Y_PX;

	nightStarsElement.style.setProperty('--night-stars-transform-x', `${x}px`);
	nightStarsElement.style.setProperty('--night-stars-transform-y', `${y}px`);
}
