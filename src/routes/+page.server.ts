import { redirect } from '@sveltejs/kit';

function getRandomLocation() {
	const locations = [
		'Athens',
		'Gothenburg',
		'Oslo',
		'Texas',
		'Paris',
		'Tokyo',
		'London',
		'Berlin',
		'Madrid',
		'Rome',
		'Lisbon',
		'Copenhagen',
		'Helsinki',
		'Reykjavik',
		'Miami',
		'Bangkok',
		'Dubai',
		'Cairo',
		'Sydney',
		'Honolulu',
	];
	return locations[Math.floor(Math.random() * locations.length)];
}

export function load() {
	throw redirect(307, '/overview/' + getRandomLocation());
}
