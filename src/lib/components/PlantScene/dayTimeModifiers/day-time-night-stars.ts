// Stars are visible at night, fade out after sunrise, and fade in after sunset.

interface UpdateStarProperties {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
}

export function updateStarProperties({ hourOfDay, sunriseHour, sunsetHour }: UpdateStarProperties) {
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
