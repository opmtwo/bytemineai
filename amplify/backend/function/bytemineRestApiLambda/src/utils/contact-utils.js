const contactDelete = async (id, groupname) => {
	const options = {
		input: {
			id: `${id}-${groupname}`,
		},
	};
	try {
		return await appSyncMutation(mutations.deleteContact, options);
	} catch (err) {
		console.error('Error deleting contact:', err); // Improved error logging
		return null; // Return null or handle the error as needed
	}
};

const contactDeleteMulti = async (ids, groupname) => {
	const promises = [];
	for (let i = 0; i < ids.length; i++) {
		promises.push(contactDeleteById(ids[i], groupname));
	}
	const allResults = await Promise.allSettled(promises);
	return allResults;
};

const contactClean = (contact) => {
	delete contact.owner;
	delete contact.userId;
	delete contact.groupId;
	delete contact.tenants;
	delete contact.__typename;
	delete contact.isUnlocked;
	delete contact.isEmailVerified;
	delete contact.contactEmailStatusCode;
	delete contact.contactEmailDomainType;
	delete contact.personalEmailStatusCode;
	delete contact.personalEmailDomainType;
	delete contact.contactPersonalEmailStatusCode;
	delete contact.contactPersonalEmailDomainType;
};

module.exports = {
	contactDelete,
	contactDeleteMulti,
    contactClean,
};
