import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';

import { Index, getServerSideProps } from '../pages/index';

const request_token = faker.datatype.uuid();
const redirect_uri = faker.internet.url();
const pocket_url = `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`;
const mock_error = {
	message: faker.hacker.phrase(),
};
const mock_request_token_response = {
	code: request_token,
};
const mock_request_token_error_response = {
	message: faker.hacker.phrase(),
	error: faker.hacker.phrase(),
};

jest.mock('../config');
import mockConfig from '../config';
mockConfig.redirect_uri = redirect_uri;

global.fetch = jest.fn();

describe('getServerSideProps', () => {
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
		await getServerSideProps();
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
			const response = await getServerSideProps();
			expect(response).toStrictEqual({ props: { request_token, error: null } });
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
			const response = await getServerSideProps();
			expect(response).toStrictEqual({ props: {
				request_token: null,
				error: { message: 'An unexpected error occured... Please try again later.' },
			} });
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
			const response = await getServerSideProps();
			expect(response).toStrictEqual({ props: {
				request_token: null,
				error: { message: mock_request_token_error_response.message },
			} });
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
			const response = await getServerSideProps();
			expect(response).toStrictEqual({ props: {
				request_token: null,
				error: { message: mock_request_token_error_response.message },
			} });
		});
	});
});

describe('Index', () => {
	describe('when a request token is provided', () => {
		it('should render successfully', () => {
			const { baseElement } = render(<Index request_token={request_token} error={null} />);
			expect(baseElement).toBeTruthy();
		});
		it('should have the request token in the button URL', () => {
			render(<Index request_token={request_token} error={null} />);
			expect(screen.getByTestId('button-component-base')).toHaveAttribute('href', pocket_url);
		});
	});
	describe('when an error occured', () => {
		it('should render successfully', () => {
			const { baseElement } = render(<Index request_token={null} error={mock_error} />);
			expect(baseElement).toBeTruthy();
		});
		it('should display an error message', () => {
			render(<Index request_token={null} error={mock_error} />);
			expect(screen.getByTestId('error-message')).toBeInTheDocument();
		});
	});
});
