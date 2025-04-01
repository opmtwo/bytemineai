const safelyParseJSON = (json) => {
	let parsed;
	try {
		parsed = JSON.parse(json);
	} catch (err) {
		//console.log('safelyParseJSON - error', err);
	}
	//console.log('safelyParseJSON - result - ', parsed);
	return parsed;
};

const getResponse = (body, statusCode = 200, headers = {}) => {
	const response = {
		statusCode,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
			...headers,
		},
		body: JSON.stringify(body),
	};
	return response;
};

module.exports = {
	safelyParseJSON,
    getResponse,
};
