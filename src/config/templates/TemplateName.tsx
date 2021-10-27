import * as React from 'react';
import styles from './TemplateName.module.scss';

export interface ITemplateNameProps {}

export function TemplateName(props: ITemplateNameProps) {
	return (
		<div className={''} data-testid="TemplateName">
			TemplateName Component
		</div>
	);
}

export default TemplateName;
