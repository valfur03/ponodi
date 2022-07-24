import { faker } from '@faker-js/faker';
import { fetchRequestToken } from '@ponodi/shared/auth';

const request_token = faker.datatype.uuid();
const mock_request_token_response = {
	code: request_token,
};
const mock_request_token_error_response = {
	message: faker.hacker.phrase(),
	error: faker.hacker.phrase(),
};

global.fetch = jest.fn();

describe('fetchRequestToken', () => {
	beforeEach(() => {
		fetch.mockReset();
	});

	it('should fetch a request token', async () => {
		fetch.mockImplementation(() =>
				Promise.resolve({
					json: () => Promise.resolve(mock_request_token_response),
					ok: true,
				})
		);
		await fetchRequestToken();
		expect(fetch).toHaveBeenCalledWith(
			'http://localhost:4200/api/pocket/authorize', {
				method: 'POST',
			}
		);
	});
	describe('when everything is ok', () => {
		beforeEach(() => {
			fetch.mockReset();
		});

		it('should return the request token', async () => {
			fetch.mockImplementation(() =>
					Promise.resolve({
						json: () => Promise.resolve(mock_request_token_response),
						ok: true,
					})
			);
			const response = await fetchRequestToken();
			expect(response).toStrictEqual(request_token);
		});
	});
	describe('when a the response is not JSON formatted', () => {
		beforeEach(() => {
			fetch.mockReset();
		});

		it('should return an error', async () => {
			fetch.mockImplementation(() => 
				Promise.resolve({
					json: () => Promise.reject("Hello, world!"),
					ok: true,
				})
			);
			await expect(fetchRequestToken()).rejects.toThrow('An unexpected error occured... Please try again later.');
		});
	});
	describe('when a server side error occured', () => {
		beforeEach(() => {
			fetch.mockReset();
		});

		it('should return an error', async () => {
			fetch.mockImplementation(() =>
					Promise.resolve({
						json: () => Promise.resolve(mock_request_token_error_response),
						ok: false,
					})
			);
			await expect(fetchRequestToken()).rejects.toThrow(mock_request_token_error_response.message);
		});
	});
	describe('when a network error occured', () => {
		beforeEach(() => {
			fetch.mockReset();
		});

		it('should return an error', async () => {
			fetch.mockImplementation(() =>
					Promise.reject(mock_request_token_error_response)
			);
			await expect(fetchRequestToken()).rejects.toThrow(mock_request_token_error_response.message);
		});
	});
});
