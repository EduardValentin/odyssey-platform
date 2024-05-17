import { db, eq, WaitlistToken } from "astro:db";
import jwt from "jsonwebtoken";

const { WAITLIST_JWT_SECRET } = import.meta.env;

export async function verifyToken(token: string): Promise<boolean> {

	const dbResult = await db.select().from(WaitlistToken).where(
		eq(WaitlistToken.token, token)
	);

	if (dbResult.length === 0) {
		console.warn('[Waitlist] token not found');
		return false;
	}

	const dbToken = dbResult[0];

	if (!dbToken.valid) {
		console.debug('[Waitlist] a token that was already used was supplied');
		return false;
	}

	try {
		jwt.verify(token, WAITLIST_JWT_SECRET);
		return true;
	} catch (e) {
		console.warn('[Waitlist] an invalid token was supplied');
		return false;
	}
}

export function invalidateToken(token: string) {

	return db.update(WaitlistToken)
		.set({ valid: false })
		.where(eq(WaitlistToken.token, token));
}

export async function createToken(claims: Record<string, string>): Promise<string> {

	const token = jwt.sign(claims, WAITLIST_JWT_SECRET, {
		expiresIn: '1h',
	});

	await db.insert(WaitlistToken).values({ token, valid: true });

	return token;
}
