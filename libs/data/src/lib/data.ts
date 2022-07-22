export const ColorStyle = {
	primary: '#3c6ca7',
	secondary: '#17a398',
	surface: '#fbfbfb',
	'on-surface': '#212121',
};
export type ColorStyleKey = keyof typeof ColorStyle;
export function isColorStyle(color: string): color is ColorStyleKey {
	return color in ColorStyle;
}
