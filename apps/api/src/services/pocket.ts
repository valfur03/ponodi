import config from '../config';

export interface TokenResponse {
	code: string,
	redirect_uri: string,
	state: string | null,
};

class PocketService {
	constructor() {

	}

	async getRequestToken(): Promise<TokenResponse> {
		return fetch('https://getpocket.com/v3/oauth/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify({
				consumer_key: config.consumer_key,
				redirect_uri: 'http://localhost:4200',
			}),
		})
			.then((response) => {
				if (!response.ok) throw response.text();
				return response.json();
			})
			.catch(async (error) => {
				throw {
					reason: new Error('An unexpected error occured while generating a new request token for Pocket...'),
					error: await error,
				};
			})
	}
};

export default new PocketService();
