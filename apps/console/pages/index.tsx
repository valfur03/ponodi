import styled from 'styled-components';
import { SignInWithButton } from '@ponodi/ui';
import { Pocket } from '@ponodi/icons';
import Link from 'next/link';

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export async function getServerSideProps() {
	let request_token: string;
	try {
		const response = await fetch('http://localhost:4200/api/pocket/authorize', {
			method: 'POST'
		});
		if (!response.ok) throw response.json();
		request_token = (await response.json()).code;
	} catch (error) {
		request_token = null;
		return error.then((_) => ({ props: { request_token, error: _ } }))
			.catch((_) => ({ props: { request_token, error: { message: 'An unexpected error occured... Please try again later.' } } }))
	}
	return ({ props: { request_token, error: null } });
}

export function Index({ request_token, error }) {
	const pocket_authorization_url = `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${process.env.REDIRECT_URI}`;
	if (error !== null) {
		return (
			<StyledPage>
				<p>{ error.message }</p>
			</StyledPage>
		);
	}
	return (
		<StyledPage>
			<SignInWithButton color="#ef4056" href={pocket_authorization_url} icon={Pocket} text="surface" service="Pocket" /*variants="filled"*/ />
		</StyledPage>
	);
}

export default Index;
