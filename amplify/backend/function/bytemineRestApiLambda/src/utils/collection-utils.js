const collectionCleanItem = (collectionItem) => {
	delete collectionItem.owner;
	delete collectionItem.userId;
	delete collectionItem.groupId;
	delete collectionItem.tenants;
	delete collectionItem.__typename;
	delete collectionItem.isUnlocked;
	delete collectionItem.isEmailVerified;
	delete collectionItem.contactEmailStatusCode;
	delete collectionItem.contactEmailDomainType;
	delete collectionItem.personalEmailStatusCode;
	delete collectionItem.personalEmailDomainType;
	delete collectionItem.contactPersonalEmailStatusCode;
	delete collectionItem.contactPersonalEmailDomainType;
};

module.exports = {
	collectionCleanItem,
};
