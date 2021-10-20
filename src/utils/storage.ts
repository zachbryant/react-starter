export class SimpleStore {
	static get<T = any>(key: string): T {
		return JSON.parse(localStorage.getItem(key) || '{}') as T;
	}

	static getOrDefault<T = any>(key: string, defaultValue: T): T {
		const got = SimpleStore.get<T>(key);
		if (Object.keys(got).length > 0) return got;
		return defaultValue;
	}

	static set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
