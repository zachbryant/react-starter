export const Store = {
  get: <T = any>(key: string): T => {
    return JSON.parse(localStorage.getItem(key) || '{}') as T;
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
