/**
 * Safely decodes a JSON string with an optional default value and verbose mode support.
 *
 * @param jsonStr - The JSON string to decode.
 * @param defaultValue - (Optional) The default value to return if decoding fails.
 * @param verbose - (Optional) Whether to log verbose information in the console.
 * @returns The decoded JSON object or the default value if decoding fails.
 */
const safeJsonDecode = (jsonStr, defaultValue, verbose = false) => {
	try {
		const decoded = JSON.parse(jsonStr);
		if (verbose) {
			console.log('safeJsonDecode - success', decoded);
		}
		return decoded;
	} catch (err) {
		if (verbose) {
			console.error('safeJsonDecode - error:', err);
		}
		return defaultValue;
	}
};

/**
 * @summary Safely parses a JSON string without throwing an error.
 *
 * @description
 * This function attempts to parse a JSON string and returns the parsed object.
 * If parsing fails due to invalid JSON, it catches the error and returns `undefined` instead of throwing an exception.
 *
 * @param {string} json The JSON string to parse
 * @returns {Object|undefined} The parsed object if successful, otherwise `undefined`
 */
const safelyParseJSON = (json, verbose = false) => {
	let parsed;

	try {
		parsed = JSON.parse(json); // Attempt to parse the JSON string
	} catch (err) {
		if (verbose) {
			console.log('safelyParseJSON - error', err); // Catch and suppress JSON parsing errors
		}
	}

	if (verbose) {
		console.log('safelyParseJSON - result - ', parsed);
	}
	return parsed; // Return the parsed object or undefined if parsing failed
};

/**
 * @summary Creates a standardized HTTP response object.
 *
 * @description
 * This function generates a response object with a given body, status code, and headers.
 * It ensures that CORS headers are included by default to allow cross-origin requests.
 * The body is automatically converted to a JSON string.
 *
 * @param {*} body The response body (can be an object, array, string, or other data types)
 * @param {number} [statusCode=200] The HTTP status code (default is 200)
 * @param {Object} [headers={}] Additional headers to include in the response
 * @returns {Object} The formatted HTTP response object
 */
const getResponse = (body, statusCode = 200, headers = {}) => {
	// Construct the response object
	const response = {
		statusCode, // HTTP status code
		headers: {
			'Access-Control-Allow-Origin': '*', // Allow requests from any origin (CORS)
			'Access-Control-Allow-Headers': '*', // Allow all headers (CORS)
			...headers, // Merge additional headers provided by the caller
		},
		body: JSON.stringify(body), // Convert body to JSON string
	};

	return response; // Return the constructed response object
};

/**
 * @summary Creates a standardized HTTP error response.
 *
 * @description
 * This function generates an error response based on the provided error object.
 * It extracts meaningful error messages and status codes from the error response if available.
 * If no specific error details are found, it falls back to a generic error message and a default status code (400).
 *
 * @param {Object} err The error object containing details about the error
 * @returns {Promise<Object>} A promise resolving to the formatted error response object
 */
const getErrorResponse = async (err) =>
	getResponse(
		{
			// Extract the most specific error message available, falling back to a generic error message
			message:
				err?.response?.data?.message || // API-specific error message
				err?.response?.statusText || // HTTP status text (e.g., "Bad Request")
				err?.message || // General error message
				genericErrorMessage, // Fallback generic error message
		},
		// Determine the most appropriate HTTP status code, defaulting to 400 if not available
		err?.response?.status || // API response status code
			err?.status || // Custom error status code
			400 // Default to 400 Bad Request
	);

/**
 * @summary Retrieves a nested property value from an object using a dot-separated key path.
 *
 * @description
 * This function takes an object and a string representing a nested key path (e.g., `"user.profile.name"`)
 * and returns the corresponding value from the object. If any part of the key path is missing, it returns `undefined`.
 *
 * @param {Object} data The object to retrieve the nested property from
 * @param {string} keyPath The dot-separated key path (e.g., "user.profile.name")
 * @returns {*} The value at the specified key path, or `undefined` if any key in the path is missing
 */
const getNestedKey = (data, keyPath) => {
	// Split the key path into an array of keys
	const keys = keyPath.split('.');

	// Traverse the object using the keys
	for (const key of keys) {
		try {
			data = data[key]; // Access the next level in the object hierarchy
		} catch (err) {
			return undefined; // Return undefined if any error occurs during access
		}

		// If a key is missing (undefined or null), return undefined early
		if (data === undefined || data === null) {
			return undefined;
		}
	}

	return data; // Return the final value
};

const createEnrichment = async (body) => {
	console.log('createEnrichment - input ', body);
	try {
		const now = new Date().toISOString();
		const params = {
			id: v4(),
			s3Key: body.key,
			s3KeyOutput: `${body.key}.output.csv`,
			userId: body.userId,
			groupId: body.groupId,
			tenants: [body.groupId],
			name: body.name,
			size: body.size,
			recordsUploaded: body.records,
			recordsEnriched: 0,
			recordsProcessed: 0,
			keyEmail: body.email,
			keyPhone: body.phone,
			keyLinkedin: body.linkedin,
			keyFacebook: body.facebook,
			phoneRequired: body.phoneRequired,
			workEmailRequired: body.workEmailRequired,
			status: 'pending',
			isCompleted: false,
			createdAt: now,
			updatedAt: now,
		};
		const response = await ddbPutItem(ENRICHMENTTABLE_NAME, ddbEncode(params));
		console.log('createEnrichment - success ', response);
		return params;
	} catch (err) {
		console.log('createEnrichment - error -', err);
		throw err;
	}
};

const getErrorMsg = (err) =>
	err?.errorMessage || err?.reason?.errorMessage || err?.reason?.raw?.message || err?.response?.data?.message || err?.response?.statusText || err?.message;

const getErrorCode = (err) => err?.statusCode || err?.reason?.statusCode || err?.reason?.raw?.statusCode || err?.response?.data?.statusCode || err?.code;

module.exports = {
	safeJsonDecode,
	safelyParseJSON,
	getResponse,
	getErrorResponse,
	getNestedKey,
	createEnrichment,
	getErrorMsg,
	getErrorCode,
};
