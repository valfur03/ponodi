import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import Callback from 'apps/console/pages/callback';

jest.mock('next/router');
import mock_router from 'next/router';

jest.mock('@ponodi/shared/auth');
import mock_auth_service from '@ponodi/shared/auth';

const request_token = faker.datatype.uuid();
const access_token = faker.datatype.uuid();
const mock_error = new Error(faker.hacker.phrase());
const username = faker.internet.userName();

global.console.error = jest.fn();

describe('Callback', () => {
	describe('if the request token is defined', () => {
		beforeEach(() => {
			localStorage.clear();
			localStorage.setItem('request_token', request_token);
			mock_router.replace.mockReset();
			mock_auth_service.fetchAccessToken.mockReset();
		});

		it('should fetch an access token', () => {
			mock_auth_service.fetchAccessToken.mockRejectedValue(mock_error);
			render(<Callback />);
			expect(mock_auth_service.fetchAccessToken).toHaveBeenCalledWith(request_token);
		});
		describe('when everything is ok', () => {
			beforeEach(() => {
				localStorage.clear();
				localStorage.setItem('request_token', request_token);
				mock_router.replace.mockReset();
				mock_auth_service.fetchAccessToken.mockReset();
				mock_auth_service.username = username;
			});

			it('should remove the request token from the local storage', () => {
				mock_auth_service.fetchAccessToken.mockResolvedValue(access_token);
				render(<Callback />);
				expect(localStorage.getItem('request_token')).toBeNull();
			});
			it('should set local storage', async () => {
				mock_auth_service.fetchAccessToken.mockResolvedValue(access_token);
				render(<Callback />);
				await waitFor(() => expect(mock_router.replace).toHaveBeenCalledWith('/dashboard'));
				expect(localStorage.getItem('access_token')).toBe(access_token);
				expect(localStorage.getItem('username')).toBe(username);
			});
			it('should redirect to Dashboard', async () => {
				mock_auth_service.fetchAccessToken.mockResolvedValue(access_token);
				render(<Callback />);
				await waitFor(() => expect(mock_router.replace).toHaveBeenCalledWith('/dashboard'));
				expect(mock_router.replace).toHaveBeenCalledWith('/dashboard');
			});
		});
		describe('when the access token could not be retrieved', () => {
			beforeEach(() => {
				localStorage.clear();
				localStorage.setItem('request_token', request_token);
				mock_router.replace.mockReset();
				mock_auth_service.fetchAccessToken.mockReset();
			});

			it('should redirect to Index', async () => {
				mock_auth_service.fetchAccessToken.mockRejectedValue(mock_error);
				render(<Callback />);
				await waitFor(() => expect(mock_router.replace).toHaveBeenCalledWith('/'));
				expect(mock_router.replace).toHaveBeenCalledWith('/');
			});
			it('should remove the request token from the local storage', () => {
				mock_auth_service.fetchAccessToken.mockRejectedValue(mock_error);
				render(<Callback />);
				expect(localStorage.getItem('request_token')).toBeNull();
			});
		});
	});
	describe('if the request token is not defined', () => {
		beforeEach(() => {
			localStorage.clear();
			mock_router.replace.mockReset();
		})

		it('should redirect to Index', () => {
			render(<Callback />);
			expect(mock_router.replace).toHaveBeenCalledWith('/');
		});
	});
});
