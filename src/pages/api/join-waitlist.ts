import * as emailValidator from 'email-validator';
import type { APIRoute } from 'astro';
import { verifyToken } from '../../repositories/waitlist-token-reposotory';
import { isAlreadyJoined } from '../../repositories/waiting-user-repository';
import { addWaitingUser } from '../../services/waitlist-service';
import { JoinWaitlistResponseCodes } from '../../constants/waitlist-constants';

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();

	const headers = new Headers();
	headers.set('content-type', 'application/json');

	if (!body.email || !body.token) {
		return new Response(JSON.stringify({
			message: 'Missing required parameters: email, token',
			code: JoinWaitlistResponseCodes.ParamsMissing,
		}), {
			status: 404,
			headers,
		});
	}

	if (!emailValidator.validate(body.email)) {
		return new Response(JSON.stringify({
			message: 'Email is invalid',
			code: JoinWaitlistResponseCodes.InvalidEmail,
		}), {
			status: 404,
			headers,
		});
	}

	if (!await verifyToken(body.token)) {
		return new Response(JSON.stringify({
			message: 'The token is invalid',
			code: JoinWaitlistResponseCodes.InvalidToken,
		}), {
			status: 401,
			headers,
		});
	}

	if (await isAlreadyJoined(body.email)) {
		console.warn('[Waitlist] the email is already on the waitlist');
		return new Response(JSON.stringify({ code: JoinWaitlistResponseCodes.Ok }),
			{ status: 200, headers, });
	}

	await addWaitingUser(body.token, body.email)

	return new Response(JSON.stringify({ code: JoinWaitlistResponseCodes.Ok }),
		{ status: 200, headers, });
}
