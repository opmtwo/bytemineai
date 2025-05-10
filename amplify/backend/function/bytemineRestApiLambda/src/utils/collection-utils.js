const collectionCleanItem = (collectionItem) => {
	delete collectionItem.owner;
	delete collectionItem.userId;
	delete collectionItem.groupId;
	delete collectionItem.tenants;
	delete collectionItem.__typename;
	delete collectionItem.is_unlocked;
	delete collectionItem.is_email_verified;
	delete collectionItem.contact_email_status_code;
	delete collectionItem.contact_email_domain_type;
	delete collectionItem.personal_email_status_code;
	delete collectionItem.personal_email_domain_type;
	delete collectionItem.contact_personal_email_status_code;
	delete collectionItem.contact_personal_email_domain_type;
};

module.exports = {
	collectionCleanItem,
};
