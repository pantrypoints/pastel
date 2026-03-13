import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
	const { password } = await request.json();

	const adminPassword = platform?.env?.ADMIN_PASSWORD || 'admin123';

	if (password === adminPassword) {
		cookies.set('admin_session', 'authenticated', {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 8 // 8 hours
		});
		return json({ success: true });
	}

	return json({ success: false, error: 'Invalid password' }, { status: 401 });
};
