import { ReactChild, ReactChildren, ReactNode } from 'react';

export interface IChildrenProps {
	children?: ReactChild | ReactChildren | JSX.Element[] | ReactNode;
}
