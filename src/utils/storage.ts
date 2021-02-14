export class Store {
	static get<T = any>(key: string): T {
		return JSON.parse(localStorage.getItem(key) || '{}') as T;
	}

	static getOrDefault<T = any>(key: string, defaultValue: T): T {
		return Store.get<T>(key) || defaultValue;
	}

	static set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
