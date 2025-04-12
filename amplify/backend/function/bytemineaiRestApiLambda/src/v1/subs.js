import { Router } from 'express';

import { createSub, deleteSub, updateSub } from '../graphql/mutations';
import { getSub, listSubByTeamId } from '../../graphql/queries';
import { verifyGroup, verifyToken } from '../../middlewares/auth';
import { IFaq, schemaValidate } from '../../schemas';
import { apsGql } from '../utils/aps-utils';

export const router = Router();

router.get('/', verifyToken, async (req, res) => {
	const sub = res.locals.sub;
	let subs = [];
	let nextToken = null;

	do {
		const response = await apsGql(
			listSubByTeamId,
			{
				teamId: sub,
				limit: 999,
				sortDirection: 'DESC',
				nextToken,
			},
			'data.listSubByTeamId'
		);

		subs = subs.concat(response.items);
		nextToken = response.nextToken;
	} while (nextToken);

	return res.json(subs);
});

router.get('/:id', verifyToken, async (req, res) => {
	const { id } = req.params;

	const sub = await apsGql(getSub, { id }, 'data.getSub');
	if (!sub?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(sub);
});

router.post('/', schemaValidate(IFaq), verifyToken, verifyGroup, async (req, res) => {
	const { sub: userId, groups } = res.locals;
	const data = req.body;

	const input = { ...data, owner: userId, userId: userId };
	const sub = await apsGql(createSub, { input }, 'data.createSub');

	return res.json(sub);
});

router.put('/:id', schemaValidate(IFaq), verifyToken, verifyGroup, async (req, res) => {
	const { id } = req.params; // This should be the team id
	const data = req.body;

	const sub = await apsGql(getSub, { id }, 'data.getSub');
	if (!sub?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const currentCredits = body.currentCredits || sub.currentCredits;
	const annualCredits = body.annualCredits || sub.annualCredits;
	const firstPaid = body.firstPaid || '1970-01-01T00:00:00.000Z';
	const lastPaid = body.lastPaid || '1970-01-01T00:00:00.000Z';
	const monthlyCredits = body.monthlyCredits || sub.monthlyCredits;
	const quarterlyCredits = body.quarterlyCredits || sub.quarterlyCredits;
	const stripeCustomerId = body.stripeCustomerId || sub.stripeCustomerId;
	const stripeSubscriptionID = body.stripeSubscriptionId || sub.stripeSubscriptionId;
	const subscriptionPeriod = body.subscriptionPeriod || sub.subscriptionPeriod;
	const subscriptionStatus = body.subscriptionStatus || sub.subscriptionStatus;

	const seats = body.seats;
	const block = body.block;
	const tenant = body.tenant;
	const notes = body.notes;
	const colorCode = body.colorCode;
	const iconS3Key = body.iconS3Key;
	const logoS3Key = body.logoS3Key;
	const isApiBlocked = body.isApiBlocked;
	const isEmailBlocked = body.isEmailBlocked;
	const isProspectBlocked = body.isProspectBlocked;
	const isEnrichBlocked = body.isEnrichBlocked;
	const isFilesBlocked = body.isFilesBlocked;
	const isAutoComposeBlocked = body.isAutoComposeBlocked;
	const isAssistantsBlocked = body.isAssistantsBlocked;
	const isSubProcessingBlocked = body.isSubProcessingBlocked;
	let sub_id_arry = null;
	if (stripeSubscriptionID != '') {
		sub_id_arry = [stripeSubscriptionID];
	}

	const input = {
		id: nysub.id,
		currentCredits: currentCredits,
		annualCredits: annualCredits,
		firstPaid: firstPaid,
		lastPaid: lastPaid,
		monthlyCredits: monthlyCredits,
		quarterlyCredits: quarterlyCredits,
		stripeCustomerId: stripeCustomerId,
		stripeSubscriptionID: sub_id_arry,
		subscriptionPeriod: subscriptionPeriod,
		subscriptionStatus: subscriptionStatus,
		seats: seats,
		block: block,
		tenant: tenant,
		notes: notes,
		color_code: color_code,
		icon_s3_key: icon_s3_key,
		logo_s3_key: logo_s3_key,
		block_api: block_api,
		block_email: block_email,
		block_prospect: block_prospect,
		block_enrich: block_enrich,
		block_files: block_files,
		block_auto_compose: block_auto_compose,
		block_assistants: block_assistants,
		block_sub_processing: block_sub_processing,
	};

	// const input = { id, _version: sub._version, ...data };
	const subUpdated = await apsGql(updateSub, { input }, 'data.updateSub');

	return res.json(subUpdated);
});

router.delete('/:id', verifyToken, verifyGroup, async (req, res) => {
	const { id } = req.params;

	const sub = await apsGql(getSub, { id }, 'data.getSub');
	if (!sub?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: sub._version };
	await apsGql(deleteSub, { input });

	return res.json(sub);
});

module.exports = router;
