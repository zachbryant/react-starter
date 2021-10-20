import * as React from 'react';
import styles from './TemplateName.module.scss';

export interface ITemplateNameProps {}

export const TemplateName: React.FC<ITemplateNameProps> = (props) => (
	<div className={''} data-testid="TemplateName">
		TemplateName Component
	</div>
);

export default TemplateName;
