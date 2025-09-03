import type { HexColor } from '../themes/theme.types';
import * as THREE from 'three';

type ToThreeColor = {
	color: THREE.Color;
	alpha: number;
};
function toThreeColor(hex: HexColor): ToThreeColor {
	if (hex.length === 7) {
		hex += 'ff';
	}

	const threeColor = new THREE.Color(hex.slice(0, 7));

	const alphaValue = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;

	return {
		color: threeColor,
		alpha: alphaValue,
	};
}

export { toThreeColor };
