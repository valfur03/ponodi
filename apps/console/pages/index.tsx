import { useEffect, useState } from 'react';
import router from 'next/router';
import styled from 'styled-components';
import { SignInWithButton } from '@ponodi/ui';
import { Pocket } from '@ponodi/icons';
import config from '../config';
import authService from '@ponodi/shared/auth';

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export function Index() {
	if (typeof window === 'undefined') return <StyledPage></StyledPage>;
	if (localStorage.getItem('access_token') !== null
		&& localStorage.getItem('username') !== null) {
		router.replace('/dashboard');
		return <StyledPage></StyledPage>;
	}
	const [request_token, setRequestToken] = useState(localStorage.getItem('request_token'));
	const [error_message, setErrorMessage] = useState(null);
	useEffect(() => {
		if (request_token === null) {
			authService.fetchRequestToken()
				.then((token: string) => {
					localStorage.setItem('request_token', token);
					setRequestToken(token);
				})
				.catch((error) => setErrorMessage(error.message));
		}
	}, []);
	if (error_message !== null) {
		return (
			<StyledPage>
				<p data-testid="error-message">{ error_message }</p>
			</StyledPage>
		);
	}
	if (request_token === null) return <StyledPage></StyledPage>;
	const pocket_authorization_url = `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${config.redirect_uri}`;
	return (
		<StyledPage>
			<SignInWithButton color="#ef4056" href={pocket_authorization_url} icon={Pocket} text="surface" service="Pocket" /*variants="filled"*/ />
		</StyledPage>
	);
}

export default Index;
