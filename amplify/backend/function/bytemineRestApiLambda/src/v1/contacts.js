const { Router } = require('express');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { apsGql } = require('../utils/aps-utils');

const router = Router();

router.body('/search', verifyToken, verifyTeam, async (req, res) => {
	// const body = req.body;
	// let options = getOptions2(body);
	// options.groupId = attributes.group_name;
	// results = await searchContacts2(options);

	const body = req.body;
	console.log('/api/v2/contacts/search - body - ', body);
	
	const interim = new Date();
	const startsearchtime = interim - starttime;
	console.log(' before search - ', startsearchtime);

	//let options = body
	let options = getOptions2(body);

	const response = await searchContacts2 (options, true, true, false, false);
	if (response instanceof Error === true) {
		return getResponse(
			{ message: response?.response?.data?.message || response?.response?.statusText || genericErrorMessage },
			response?.response?.status || 400
		);
	}
	for (let i = 0; i < response.contacts.length; i++) {
		response.contacts[i].id = response.contacts[i].pid;
		delete response.contacts[i].pid;
	}

	if (body.unlockAll) {
		const usageEntry = await addUsage(body.groupId, body.userId, response.contacts.length * 1, body.filterId);
	}
	response.version = 2;
	//response.options = options;
	//response.body = body;

	const endtime = new Date();
	const diffTime = Math.abs(endtime - starttime);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	console.log('overall search took ' + diffTime + ' milliseconds');
	return res.json(response);
});
