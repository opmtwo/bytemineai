const { Router } = require('express');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { apsGql } = require('../utils/aps-utils');
const { searchContactsV2 } = require('../utils/search-utils');
const { getErrorMsg, getErrorCode } = require('../utils/helper-utils');
const { usageAddUsage } = require('../utils/usage-utils');
const { esGetOptionsV2 } = require('../utils/es-utils-v2');

const router = Router();

router.post('/search', verifyToken, verifyTeam, async (req, res) => {
	const starttime = new Date();
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;

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
	// let options = esGetOptionsV2(body);

	const response = await searchContactsV2(body, true, true, false, false);
	if (response instanceof Error === true) {
		return res.status(getErrorCode(response) || 422).json({ message: getErrorMsg(response) });
	}

	for (let i = 0; i < response.contacts.length; i++) {
		response.contacts[i].id = response.contacts[i].pid;
		delete response.contacts[i].pid;
	}

	if (body.unlockAll) {
		await usageAddUsage(teamId, sub, response.contacts.length * 1, body.filterId);
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

module.exports = router;
