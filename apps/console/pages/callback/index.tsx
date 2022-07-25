import { useEffect } from 'react';
import router from 'next/router';
import authService from '@ponodi/shared/auth';

export function Callback() {
	if (typeof window === 'undefined') return <></>;
	if (localStorage.getItem('request_token') === null) router.replace('/');
	useEffect(() => {
		authService.fetchAccessToken(localStorage.getItem('request_token'))
			.then((token: string) => {
				localStorage.setItem('access_token', token);
				localStorage.setItem('username', authService.username);
				router.replace('/dashboard');
			})
			.catch((error) => {
				console.error(error);
				router.replace('/');
			});
		localStorage.removeItem('request_token');
	}, []);
	return <></>;
}

export default Callback;
