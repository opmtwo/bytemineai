const { Router } = require('express');

const { apsGql } = require('../utils/aps-utils');
const { listFilterByTeamId, getBytemineFilter } = require('../graphql/queries');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { deleteBytemineFilter, createBytemineFilter, updateBytemineFilter } = require('../graphql/mutations');
const { schemaValidate, IFilter } = require('../schemas');

const router = Router();

router.get('/', verifyToken, async (req, res) => {
	const sub = res.locals.sub;
	let filters = [];
	let nextToken = null;

	do {
		const response = await apsGql(
			listFilterByTeamId,
			{
				teamId: sub,
				limit: 999,
				sortDirection: 'DESC',
				nextToken,
			},
			'data.listFilterByTeamId'
		);

		filters = filters.concat(response.items);
		nextToken = response.nextToken;
	} while (nextToken);

	return res.json(filters);
});

router.get('/:id', verifyToken, async (req, res) => {
	const { id } = req.params;

	const filter = await apsGql(getBytemineFilter, { id }, 'data.getBytemineFilter');
	if (!filter?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(filter);
});

router.post('/', schemaValidate(IFilter), verifyToken, verifyTeam, async (req, res) => {
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const data = req.body;

	const input = { ...data, owner: sub, userId: sub, teamId };
	const filter = await apsGql(createBytemineFilter, { input }, 'data.createBytemineFilter');

	return res.json(filter);
});

router.put('/:id', schemaValidate(IFilter), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const filter = await apsGql(getBytemineFilter, { id }, 'data.getBytemineFilter');
	if (!filter?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: filter._version, ...data };
	const filterUpdated = await apsGql(updateBytemineFilter, { input }, 'data.updateBytemineFilter');

	return res.json(filterUpdated);
});

router.delete('/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const filter = await apsGql(getBytemineFilter, { id }, 'data.getBytemineFilter');
	if (!filter?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: filter._version };
	await apsGql(deleteBytemineFilter, { input });

	return res.json(filter);
});

module.exports = router;
