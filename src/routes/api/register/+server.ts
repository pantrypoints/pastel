import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb, initDb, createRegistration } from '$lib/db';

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const body = await request.json();
		const { name, email, organization, country, interest } = body;

		if (!name || !email || !country) {
			return json({ success: false, error: 'Missing required fields' }, { status: 400 });
		}

		const url = platform?.env?.TURSO_DATABASE_URL;
		const token = platform?.env?.TURSO_AUTH_TOKEN;

		if (!url || !token) {
			// Dev mode: just return success without DB
			console.log('Dev mode: registration submitted', { name, email, organization, country, interest });
			return json({ success: true, dev: true });
		}

		const db = getDb(url, token);
		await initDb(db);
		const result = await createRegistration(db, { name, email, organization, country, interest });
		return json(result);
	} catch (err) {
		console.error('Registration error:', err);
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
};
