import config from '../config';

export interface RequestTokenResponse {
	code: string,
	redirect_uri: string,
	state: string | null,
};

export interface AccessTokenResponse {
	access_token: string,
	username: string,
	state: string | null,
};

class PocketService {
	constructor() {

	}

	async getAccessToken(code: string): Promise<AccessTokenResponse> {
		return fetch('https://getpocket.com/v3/oauth/authorize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify({
				consumer_key: config.consumer_key,
				code,
			}),
		})
			.then((response) => {
				if (!response.ok) throw response.text();
				return response.json();
			})
			.catch(async (error) => {
				throw {
					reason: new Error('An unexpected error occured while generating an access token for Pocket...'),
					error: await error,
				};
			})
	}

	async getRequestToken(): Promise<RequestTokenResponse> {
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
