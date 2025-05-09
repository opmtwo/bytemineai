const { Router } = require('express');
const slugify = require('slugify');

const { deleteBytemineCollection, updateBytemineCollection, createBytemineCollection, createBytemineCollectionContact, deleteBytemineCollectionContact } = require('../graphql/mutations');
const { getBytemineCollection, listCollectionByTeamId, listCollectionBySlug } = require('../graphql/queries');
const { verifyTeam, verifyToken } = require('../middlewares/auth');
const { ICollection, schemaValidate, IIds, IPids } = require('../schemas');
const { apsGql } = require('../utils/aps-utils');

const router = Router();

const BATCH_SIZE = 50;

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

router.get('/available', verifyToken, verifyTeam, async (req, res) => {
	const { id: teamId } = res.locals.team;
	const { name } = req.query;
	const slug = slugify(`${name}-${teamId}`, { lower: true, strict: true });

	const collections = await apsGql(listCollectionBySlug, { slug }, 'data.listCollectionBySlug.items');
	console.log('collections', { length: collections.length });

	return res.json({ id: collections?.[0]?.id });
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
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const data = req.body;
	const slug = slugify(`${data.name}-${teamId}`, { lower: true, strict: true });

	const collections = await apsGql(listCollectionBySlug, { slug }, 'data.listCollectionBySlug.items');
	console.log('collections', { length: collections.length });

	if (collections.length) {
		console.log('Found existing collection with same name', JSON.stringify({ collections }));
		return res.json(collections[0]);
	}

	const input = { ...data, slug, owner: sub, userId: sub, teamId };
	const collection = await apsGql(createBytemineCollection, { input }, 'data.createBytemineCollection');

	return res.json(collection);
});

router.put('/:id', schemaValidate(ICollection), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const { id: teamId } = res.locals.team;
	const data = req.body;
	const slug = slugify(`${data.name}-${teamId}`, { lower: true, strict: true });

	const collection = await apsGql(getBytemineCollection, { id }, 'data.getBytemineCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: collection._version, ...data, slug };
	const collectionUpdated = await apsGql(updateBytemineCollection, { input }, 'data.updateBytemineCollection');

	return res.json(collectionUpdated);
});

router.post('/:id/contacts', schemaValidate(IPids), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const { pids } = req.body;

	// Check collection
	const collection = await apsGql(getBytemineCollection, { id }, 'data.getBytemineCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	let promises = [];
	let results = [];

	// Remove matching collection contacts in batches
	// we will simply go ahead and create everything once again
	// this keeps everything simple and we create a new contact everytime this api is invoked
	for (let i = 0; i < pids.length; i++) {
		const pid = pids[i];
		const _id = `${id}-${pid}`;

		promises.push(await apsGql(deleteBytemineCollectionContact, { input: { id: _id } }, 'data.deleteBytemineCollectionContact'));

		// Clean queue
		if (promises.length > BATCH_SIZE) {
			await Promise.all(promises);
			promises = [];
		}
	}

	await Promise.all(promises);
	promises = [];

	// Create collection contacts in batches
	for (let i = 0; i < pids.length; i++) {
		const pid = pids[i];
		const _id = `${id}-${pid}`;
		const input = {
			id: _id,
			owner: sub,
			userId: sub,
			teamId: teamId,
			collectionId: id,
			contactId: `${pid}-${teamId}`,
		};

		promises.push(await apsGql(createBytemineCollectionContact, { input }, 'data.createBytemineCollectionContact'));

		// Clean queue
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	// Clean remaining queue
	results = results.concat(await Promise.all(promises));
	console.log('All done', JSON.stringify(results));

	return res.json(results);
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
