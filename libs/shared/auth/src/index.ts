class AuthService {
	request_token: string | null;
	access_token: string | null;
	username: string | null;

	constructor() {
		this.request_token = null;
		this.access_token = null;
		this.username = null;
	}

	async fetchRequestToken() {
		try {
			const response = await fetch('http://localhost:4200/api/pocket/request', {
				method: 'POST'
			});
			const data = await response.json()
				.then((json) => json)
				.catch(() => { throw null });
			if (!response.ok) throw data;
			this.request_token = data.code;
			return data.code;
		} catch (error: any) {
			throw new Error(error?.message || 'An unexpected error occured... Please try again later.');
		}
	}

	async fetchAccessToken(request_token: string) {
		if (request_token === null) throw new Error('The request token must be defined');
		try {
			const response = await fetch('http://localhost:4200/api/pocket/authorize', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					code: request_token,
				}),
			});
			const data = await response.json()
				.then((json) => json)
				.catch(() => { throw null });
			if (!response.ok) throw data;
			this.access_token = data.access_token;
			this.username = data.username;
			this.request_token = null;
			return data.access_token;
		} catch (error: any) {
			throw new Error(error?.message || 'An unexpected error occured... Please try again later.');
		}
	}
};

export default new AuthService();
