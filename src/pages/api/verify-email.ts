import type { APIRoute } from "astro";
import * as emailValidator from 'email-validator';
import { createToken, invalidateToken } from "../../repositories/waitlist-token-reposotory";
import { sendEmail } from "../../services/email-service";

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();

	const headers = new Headers();
	headers.set('content-type', 'application/json');

	if (!body.email) {
		return new Response(JSON.stringify({
			message: 'Email is a required parameter',
			code: 'email_missing',
		}), {
			status: 404,
			headers
		});
	}

	if (!emailValidator.validate(body.email)) {
		return new Response(JSON.stringify({
			message: 'Email is invalid',
			code: 'invalid_email',
		}), {
			status: 404,
			headers
		});
	}

	const token = await createToken({
		email: body.email,
	});

	try {
		const emailResp = await sendEmail(body.email, 'Please verify your email', {
			token: body.token,
			email: body.email,
		});

		if (emailResp?.["Messages"]?.[0]?.["Status"] === "success") {
			return new Response(JSON.stringify({ status: 'success' }),
				{ status: 200, headers });
		} else {
			await invalidateToken(token);
			return new Response(JSON.stringify({ status: 'failed' }),
				{ status: 500, headers });
		}
	} catch {
		await invalidateToken(token);
		return new Response(JSON.stringify({ status: 'failed' }),
			{ status: 500, headers });
	}
}
