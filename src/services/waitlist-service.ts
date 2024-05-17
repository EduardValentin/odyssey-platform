import { db } from "astro:db";
import { invalidateToken } from "../repositories/waitlist-token-reposotory";
import { createWaitingUser } from "../repositories/waiting-user-repository";

export function addWaitingUser(token: string, email: string) {
	return db.batch([
		invalidateToken(token),
		createWaitingUser(email)
	]);

}

