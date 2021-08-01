import { atom } from 'recoil';
import { Keys } from '@constants';

export const themeState = atom({
	key: Keys.themeStateKey,
	default: {
		isDark: false,
		colorScheme: undefined,
	},
});
