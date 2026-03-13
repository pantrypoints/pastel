import type { PageServerLoad } from './$types';
import { getDb, initDb, getAllRegistrations } from '$lib/db';

export const load: PageServerLoad = async ({ platform, cookies }) => {
	const isLoggedIn = cookies.get('admin_session') === 'authenticated';
	
	if (!isLoggedIn) {
		return { isLoggedIn: false, registrations: [] };
	}

	try {
		const url = platform?.env?.TURSO_DATABASE_URL || '';
		const token = platform?.env?.TURSO_AUTH_TOKEN || '';
		
		if (!url || !token) {
			return { isLoggedIn: true, registrations: [], error: 'Database not configured' };
		}

		const db = getDb(url, token);
		await initDb(db);
		const registrations = await getAllRegistrations(db);
		return { isLoggedIn: true, registrations };
	} catch (err) {
		return { isLoggedIn: true, registrations: [], error: String(err) };
	}
};
