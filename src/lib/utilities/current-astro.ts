type CurrentAstro = {
	label: 'Sunrise' | 'Sunset';
	status: 'SUNRISE' | 'SUNSET';
};

function getCurrentAstro(
	currentHour: number,
	sunriseHour: number,
	sunsetHour: number,
): CurrentAstro | null {
	switch (currentHour) {
		case sunriseHour:
			return { label: 'Sunrise', status: 'SUNRISE' };
		case sunsetHour:
			return { label: 'Sunset', status: 'SUNSET' };
		default:
			return null;
	}
}

export { getCurrentAstro, type CurrentAstro };
