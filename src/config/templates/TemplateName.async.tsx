import {
	AsyncComponent,
	IAsyncFunctionAndArgsType,
	IAsyncViewsPropType,
} from '@fragments/common/Async';
import { TemplateName } from './TemplateName';
import { PromiseUtils } from '@utils/';
import { ITemplateNameProps } from './TemplateName';
import * as React from 'react';

export interface IAsyncTemplateNameProps {
	TemplateNameProps: ITemplateNameProps;
	functionAndArgs?: IAsyncFunctionAndArgsType;
}

const LoadingComponent = <div>Loading...</div>;
const ErrorComponent = (error: Error) => <div>{error.stack}</div>;

export const AsyncTemplateName = (props: IAsyncTemplateNameProps) => {
	const Component = React.useCallback(
		(someData: any) => <TemplateName {...props.TemplateNameProps}>{someData}</TemplateName>,
		[props.TemplateNameProps]
	);

	const asyncViews: IAsyncViewsPropType = {
		component: Component,
		errorComponent: ErrorComponent,
		loadingComponent: LoadingComponent,
	};
	const asyncFunction: IAsyncFunctionAndArgsType = {
		promiseFunction: async () =>
			Promise.resolve()
				.then(PromiseUtils.sleeper(3 * 1000))
				.then(() => 'example data'),
	};
	return (
		<AsyncComponent views={asyncViews} functionAndArgs={props.functionAndArgs ?? asyncFunction} />
	);
};
