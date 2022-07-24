class AuthService {
	request_token: string | null;

	constructor() {
		this.request_token = null;
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
};

export default new AuthService();
