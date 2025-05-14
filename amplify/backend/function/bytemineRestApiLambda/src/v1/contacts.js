const { Router } = require('express');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { apsGql } = require('../utils/aps-utils');
const { searchContactsV2, getAllSavedContacts, deleteAllSavedContacts, getAllContacts, saveAllContacts } = require('../utils/search-utils');
const { getErrorMsg, getErrorCode, encodeContact } = require('../utils/helper-utils');
const { usageAddUsage } = require('../utils/usage-utils');
const { esGetOptionsV2 } = require('../utils/es-utils-v2');
const { createBytemineContact, deleteBytemineContact, updateBytemineContact } = require('../graphql/mutations');
const { getBytemineContact } = require('../graphql/queries');
const { schemaValidate, IContact, IPids } = require('../schemas');
const { v4 } = require('uuid');

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

	// -------------------------------------------------------------------------
	// Lookup contacts in OpenSearch - this is the core
	// -------------------------------------------------------------------------
	const response = await searchContactsV2(body, true, true, false, false);
	if (response instanceof Error === true) {
		return res.status(getErrorCode(response) || 422).json({ message: getErrorMsg(response) });
	}

	// -------------------------------------------------------------------------
	// Perform any modifications to the final output data here
	// -------------------------------------------------------------------------
	for (let i = 0; i < response.contacts.length; i++) {
		delete response.contacts[i].id;
		// response.contacts[i].id = response.contacts[i].pid;
		// response.contacts[i].uuid = response.contacts[i].uuid;
		// delete response.contacts[i].pid;
	}

	// response.version = 2;
	// response.options = options;
	// response.body = body;

	// -------------------------------------------------------------------------
	// Add usage info - credits consumed to unlock the contacts
	// -------------------------------------------------------------------------
	if (body.unlockAll) {
		await usageAddUsage(teamId, sub, response.contacts.length * 1, body.filterId);
	}

	// -------------------------------------------------------------------------
	// Final cleanup and logs. Also log execution time info
	// -------------------------------------------------------------------------
	const endtime = new Date();
	const diffTime = Math.abs(endtime - starttime);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	console.log('overall search took ' + diffTime + ' milliseconds');

	return res.json(response);
});

router.post('/unlock', schemaValidate(IPids), verifyToken, verifyTeam, async (req, res) => {
	const { sub: userId } = res.locals;
	const { id: teamId } = res.locals.team;
	const { pids } = req.body;
	console.log(JSON.stringify({ pids }));

	// const usage = await usageAddUsage(teamId, userId, 0);

	const savedContacts = await getAllSavedContacts(pids, teamId);
	console.log(JSON.stringify({ savedContacts: savedContacts.length }));

	const fullContacts = savedContacts.filter((item) => item.is_unlocked && item.pid);
	console.log(JSON.stringify({ fullContacts: fullContacts.length }));

	const partialContacts = savedContacts.filter((item) => !item.is_unlocked || !item.pid);
	console.log(JSON.stringify({ partialContacts: partialContacts.length }));

	const unlockedpids = fullContacts.map((item) => item.pid);
	console.log(JSON.stringify({ length: unlockedpids.length, unlockedpids }));

	const pidsToUnlock = pids.filter((id) => !unlockedpids.includes(id));
	console.log(JSON.stringify({ length: pidsToUnlock.length, pidsToUnlock }));

	const pidsToDelete = partialContacts.map((item) => item.pid || item.id.split('-')[0]);
	console.log(JSON.stringify({ length: pidsToDelete.length, pidsToDelete }));

	await deleteAllSavedContacts(pidsToDelete, teamId);

	const newFullContacts = await getAllContacts(pidsToUnlock);
	console.log(JSON.stringify({ newFullContacts: newFullContacts.length }));

	const newSavedContacts = await saveAllContacts(newFullContacts, teamId, userId, false, true);

	//credits used calc
	// const creditsUsed = newFullContacts.filter(
	// 	(item) => parseInt(item?.contact_email_status_code || '0') === 50 || parseInt(item?.personal_email_status_code || '0') === 50
	// ).length;
	const creditsUsed = newFullContacts.length;
	console.log(JSON.stringify({ creditsUsed }));

	//const creditsUsed = newFullContacts.filter((item) => item.contactEmail || item.personalEmail || item.historicalEmails?.length).length;

	// await updateUsage(usage.data.createUsage.id, creditsUsed, teamId, userId);
	await usageAddUsage(teamId, userId, creditsUsed);

	return res.json([...fullContacts, ...newSavedContacts]);
});

router.get('/:id', verifyToken, async (req, res) => {
	const { id } = req.params;

	const contact = await apsGql(getBytemineContact, { id }, 'data.getBytemineContact');
	if (!contact?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(contact);
});

router.post('/', schemaValidate(IContact), verifyToken, verifyTeam, async (req, res) => {
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;

	const data = req.body;
	const id = `${data.pid}-${teamId}`;

	// unlocked contact exists?
	const oldContact = await apsGql(getBytemineContact, { id }, 'data.getBytemineContact');
	if (oldContact?.is_unlocked) {
		console.log('Old unlocked contact found - skipping overwrite');
		return res.json(oldContact);
	}

	// delete old contact
	if (oldContact?.id) {
		await apsGql(deleteBytemineContact, { input: { id } }, 'data.deleteBytemineContact');
	}

	const contactEncoded = encodeContact(data);
	const input = { ...contactEncoded, id, owner: sub, userId: sub, teamId };
	const contact = await apsGql(createBytemineContact, { input }, 'data.createBytemineContact');

	return res.json(contact);
});

router.put('/:id', schemaValidate(IContact), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const data = req.body;

	const contact = await apsGql(getBytemineContact, { id }, 'data.getBytemineContact');
	if (!contact?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: contact._version, ...data, userId: sub, teamId };
	const contactUpdated = await apsGql(updateBytemineContact, { input }, 'data.updateBytemineContact');

	return res.json(contactUpdated);
});

router.post('/:id/unlock', schemaValidate(IContact), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const data = req.body;

	const contact = await apsGql(getBytemineContact, { id }, 'data.getBytemineContact');
	if (!contact?.id) {
		// return res.status(404).json({ message: 'Not found' });
	}

	return res.json(contact);
});

router.delete('/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const contact = await apsGql(getBytemineContact, { id }, 'data.getBytemineContact');
	if (!contact?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: contact._version };
	await apsGql(deleteBytemineContact, { input });

	return res.json(contact);
});

module.exports = router;
