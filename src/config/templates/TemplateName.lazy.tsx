import path from 'path';
import * as React from 'react';

import {
	AsyncComponent,
	IAsyncFunctionPropType,
	IAsyncViewsPropType,
} from '@/ui/fragments/common/Async';
import { WebpackLoadStrategy } from '@models/webpackLoadingStrategy';
import { importByWebpackLoadStrategy } from '@utils/import';

export interface IAsyncTemplateNameProps {
	loadStrategy?: WebpackLoadStrategy;
}

const LoadingComponent = <div>Loading...</div>;
const ErrorComponent = (error: Error) => <div>Error: {error}</div>;

export const TemplateName = (props: IAsyncTemplateNameProps) => {
	let Component = importByWebpackLoadStrategy(path.resolve('./TemplateName'), props.loadStrategy);
	const asyncViews: IAsyncViewsPropType = {
		component: Component,
		errorComponent: ErrorComponent,
		placeholderComponent: LoadingComponent,
	};
	const asyncFunction: IAsyncFunctionPropType = {
		loadingFunction:
	};
	return <AsyncComponent views={asyncViews} function={asyncFunction} />;
};
