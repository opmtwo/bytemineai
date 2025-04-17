const { Router } = require('express');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { schemaValidate, IDomainSearch } = require('../schemas');
const { createBytemineDomainSearch } = require('../graphql/mutations');
const { getBytemineDomainSearch, listDomainSearchByTeamId } = require('../graphql/queries');
const { apsGql } = require('../utils/aps-utils');

const router = Router();

router.get('/domain', verifyToken, verifyTeam, async (req, res) => {
	const { id: teamId } = res.locals.team;
	let searches = [];
	let nextToken = null;

	do {
		const response = await apsGql(
			listDomainSearchByTeamId,
			{
				teamId,
				limit: 999,
				sortDirection: 'DESC',
				nextToken,
			},
			'data.listDomainSearchByTeamId'
		);

		searches = searches.concat(response.items);
		nextToken = response.nextToken;
		break;
	} while (nextToken);

	return res.json(searches);
});

router.get('/domain/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const search = await apsGql(getBytemineDomainSearch, { id }, 'data.getBytemineDomainSearch');
	if (!search?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(search);
});

router.post('/domain', schemaValidate(IDomainSearch), verifyToken, verifyTeam, async (req, res) => {
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const data = req.body;

	const input = { ...data, owner: sub, userId: sub, teamId };
	const search = await apsGql(createBytemineDomainSearch, { input }, 'data.createBytemineDomainSearch');

	return res.json(search);
});

module.exports = router;
