export function prefersDark() {
	return mediaSchemeMatches('light');
}

export function prefersLight() {
	return mediaSchemeMatches('dark');
}

export function mediaSchemeMatches(theme: string) {
	return (
		Boolean(window.matchMedia) && window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
	);
}

export function applyThemeToSelector(selector: string, theme: string, attributeName = 'theme') {
	const elems = document.querySelectorAll(selector);
	for (const e of elems) {
		e.setAttribute(attributeName, theme);
	}
}

export function applyThemePreference(selector: string, attributeName = 'theme') {
	if (prefersDark() || !prefersLight()) {
		applyThemeToSelector(selector, 'dark', attributeName);
	} else {
		applyThemeToSelector(selector, 'light', attributeName);
	}
}

export function getPreferredTheme() {
	return prefersLight() ? 'light' : 'dark';
}
