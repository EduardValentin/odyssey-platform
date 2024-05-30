export async function validateCaptcha(token: string): Promise<boolean> {

	const secretParam = `${encodeURIComponent("secret")}=${encodeURIComponent(import.meta.env.CAPTCHA_SECRET)}`;
	const responseParam = `${encodeURIComponent("response")}=${encodeURIComponent(token)}`;

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
		return false;
	}

	return true;
}
