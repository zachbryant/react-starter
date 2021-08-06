/**
 * @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import CookieConsent from './CookieConsent';

describe('<CookieConsent />', () => {
	test('it should mount', () => {
		render(<CookieConsent />);

		const cookieConsent = screen.getByTestId('CookieConsent');
		expect(cookieConsent).toBeInTheDocument();
	});

	test('it should have no a11y violations', async () => {
		const { container } = render(<CookieConsent />);
		expect(await axe(container)).toHaveNoViolations();
	})
});
