import {
	AsyncComponent,
	IAsyncFunctionPropType,
	IAsyncViewsPropType
} from '@fragments/common/Async';
import { WebpackLoadStrategy } from '@models/webpackLoadingStrategy';
import { ImportUtils, PromiseUtils } from "@utils/";
import path from 'path';
import * as React from 'react';

export interface IAsyncCookieConsentProps {
	loadStrategy?: WebpackLoadStrategy;
}

const LoadingComponent = <div>Loading...</div>;
const ErrorComponent = (error: Error) => <div>Error: {error}</div>;

export const CookieConsent = (props: IAsyncCookieConsentProps) => {
	let Component = ImportUtils.importByWebpackLoadStrategy(
		path.resolve( './CookieConsent' ),
		props.loadStrategy
	);

	const asyncViews: IAsyncViewsPropType = {
		component: Component,
		errorComponent: ErrorComponent,
		loadingComponent: LoadingComponent,
	};
	const asyncFunction: IAsyncFunctionPropType = {
		loadingFunction: Promise.resolve().then(PromiseUtils.sleeper(10 * 1000))
	};
	return <AsyncComponent views={asyncViews} function={asyncFunction} />;
};
