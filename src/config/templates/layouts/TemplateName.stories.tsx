import userEvent from '@testing-library/user-event';
import { TemplateName, ITemplateNameProps } from './TemplateName';

export default {
	component: TemplateName,
	title: 'Layouts/TemplateName',
	// Learn about controls https://storybook.js.org/docs/react/essentials/controls
	argTypes: {
		variant: {
			options: ['primary', 'secondary'],
			control: { type: 'radio' },
		},
	},
};
export const Default = {
	args: {},
	render: undefined,
	play: () => {
		/**Do userEvent stuff */
	},
};
