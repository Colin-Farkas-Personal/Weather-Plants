import type { HexColor, HSLColor } from '$lib/components/PlantScene/themes/theme.types';

function convertHexToRGB(hexColor: HexColor, type: 'sRGB' | 'linearRGB' = 'sRGB'): number[] {
	if (type === 'linearRGB') {
		const sRGBColor = sRgbCalculationFromHex(hexColor);
		return linearRgbCalculation(sRGBColor);
	}

	return sRgbCalculationFromHex(hexColor);
}

function sRgbCalculationFromHex(hexColor: HexColor): number[] {
	const hexColorNormalised = hexColor.replace('#', '');

	const numericValue = parseInt(hexColorNormalised, 16);

	const r = (numericValue >> 16) & 0xff;
	const g = (numericValue >> 8) & 0xff;
	const b = numericValue & 0xff;
	return [r, g, b];
}

function linearRgbCalculation(rgbColor: number[]): number[] {
	const [r, g, b] = rgbColor;

	const linearR = r / 255 <= 0.04045 ? r / 255 / 12.92 : Math.pow((r / 255 + 0.055) / 1.055, 2.4);
	const linearG = g / 255 <= 0.04045 ? g / 255 / 12.92 : Math.pow((g / 255 + 0.055) / 1.055, 2.4);
	const linearB = b / 255 <= 0.04045 ? b / 255 / 12.92 : Math.pow((b / 255 + 0.055) / 1.055, 2.4);

	return [linearR * 255, linearG * 255, linearB * 255];
}

function convertHSLToRGB(hslColor: HSLColor, type: 'sRGB' | 'linearRGB' = 'sRGB'): number[] {
	if (type === 'linearRGB') {
		const sRGBColor = sRgbCalculationFromHSL(hslColor);
		return linearRgbCalculation(sRGBColor);
	}
	return sRgbCalculationFromHSL(hslColor);
}

function sRgbCalculationFromHSL(hslColor: HSLColor): number[] {
	const hslColorNormalised = hslColor
		.replace('hsl(', '')
		.replace(')', '')
		.split(',')
		.map((value) => parseInt(value.trim(), 10));

	let [h, s, l] = hslColorNormalised;

	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};

	return [parseInt(f(0), 16), parseInt(f(8), 16), parseInt(f(4), 16)];
}

export { convertHexToRGB, convertHSLToRGB };
