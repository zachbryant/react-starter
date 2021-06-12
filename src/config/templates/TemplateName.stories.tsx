/* eslint-disable */
import * as React from 'react';

import { Meta, Story } from '@storybook/react';
import { bind, getStoryMeta } from '@utils/storybook';

import { TemplateName, TemplateNameProps } from './TemplateName';

export default getStoryMeta('Components/TemplateName', TemplateName, {
	backgroundColor: { control: 'color' },
});

const Template: Story<TemplateNameProps> = (args) => <TemplateName {...args} />;

export const TemplateNameVariant = bind(Template, {});
