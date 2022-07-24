import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';

import { Index } from '../pages/index';

const request_token = faker.datatype.uuid();
const redirect_uri = faker.internet.url();
const pocket_url = `https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`;
const mock_error = new Error(faker.hacker.phrase());

jest.mock('../config');
import mockConfig from '../config';
mockConfig.redirect_uri = redirect_uri;

jest.mock('@ponodi/shared/auth');
import { fetchRequestToken as mockFetchRequestToken } from '@ponodi/shared/auth';

describe('Index', () => {
	describe('when a request token is provided', () => {
		beforeEach(() => {
			mockFetchRequestToken.mockReset();
			localStorage.clear();
		});

		it('should render successfully', async () => {
			mockFetchRequestToken.mockResolvedValue(request_token);
			const { baseElement, getByTestId } = render(<Index />);
			await waitFor(() => expect(getByTestId('button-component-base')).toBeInTheDocument());
			expect(baseElement).toBeTruthy();
		});
		it('should have the request token in the button URL', async () => {
			mockFetchRequestToken.mockResolvedValue(request_token);
			const { getByTestId } = render(<Index />);
			await waitFor(() => expect(getByTestId('button-component-base')).toBeInTheDocument());
			expect(getByTestId('button-component-base')).toHaveAttribute('href', pocket_url);
		});
	});
	describe('when an error occured', () => {
		beforeEach(() => {
			mockFetchRequestToken.mockReset();
			localStorage.clear();
		});

		it('should render successfully', async () => {
			mockFetchRequestToken.mockRejectedValue(mock_error);
			const { baseElement, getByTestId } = render(<Index />);
			await waitFor(() => expect(getByTestId('error-message')).toBeInTheDocument());
			expect(baseElement).toBeTruthy();
		});
		it('should display an error message', async () => {
			mockFetchRequestToken.mockRejectedValue(mock_error);
			const { getByTestId } = render(<Index />);
			await waitFor(() => expect(getByTestId('error-message')).toBeInTheDocument());
			expect(getByTestId('error-message')).toBeInTheDocument();
		});
	});
});
