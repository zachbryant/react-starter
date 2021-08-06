import * as React from 'react';
import styles from './CookieConsent.module.scss';

export interface CookieConsentProps {}

export const CookieConsent: React.FC<CookieConsentProps> = (props) => (
	<div className={''} data-testid="CookieConsent">
		CookieConsent Component
	</div>
);

export default CookieConsent;
