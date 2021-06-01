import * as React from 'react';

import { ArgTypes, Meta, Story } from '@storybook/react/types-6-0';

export function getStoryMeta(
	title: string,
	component: React.ComponentType<any>,
	argTypes?: ArgTypes,
	decorators?: Array<any>
): Meta {
	return {
		title,
		component,
		argTypes,
		decorators,
	};
}

export function bind<T = any>(template: Story<T>, args: Partial<T> | undefined): Story<T> {
	const story = template.bind({});
	story.args = { ...args };
	return story;
}
