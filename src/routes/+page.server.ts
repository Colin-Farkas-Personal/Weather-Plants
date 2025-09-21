import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	goTo: async ({ request }) => {
		const data = await request.formData();
		const locationName = data.get('location');

		console.warn('NAME - ', locationName);
		throw redirect(303, '/overview/' + encodeURIComponent(String(locationName ?? '')));
	},
} satisfies Actions;
