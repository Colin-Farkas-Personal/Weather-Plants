import SunriseIcon from '~icons/lucide/sunrise';
import SunsetIcon from '~icons/lucide/sunset';
import type { Component } from 'svelte';

export type AstroStatus = 'SUNRISE' | 'SUNSET';

const astroConditionIcons: Record<AstroStatus, Component> = {
	SUNRISE: SunriseIcon,
	SUNSET: SunsetIcon,
};

function parseAstroIcon(astro: AstroStatus): Component {
	return astroConditionIcons[astro];
}

export { parseAstroIcon, astroConditionIcons };
