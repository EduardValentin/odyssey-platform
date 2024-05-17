import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();

	const headers = new Headers();
	headers.set('content-type', 'application/json');


	if (!body.token) {
		return new Response(JSON.stringify({
			message: "Captcha token is missing",
			code: "captcha_token_missing"
		}), {
			status: 404,
			headers
		})
	}

	const secretParam = `${encodeURIComponent("secret")}=${encodeURIComponent(import.meta.env.CAPTCHA_SECRET)}`;
	const responseParam = `${encodeURIComponent("response")}=${encodeURIComponent(body.token)}`;

	const formBody = `${secretParam}&${responseParam}`;

	const resp = await fetch(import.meta.env.CAPTCHA_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: formBody,
	})
		.then(r => r.json());

	if (resp["error-codes"]) {
		console.error("Error while validating Google reCaptcha V3. Error:"
			, resp["error-codes"]);
	}

	return new Response(JSON.stringify({
		success: resp.success,
	}), {
		status: 200,
		headers,
	});
}
