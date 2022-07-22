import { Button } from '@ponodi/ui';
import { ColorStyleKey } from '@ponodi/data';

export interface SignInWithButtonProps {
	color: string,
	href?: string,
	icon: () => JSX.Element,
	service: string,
	text: ColorStyleKey,
	// variants: string,
};

export function SignInWithButton(props: SignInWithButtonProps) {
	return (
		<Button color={props.color} href={props.href} icon={props.icon} text={props.text} /*variants={props.variants}*/ >
			Sign in with { props.service }
		</Button>
   );
}

export default SignInWithButton;
