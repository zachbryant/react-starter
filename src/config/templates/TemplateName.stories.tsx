/* eslint-disable */
import { Story } from '@storybook/react';
import { StorybookUtils } from '@utils/';
import * as React from 'react';
import { TemplateName, TemplateNameProps } from './TemplateName';


export default StorybookUtils.getStoryMeta('Components/TemplateName', TemplateName, {
	backgroundColor: { control: 'color' },
});

const Template: Story<TemplateNameProps> = (args) => <TemplateName {...args} />;

export const TemplateNameVariant = StorybookUtils.bind(Template, {});
