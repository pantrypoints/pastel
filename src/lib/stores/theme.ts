import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const getInitial = (): Theme => {
		if (typeof localStorage === 'undefined') return 'light';
		const stored = localStorage.getItem('theme') as Theme;
		if (stored) return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		init: () => {
			const initial = getInitial();
			set(initial);
			applyTheme(initial);
		},
		toggle: () => {
			update((current) => {
				const next: Theme = current === 'light' ? 'dark' : 'light';
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('theme', next);
				}
				applyTheme(next);
				return next;
			});
		},
		set: (theme: Theme) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('theme', theme);
			}
			applyTheme(theme);
			set(theme);
		}
	};
}

function applyTheme(theme: Theme) {
	if (typeof document === 'undefined') return;
	if (theme === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}

export const theme = createThemeStore();
