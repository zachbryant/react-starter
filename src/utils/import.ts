import { lazy } from 'react';

import { WebpackLoadStrategy } from '@models/webpackLoadingStrategy';

export function importByWebpackLoadStrategy(path: string, strategy?: WebpackLoadStrategy) {
	switch (strategy) {
		case WebpackLoadStrategy.Fetch:
			return lazy(() => import(/* webpackPrefetch: true */ path));
		case WebpackLoadStrategy.Load:
			return lazy(() => import(/* webpackPreload: true */ path));
		case WebpackLoadStrategy.None:
		default:
			return lazy(() => import(path));
	}
}
