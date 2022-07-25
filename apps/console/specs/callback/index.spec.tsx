import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import Callback from 'apps/console/pages/callback';

jest.mock('next/router');
import router from 'next/router';

jest.mock('@ponodi/shared/auth');
import mockAuthService from '@ponodi/shared/auth';

const request_token = faker.datatype.uuid();

describe('Callback', () => {
	describe('if the request token is defined', () => {
		beforeEach(() => {
			localStorage.clear();
			localStorage.setItem('request_token', request_token);
			router.replace.mockReset();
			mockAuthService.fetchAccessToken.mockReset();
		})

		it('should fetch an access token', () => {
			render(<Callback />);
			expect(mockAuthService.fetchAccessToken).toHaveBeenCalled();
		});
	});
	describe('if the request token is not defined', () => {
		beforeEach(() => {
			localStorage.clear();
			router.replace.mockReset();
		})

		it('should redirect to Index', () => {
			render(<Callback />);
			expect(router.replace).toHaveBeenCalledWith('/');
		});
	});
});
