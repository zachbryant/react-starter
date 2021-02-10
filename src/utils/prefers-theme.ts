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

export function applyThemeToSelector(selector: string, theme: string) {
	const elems = document.querySelectorAll(selector);
	for (const e of elems) {
		e.setAttribute('theme', theme);
	}
}

export function applyPreference(selector: string) {
	if (prefersDark() || !prefersLight()) {
		applyThemeToSelector(selector, 'dark');
	} else {
		applyThemeToSelector(selector, 'light');
	}
}
