import { derived, writable } from 'svelte/store';
import en from './en';
import zh from './zh';

export type Lang = 'en' | 'zh';

const translations = { en, zh } as const;

function createLangStore() {
	const stored = typeof localStorage !== 'undefined' ? (localStorage.getItem('lang') as Lang) : null;
	const { subscribe, set } = writable<Lang>(stored || 'en');

	return {
		subscribe,
		set: (lang: Lang) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('lang', lang);
			}
			set(lang);
		}
	};
}

export const lang = createLangStore();

export const t = derived(lang, ($lang) => translations[$lang]);
