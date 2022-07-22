import styled from 'styled-components';
import { ColorStyle, ColorStyleKey, isColorStyle } from '@ponodi/data';
import React from 'react';

export interface ButtonProps {
	children: React.ReactNode,
	color: ColorStyleKey | string,
	icon: (() => JSX.Element) | null,
	text: ColorStyleKey,
	// variants: string,
};

const StyledButton = styled.button`
	position: relative;

	border-radius: 2px;
	padding: 0 16px;
	height: 48px;

	display: flex;
	align-items: center;

	font-size: 16px;

	.overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		opacity: 0%;
		background-color: black;
	}

	.icon {
		width: 24px;
		height: 24px;

		margin-right: 12px;
	}

	&:hover {
		cursor: pointer;

		.overlay {
			opacity: 5%;
		}
	}
`;

export function Button(props: ButtonProps) {
	let style = {
		backgroundColor: '',
		color: '',
	};
	if (isColorStyle(props.color)) style.backgroundColor = ColorStyle[props.color];
	else style.backgroundColor = props.color;
	style.color = ColorStyle[props.text];
	let icon = null;
	if (props.icon !== null) icon = <div className="icon"><props.icon /></div>;
	return (
		<StyledButton style={style}>
			<div className="overlay"></div>
			{ icon }
			{ props.children }
		</StyledButton>
	);
}

export default Button;
