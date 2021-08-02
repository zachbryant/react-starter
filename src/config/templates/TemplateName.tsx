import * as React from 'react';
import styles from './TemplateName.module.scss';


export interface TemplateNameProps {}

export const TemplateName: React.FC = (props: TemplateNameProps) => (
	<div className={''} data-testid="TemplateName">
		TemplateName Component
	</div>
);

export default TemplateName;
