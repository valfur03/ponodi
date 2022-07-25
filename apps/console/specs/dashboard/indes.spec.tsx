import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import Dashboard from 'apps/console/pages/dashboard';

jest.mock('next/router');
import mock_router from 'next/router';

const access_token = faker.datatype.uuid();
const username = faker.internet.userName();

describe('Dashboard', () => {
	describe('if everything is ok', () => {
		beforeEach(() => {
			localStorage.clear();
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('username', username);
			mock_router.replace.mockReset();
		});

		it('should render successfully', () => {
			const { baseElement } = render(<Dashboard />);
			expect(baseElement).toBeTruthy();
		});
	});
	describe('if data are missing', () => {
		beforeEach(() => {
			localStorage.clear();
			mock_router.replace.mockReset();
		});

		it('username: should redirect to Index', () => {
			localStorage.setItem('access_token', access_token);
			render(<Dashboard />);
			expect(mock_router.replace).toHaveBeenCalledWith('/');
		});
		it('access_token: should redirect to Index', () => {
			localStorage.setItem('username', username);
			render(<Dashboard />);
			expect(mock_router.replace).toHaveBeenCalledWith('/');
		});
		it('both: should redirect to Index', () => {
			render(<Dashboard />);
			expect(mock_router.replace).toHaveBeenCalledWith('/');
		});
	});
});
