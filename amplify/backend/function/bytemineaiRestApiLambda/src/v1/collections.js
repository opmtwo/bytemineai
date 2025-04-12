import { Router } from 'express';

import { createCollection, deleteCollection, updateCollection } from '../graphql/mutations';
import { getCollection, listCollectionByTeamId } from '../../graphql/queries';
import { verifyGroup, verifyToken } from '../../middlewares/auth';
import { IFaq, schemaValidate } from '../../schemas';
import { apsGql } from '../utils/aps-utils';

export const router = Router();

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

	const collection = await apsGql(getCollection, { id }, 'data.getCollection');
	if (!faq?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(collection);
});

router.post('/', schemaValidate(IFaq), verifyToken, verifyGroup, async (req, res) => {
	const { sub, groups } = res.locals;
	const data = req.body;

	const input = { ...data, owner: sub, userId: sub };
	const collection = await apsGql(createCollection, { input }, 'data.createCollection');

	return res.json(collection);
});

router.put('/:id', schemaValidate(IFaq), verifyToken, verifyGroup, async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const collection = await apsGql(getCollection, { id }, 'data.getCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: collection._version, ...data };
	const collectionUpdated = await apsGql(updateCollection, { input }, 'data.updateCollection');

	return res.json(collectionUpdated);
});

router.delete('/:id', verifyToken, verifyGroup, async (req, res) => {
	const { id } = req.params;

	const collection = await apsGql(getCollection, { id }, 'data.getCollection');
	if (!collection?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: collection._version };
	await apsGql(deleteCollection, { input });

	return res.json(collection);
});

module.exports = router;
