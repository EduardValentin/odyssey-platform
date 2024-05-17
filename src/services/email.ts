const {
	EMAIL_PROVIDER_CLIENT_ID,
	EMAIL_PROVIDER_SECRET_KEY,
	EMAIL_PROVIDER_URL,
	FROM_EMAIL_ADDR,
	FROM_NAME,
	EMAIL_VERIFICATION_TEMPLATE_ID,
} = import.meta.env;
import { Buffer } from 'node:buffer';


export async function sendEmail(to: string, subject: string, variables: object) {
	const headers = new Headers();

	const encodedString = Buffer.from(
		`${EMAIL_PROVIDER_SECRET_KEY}:${EMAIL_PROVIDER_CLIENT_ID}`)
		.toString('base64');

	headers.append('Authorization', `Basic ${encodedString} `);
	headers.append('content-type', 'application/json');

	const requestBody = JSON.stringify({
		"Messages": [
			{
				"From": {
					"Email": FROM_EMAIL_ADDR,
					"Name": FROM_NAME
				},
				"To": [{
					"Email": to,
				}],
				"Subject": subject,
				"Variables": variables,
				"TemplateID": parseInt(EMAIL_VERIFICATION_TEMPLATE_ID, 10),
				"TemplateLanguage": true,
			},
		],
	});

	return await fetch(EMAIL_PROVIDER_URL, {
		method: 'POST',
		headers,
		body: requestBody
	})
		.then(res => res.json())
		.catch(console.error);
}
