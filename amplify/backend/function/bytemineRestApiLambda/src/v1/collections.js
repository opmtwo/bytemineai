const { Router } = require('express');

const { deleteBytemineCollection, updateBytemineCollection, createBytemineCollection } = require('../graphql/mutations');
const { getBytemineCollection, listCollectionByTeamId } = require('../graphql/queries');
const { verifyTeam, verifyToken } = require('../middlewares/auth');
const { ICollection, schemaValidate } = require('../schemas');
const { apsGql } = require('../utils/aps-utils');

const router = Router();

router.get('/', verifyToken, async (req, res) => {
	const sub = res.locals.sub;
	let collections = [];
	let nextToken = null;

	do {
		const response = await apsGql(
			listCollectionByTeamId,
			{
				teamId: sub,
				limit: 999,
				sortDirection: 'DESC',
				nextToken,
			},
			'data.listCollectionByTeamId'
		);

		collections = collections.concat(response.items);
		nextToken = response.nextToken;
	} while (nextToken);

	return res.json(collections);
});

router.get('/:id', verifyToken, async (req, res) => {
	const { id } = req.params;

	const collection = await apsGql(getBytemineCollection, { id }, 'data.getBytemineCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(collection);
});

router.post('/', schemaValidate(ICollection), verifyToken, verifyTeam, async (req, res) => {
	const { sub, groups } = res.locals;
	const data = req.body;

	const input = { ...data, owner: sub, userId: sub, teamId: sub };
	const collection = await apsGql(createBytemineCollection, { input }, 'data.createBytemineCollection');

	return res.json(collection);
});

router.put('/:id', schemaValidate(ICollection), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const collection = await apsGql(getBytemineCollection, { id }, 'data.getBytemineCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: collection._version, ...data };
	const collectionUpdated = await apsGql(updateBytemineCollection, { input }, 'data.updateBytemineCollection');

	return res.json(collectionUpdated);
});

router.delete('/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const collection = await apsGql(getBytemineCollection, { id }, 'data.getBytemineCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: collection._version };
	await apsGql(deleteBytemineCollection, { input });

	return res.json(collection);
});

module.exports = router;
