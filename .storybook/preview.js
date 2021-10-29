import '@storybook/addon-console';
import '@styles/index.scss';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	resolve: {
		fullySpecified: false,
	},
};
