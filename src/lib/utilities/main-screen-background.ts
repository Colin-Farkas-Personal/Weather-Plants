import { browser } from '$app/environment';

function setScreenBackgroundColor(color: string): void {
	if (!browser) return;

	document.body.style.backgroundColor = color;

	let themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
	if (!themeMeta) {
		themeMeta = document.createElement('meta');
		themeMeta.name = 'theme-color';
		document.head.appendChild(themeMeta);
	}
	themeMeta.content = color;
}

export { setScreenBackgroundColor };
