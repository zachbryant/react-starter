/**
 * @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import TemplateName from './TemplateName';

describe('<TemplateName />', () => {
	test('it should mount', () => {
		render(<TemplateName />);

		const templateName = screen.getByTestId('TemplateName');
		expect(templateName).toBeInTheDocument();
	});

	test('it should have no a11y violations', async () => {
		const { container } = render(<TemplateName />);
		expect(await axe(container)).toHaveNoViolations();
	})
});
