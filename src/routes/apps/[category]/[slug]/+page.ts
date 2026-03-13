import { error } from '@sveltejs/kit';
import { getApp } from '$lib/data/apps';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const app = getApp(params.category, params.slug);
	if (!app) throw error(404, 'App not found');
	return { app };
};
