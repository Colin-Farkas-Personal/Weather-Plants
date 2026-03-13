import { sql } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	await sql`
		CREATE TABLE IF NOT EXISTS likes (
			id INTEGER PRIMARY KEY DEFAULT 1,
			"count" INTEGER NOT NULL DEFAULT 0
		)
	`;

	await sql`INSERT INTO likes (id, "count") VALUES (1, 0) ON CONFLICT (id) DO NOTHING`;

	const result = await sql`SELECT "count" FROM likes WHERE id = 1`;

	return json({ likes: result[0]?.count ?? 0 });
}

export async function POST() {
	await sql`
		CREATE TABLE IF NOT EXISTS likes (
			id INTEGER PRIMARY KEY DEFAULT 1,
			"count" INTEGER NOT NULL DEFAULT 0
		)
	`;

	await sql`INSERT INTO likes (id, "count") VALUES (1, 0) ON CONFLICT (id) DO NOTHING`;

	const result = await sql`UPDATE likes SET "count" = "count" + 1 WHERE id = 1 RETURNING "count"`;

	return json({ likes: result[0]?.count ?? 0 });
}
