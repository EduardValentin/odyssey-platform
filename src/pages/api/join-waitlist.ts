import fs from 'node:fs/promises';
import * as emailValidator from 'email-validator';

const WAITLIST_SIGNUPS_FILE = './waitlist-signups.txt';

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

	const file = await fs.readFile(WAITLIST_SIGNUPS_FILE, { encoding: 'utf8' });

	const isAlreadySignedUp = file.split('\n').some(e => e === body.email);

	if (isAlreadySignedUp) {
		return new Response(null, { status: 201, headers });
	}

	await fs.appendFile(WAITLIST_SIGNUPS_FILE, body.email + "\n", {
		encoding: 'utf8'
	});

	return new Response(null, { status: 201, headers });

}
