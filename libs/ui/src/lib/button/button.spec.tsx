import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColorStyle, isColorStyle } from '@ponodi/data';

import Button from './button';

function Icon() {
	return <div data-testid="div-icon"></div>;
}

jest.mock("next/link", () => {
	return ({ children, href }: { children: React.ReactNode, href: string }) => {
		return <a data-testid="mock-link" href={href}>{children}</a>;
	}
});

describe('Button', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Button color="primary" icon={null} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
		);
		expect(baseElement).toBeTruthy();
	});
	it('should render with the child\'s text', () => {
		const { getByText } = render(
			<Button color="primary" icon={null} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
		);
		expect(getByText('Hello, world!')).toBeInTheDocument();
	});
	describe('color prop', () => {
		it.each(Object.keys(ColorStyle))('should render with the %s background color', (color) => {
			const { container } = render(
				<Button color={color} icon={null} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
			);
			if (!isColorStyle(color)) throw Error;
			expect(container.firstChild).toHaveStyle({
				backgroundColor: ColorStyle[color],
			});
		});
		it.each(['#ef4056', '#ffff00'])('should render with the %s background color', (color) => {
			const { container } = render(
				<Button color={color} icon={null} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
			);
			expect(container.firstChild).toHaveStyle({
				backgroundColor: color,
			});
		});
	});
	describe('href prop', () => {
		it('should add a Link tag if present', () => {
			render(
				<Button color="primary" href="https://example.org" icon={Icon} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
			);
			expect(screen.getByTestId('mock-link')).toBeInTheDocument();
			expect(screen.getByTestId('mock-link')).toHaveAttribute('href', 'https://example.org');
		});
		it('should not add a Link tag if not present', () => {
			render(
				<Button color="primary" icon={Icon} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
			);
			expect(screen.queryByTestId('mock-link')).not.toBeInTheDocument();
		});
	});
	describe('icon prop', () => {
		it('should render an icon', () => {
			render(
				<Button color="primary" icon={Icon} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
			);
			expect(screen.getByTestId('div-icon')).toBeInTheDocument();
		});
		it('should allow a null icon', () => {
			render(
				<Button color="primary" icon={null} text="on-surface" /*variants="filled"*/ >Hello, world!</Button>
			);
		});
	});
	describe('text prop', () => {
		it.each(Object.keys(ColorStyle))('should render with the %s color', (color) => {
			if (!isColorStyle(color)) throw Error;
			const { container } = render(
				<Button color="primary" icon={null} text={color} /*variants="filled"*/ >Hello, world!</Button>
			);
			expect(container.firstChild).toHaveStyle({
				color: ColorStyle[color],
			});
		});
	});
});
