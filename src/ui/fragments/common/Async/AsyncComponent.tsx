import React from 'react';
import {
	Async,
	FulfilledChildren,
	PendingChildren,
	PromiseFn,
	RejectedChildren,
} from 'react-async';

export interface IAsyncFunctionPropType<ParametersType = unknown> {
	loadingFunction: PromiseFn<ParametersType>;
	args: Record<string, ParametersType>;
}

export interface IAsyncViewsPropType<
	DataType = unknown,
	PendingType = unknown,
	ErrorType = unknown
> {
	component: FulfilledChildren<DataType>;
	loadingComponent?: PendingChildren<PendingType>;
	errorComponent?: RejectedChildren<ErrorType>;
}

export interface IAsyncComponentProps {
	views: IAsyncViewsPropType;
	function: IAsyncFunctionPropType;
}

export function AsyncComponent(props: IAsyncComponentProps) {
	const { component, loadingComponent: placeholderComponent, errorComponent } = props.views;
	const { loadingFunction, args } = props.function;
	return (
		<Async promiseFn={loadingFunction} {...args}>
			<Async.Pending>{placeholderComponent}</Async.Pending>
			<Async.Rejected>{errorComponent}</Async.Rejected>
			<Async.Fulfilled>{component}</Async.Fulfilled>
		</Async>
	);
}
