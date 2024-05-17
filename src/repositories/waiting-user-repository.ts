import { WaitingUser, db, eq } from "astro:db";

export function createWaitingUser(email: string) {
	return db.insert(WaitingUser).values({
		email,
	});
}

export async function isAlreadyJoined(email: string): Promise<boolean> {
	const dbResult = await db.select().from(WaitingUser)
		.where(eq(WaitingUser.email, email));

	return dbResult.length > 0;
}
