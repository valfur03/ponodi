import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColorStyle, isColorStyle } from '@ponodi/data';

function Icon() {
	return <div data-testid="div-icon"></div>;
}

jest.mock("next/link", () => {
	return ({ children, href }: { children: React.ReactNode, href: string }) => {
		return <a data-testid="mock-link" href={href}>{children}</a>;
	}
});

import SignInWithButton from './sign-in-with-button';

describe('SignInWithButton', () => {
	it('should render successfully', () => {
  		const { baseElement } = render(<SignInWithButton color="primary" icon={Icon} service="Hello" text="on-surface" /*variants="filled"*/ />);
  		expect(baseElement).toBeTruthy();
  	});
	describe('color prop', () => {
		it.each(Object.keys(ColorStyle))('should render with the %s background color', (color) => {
			const { container } = render(
				<SignInWithButton color={color} icon={Icon} service="Service" text="on-surface" /*variants="filled"*/ />
			);
			if (!isColorStyle(color)) throw Error;
			expect(container.firstChild).toHaveStyle({
				backgroundColor: ColorStyle[color],
			});
		});
		it.each(['#ef4056', '#ffff00'])('should render with the %s background color', (color) => {
			const { container } = render(
				<SignInWithButton color={color} icon={Icon} service="Service" text="on-surface" /*variants="filled"*/ />
			);
			expect(container.firstChild).toHaveStyle({
				backgroundColor: color,
			});
		});
	});
	describe('href prop', () => {
		it('should add a Link tag if present', () => {
			render(
				<SignInWithButton color="primary" href="https://example.org" icon={Icon} service="Service" text="on-surface" /*variants="filled"*/ />
			);
			expect(screen.getByTestId('mock-link')).toBeInTheDocument();
			expect(screen.getByTestId('mock-link')).toHaveAttribute('href', 'https://example.org');
		});
		it('should not add a Link tag if not present', () => {
			render(
				<SignInWithButton color="primary" icon={Icon} service="Service" text="on-surface" /*variants="filled"*/ />
			);
			expect(screen.queryByTestId('mock-link')).not.toBeInTheDocument();
		});
	});
	describe('icon prop', () => {
		it('should render an icon', () => {
			render(
				<SignInWithButton color="primary" icon={Icon} service="Service" text="on-surface" /*variants="filled"*/ />
			);
			expect(screen.getByTestId('div-icon')).toBeInTheDocument();
		});
	});
	describe('service prop', () => {
		it('should write the name of the service', () => {
			const { container } = render(
				<SignInWithButton color="primary" icon={Icon} service="Service" text="on-surface" /*variants="filled"*/ />
			);
			expect(container).toHaveTextContent('Sign in with Service');
		});
	});
	describe('text prop', () => {
		it.each(Object.keys(ColorStyle))('should render with the %s color', (color) => {
			if (!isColorStyle(color)) throw Error;
			const { container } = render(
				<SignInWithButton color="primary" icon={Icon} service="Service" text={color} /*variants="filled"*/ />
			);
			expect(container.firstChild).toHaveStyle({
				color: ColorStyle[color],
			});
		});
	});
});
