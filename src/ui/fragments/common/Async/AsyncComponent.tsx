import React from 'react';
import {
	Async,
	FulfilledChildren,
	PendingChildren,
	PromiseFn,
	RejectedChildren,
} from 'react-async';

export interface IAsyncFunctionAndArgsType<ParametersType = any> {
	promiseFunction: PromiseFn<ParametersType>;
	args: Record<string, ParametersType>;
}

export interface IAsyncViewsPropType<DataType = any, PendingType = any, ErrorType = any> {
	component: FulfilledChildren<DataType>;
	loadingComponent?: PendingChildren<PendingType>;
	errorComponent?: RejectedChildren<ErrorType>;
}

export interface IAsyncComponentProps {
	views: IAsyncViewsPropType;
	functionAndArgs: IAsyncFunctionAndArgsType;
}

export function AsyncComponent(props: IAsyncComponentProps) {
	const { component, loadingComponent: placeholderComponent, errorComponent } = props.views;
	const { promiseFunction, args } = props.functionAndArgs;
	return (
		<Async promiseFn={promiseFunction} {...args}>
			<Async.Pending>{placeholderComponent}</Async.Pending>
			<Async.Rejected>{errorComponent}</Async.Rejected>
			<Async.Fulfilled>{component}</Async.Fulfilled>
		</Async>
	);
}
