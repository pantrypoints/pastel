import { createClient, type Client } from '@libsql/client/web';

export interface Registration {
	id: string;
	name: string;
	email: string;
	organization: string | null;
	country: string;
	interest: string;
	created_at: string;
}

export function getDb(url: string, authToken: string): Client {
	return createClient({ url, authToken });
}

export async function initDb(db: Client) {
	await db.execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      organization TEXT,
      country TEXT NOT NULL,
      interest TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
}

export async function createRegistration(
	db: Client,
	data: Omit<Registration, 'id' | 'created_at'>
): Promise<{ success: boolean; duplicate?: boolean; error?: string }> {
	try {
		const id = crypto.randomUUID();
		await db.execute({
			sql: `INSERT INTO registrations (id, name, email, organization, country, interest)
            VALUES (?, ?, ?, ?, ?, ?)`,
			args: [id, data.name, data.email, data.organization ?? null, data.country, data.interest]
		});
		return { success: true };
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		if (msg.includes('UNIQUE') || msg.includes('unique')) {
			return { success: false, duplicate: true };
		}
		return { success: false, error: msg };
	}
}

export async function getAllRegistrations(db: Client): Promise<Registration[]> {
	const result = await db.execute(
		'SELECT * FROM registrations ORDER BY created_at DESC'
	);
	return result.rows.map((row) => ({
		id: String(row.id),
		name: String(row.name),
		email: String(row.email),
		organization: row.organization ? String(row.organization) : null,
		country: String(row.country),
		interest: String(row.interest),
		created_at: String(row.created_at)
	}));
}

export const countries = [
	'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh',
	'Belgium', 'Bolivia', 'Brazil', 'Cambodia', 'Canada', 'Chile', 'China', 'Colombia',
	'Costa Rica', 'Croatia', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Ethiopia',
	'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Honduras', 'Hungary',
	'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan',
	'Kenya', 'Laos', 'Lebanon', 'Malaysia', 'Mexico', 'Morocco', 'Myanmar', 'Nepal',
	'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria', 'Norway', 'Pakistan', 'Panama',
	'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Romania',
	'Saudi Arabia', 'Senegal', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
	'Sudan', 'Sweden', 'Switzerland', 'Taiwan', 'Tanzania', 'Thailand', 'Turkey', 'Uganda',
	'Ukraine', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam',
	'Zambia', 'Zimbabwe'
];
