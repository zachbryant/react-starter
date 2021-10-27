import userEvent from '@testing-library/user-event';
import { TemplateName, ITemplateNameProps } from './TemplateName';

export default {
	component: TemplateName,
	title: 'Pages/TemplateName',
	// Learn about controls https://storybook.js.org/docs/react/essentials/controls
	argTypes: {
		variant: {
			options: ['primary', 'secondary'],
			defaultValue: 'primary',
			control: { type: 'radio' },
		},
	},
};

const defaultArgs: ITemplateNameProps = {
	/**/
};

export const Default = {
	args: defaultArgs,
	render: undefined,
	play: () => {
		/**Do userEvent stuff */
	},
};
