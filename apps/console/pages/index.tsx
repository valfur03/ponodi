import styled from 'styled-components';
import { SignInWithButton } from '@ponodi/ui';
import { Pocket } from '@ponodi/icons';
import config from '../config';

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export interface IndexProps {
	error: { message: string } | null,
	request_token: string | null,
};

export async function getServerSideProps(): Promise<{ props: IndexProps }> {
	let request_token: string;
	try {
		const response = await fetch('http://localhost:4200/api/pocket/authorize', {
			method: 'POST'
		});
		const data = await response.json()
			.then((json) => json)
			.catch(() => { throw null });
		if (!response.ok) throw data;
		request_token = data.code;
	} catch (error) {
		return { props: {
			request_token: null,
			error: {
				message: error?.message || 'An unexpected error occured... Please try again later.',
			},
		} };
	}
	return ({ props: { request_token, error: null } });
}

export function Index({ request_token, error }: IndexProps) {
	const pocket_authorization_url = `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${config.redirect_uri}`;
	if (error !== null) {
		return (
			<StyledPage>
				<p data-testid="error-message">{ error.message }</p>
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
