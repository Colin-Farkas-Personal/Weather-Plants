import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: 'Weather Pot',
				short_name: 'WeatherPot',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					{
						src: '/icons/icon-large.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true, // enables PWA during dev
			},
		}),
		Icons({ compiler: 'svelte' }),
	],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser'],
			}
		: undefined,
});
