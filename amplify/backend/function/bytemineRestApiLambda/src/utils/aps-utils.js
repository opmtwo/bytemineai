const { Sha256 } = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { SignatureV4 } = require('@aws-sdk/signature-v4');

const { getNestedKey } = require('./helper-utils');

const { API_BYTEMINEAIGRAPHAPI_GRAPHQLAPIENDPOINTOUTPUT: GRAPHQL_ENDPOINT, REGION } = process.env;

const apsGql = async (query, variables = {}, key = undefined, verbose = true) => {
	if (verbose) {
		console.info('apsGql - input', { variables, key });
	}

	// AppSync API endpoint
	const endpoint = new URL(GRAPHQL_ENDPOINT);

	// AWS sig v4
	const signer = new SignatureV4({
		credentials: defaultProvider(),
		region: REGION,
		service: 'appsync',
		sha256: Sha256,
	});

	// request options
	const requestToBeSigned = new HttpRequest({
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			host: endpoint.hostname,
		},
		protocol: 'https:',
		hostname: endpoint.hostname,
		body: JSON.stringify({ query, variables, disableOffline: true }),
		path: endpoint.pathname,
	});

	const signed = await signer.sign(requestToBeSigned);
	const request = fetch(GRAPHQL_ENDPOINT, signed);

	try {
		const response = await await request;
		const json = await response.json();

		// error?
		if (response.status !== 200) {
			if (verbose) {
				console.error('😱 - apsGql - error', JSON.stringify(json, null, 2));
			}
			throw json;
		}

		if (json.errors) {
			if (verbose) {
				console.error('😱 - apsGql - error', JSON.stringify(json, null, 2));
			}
			throw json.errors;
		}

		// log
		if (verbose) {
			console.info('apsGql - json', JSON.stringify(json, null, 2));
		}

		// return result key
		if (key) {
			return getNestedKey(json, key);
		}

		// return raw result
		return json;
	} catch (err) {
		if (verbose) {
			console.error('😱 - apsGql - error', JSON.stringify(err, null, 2));
		}
		throw err;
	}
};

module.exports = {
	apsGql,
};
