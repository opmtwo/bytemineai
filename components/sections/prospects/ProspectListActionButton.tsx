import classNames from 'classnames';
import { useEffect, useState } from 'react';
import throttledQueue from 'throttled-queue';

import { MAXIMUM_CONTACTS_TO_UNLOCK } from '../../../consts';
import useRoutePrompt from '../../../hooks/useRouterPrompt';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { ActionList, IBytemineCollection, IBytemineCollectionContact, IBytemineContact } from '../../../types';
import { callApi, encodeContact, notifyError, notifySuccess, notifySuccessListAndExport } from '../../../utils/helper-utils';
import FormButtonNew from '../../form/FormButtonNew';
import IconPlusComponent from '../../icons/components/IconPlusComponent';
import IconNewList from '../../icons/IconNewList';
import { Header, THROTTLE_LIMIT, THROTTLE_TIME, Wrapper } from './ProspectCommon';
import ProspectCreatableMultiContacts, { createOption, MultiSelectOption } from './ProspectCreatableMultiContacts';
import ProspectWarningModel from './ProspectWarningModel';

const throttleQ = throttledQueue(THROTTLE_LIMIT, THROTTLE_TIME);

const ProspectListActionButton = ({
	selectedAction = '',
	contacts = [],
	displayItems = [],
	onSuccess = (items: IBytemineContact[]) => {},
	isContactsOnly = false,
}: {
	selectedAction: string;
	contacts: IBytemineContact[];
	displayItems: IBytemineContact[];
	onSuccess: (items: IBytemineContact[]) => void;
	isContactsOnly?: boolean;
}) => {
	const [isActive, setIsActive] = useState(false);

	const [isListLoading, setIsListLoading] = useState(false);
	const [Collections, setCollections] = useState<IBytemineCollection[]>([]);
	const [selectedCollections, setSelectedCollections] = useState<MultiSelectOption[]>([]);

	const [dropdownError, setDropdownError] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);

	const { isOpen, onAllow, onReject } = useRoutePrompt(loading);

	const onToggle = () => setIsActive(!isActive);

	// const [fromRecord, setFromRecord] = useState<string>("");
	// const [toRecord, setToRecord] = useState<string>("");
	// const [maximumPeoplePerCompany, setMaximumPeoplePerCompany] = useState<string>("");

	useEffect(() => {
		getCollections();
	}, []);

	// Load collections / lists
	const getCollections = async () => {
		setIsListLoading(true);
		try {
			const res = (await callApi(null, '/api/v1/collections', {})) as IBytemineCollection[];
			setCollections(res);
			// console.log('getCollections - success', res);
		} catch (err) {
			console.log('getCollections - error', err);
		}
		setIsListLoading(false);
	};

	const onCreateCollection = async (name: string) => {
		try {
			const res = (await callApi(null, '/api/v1/collections', {
				method: 'POST',
				body: JSON.stringify({ name }),
			})) as IBytemineCollection;
			const newOption = createOption({
				label: name,
				value: res.id,
			});
			setSelectedCollections((prevList) => [...prevList, newOption]);
			return res.id;
		} catch (err) {
			console.log('onCreateCollection - error', err);
		}
	};

	const createContact = async (contact: IBytemineContact) => {
		try {
			const res = (await callApi(null, '/api/v1/contacts', {
				method: 'POST',
				body: JSON.stringify(encodeContact(contact)),
			})) as IBytemineContact;
			return res;
		} catch (err) {
			console.log('createContact - error', err);
		}
	};

	const addCollectionContact = async (collectionId: string, contactPid: string) => {
		try {
			const res = (await callApi(null, `/api/v1/collections/${collectionId}/contacts`, {
				method: 'POST',
				body: JSON.stringify({ pids: [contactPid] }),
			})) as IBytemineCollectionContact;
			return res;
		} catch (err) {
			console.log('addCollectionContact - error', err);
		}
	};

	const onSelectList = (options: MultiSelectOption[]) => {
		setSelectedCollections(options);
	};

	const unlockSelectedContacts = async () => {
		setDropdownError('');

		const totalSelected = contacts.filter((contact) => contact.isSelected).length;
		// console.log({ totalSelected });

		if (totalSelected === 0) {
			notifyError(new Error('No records selected to add to list!'));
			return;
		}

		if (selectedCollections.length === 0) {
			setDropdownError('No list selected to add contacts!');
			return;
		}

		if (selectedCollections.length >= 10) {
			setDropdownError('Maximum of 10 list can be selected!');
			return;
		}

		notifySuccessListAndExport(`Adding contacts to list`, 0, selectedCollections.length, 'Prcocessing');

		let sourceContacts: IBytemineContact[] = [...(contacts || [])];

		if (selectedAction === ActionList.All) {
			sourceContacts = [...(sourceContacts || [])];
		}

		if (selectedAction === ActionList.CurrentPage) {
			sourceContacts = [...(displayItems || [])];
		}

		if (selectedAction === '') {
			sourceContacts = (sourceContacts || []).filter((item) => item.isSelected);
		}

		// console.log({ isContactsOnly, sourceContacts: sourceContacts.length });

		// logic for my-contacts page only
		if (isContactsOnly) {
			// as we already have loaded all the contacts!
			// they are unlocked too
			setLoading(true);

			try {
				const operations: any[] = [];

				for (let sl = 0; sl < selectedCollections.length; sl++) {
					for (let i = 0; i < sourceContacts.length; i++) {
						let contact = sourceContacts[i];

						// Create contact item specific to the team
						// ID should be {{contact pid}}-{{team id}}
						if (!contact.id) {
							const newContact = await createContact(contact);
							if (!newContact) {
								console.log('Failed to save contact - skipping');
								continue;
							}
							contact.id = newContact.id;
						}

						// Add to collection
						const collectionId = selectedCollections[sl].value;
						operations.push(addCollectionContact(collectionId!, contact.pid));
					}
				}

				await Promise.allSettled(
					operations.map((opr, index) =>
						throttleQ<any>(() => {
							if (index === operations.length - 1) {
								onToggle();
								setSelectedCollections([]);
								setLoading(false);
							}
							notifySuccessListAndExport(`Added ${index + 1} contact to list`, index + 1, sourceContacts.length, 'Processing');
							return opr();
						})
					)
				);
			} catch (error) {
				notifyError(error);
				setLoading(false);
			}
		} else {
			// Only X number of contacts can be unlocked at once
			if (sourceContacts.length > MAXIMUM_CONTACTS_TO_UNLOCK) {
				const err = new Error(`Maximum ${MAXIMUM_CONTACTS_TO_UNLOCK} contacts can be unlocked at once.`);
				notifyError(err);
				return;
			}

			setLoading(true);

			try {
				// -------------------------------------------------------------
				// Unlock contacts
				// -------------------------------------------------------------
				const pids = sourceContacts.map((item) => item.pid).filter((pid) => pid?.trim()?.length);
				// console.log({ sourceContacts, pids });

				const fullContacts = (await callApi(null, '/api/v1/contacts/unlock', {
					method: 'POST',
					body: JSON.stringify({ pids }),
				})) as IBytemineContact[];

				notifySuccess(`${pids.length} contacts unlocked`);

				// -------------------------------------------------------------
				// Update contacts with unlocked info
				// -------------------------------------------------------------
				let existingContacts = [...(sourceContacts || [])];
				for (let i = 0; i < fullContacts.length; i++) {
					const index = existingContacts.findIndex((item) => item.pid && item.pid === fullContacts[i].pid);
					if (index === -1) {
						continue;
					}
					existingContacts[index] = {
						...fullContacts[i],
						isSelected: existingContacts[index].isSelected,
					};
				}

				// -------------------------------------------------------------
				// Update current selection with unlocked info
				// -------------------------------------------------------------

				// All
				if (selectedAction === ActionList.All) {
					existingContacts = [...(existingContacts || [])];
				}

				// Current page
				if (selectedAction === ActionList.CurrentPage) {
					const displayItemsIds = fullContacts.map((cont: any) => cont.id);
					existingContacts = (existingContacts || []).filter((item) => displayItemsIds.includes(item.id));
				}

				// No selection
				if (selectedAction === '') {
					existingContacts = (existingContacts || []).filter((item) => item.isSelected);
				}

				// -------------------------------------------------------------
				// Create contacts specific to the team members
				// Add the contacts to the specified lists
				// -------------------------------------------------------------
				const operations: any[] = [];
				for (let sl = 0; sl < selectedCollections.length; sl++) {
					for (let i = 0; i < existingContacts.length; i++) {
						let contact = sourceContacts[i];

						// Create contact item specific to the team
						// ID should be {{contact pid}}-{{team id}}
						if (!contact.id) {
							const newContact = await createContact(contact);
							if (!newContact) {
								console.log('Failed to save contact - skipping');
								continue;
							}
							contact.id = newContact.id;
						}

						// Add to collection
						const collectionId = selectedCollections[sl].value;
						operations.push(addCollectionContact(collectionId!, contact.pid));
					}
				}

				// -------------------------------------------------------------
				// Use batches to perform the above operations
				// Create team specific contacts
				// Add the contacts to the specified lists
				// -------------------------------------------------------------
				await Promise.allSettled(
					operations.map((opr, index) =>
						throttleQ<any>(() => {
							if (index === operations.length - 1) {
								onSuccess(fullContacts);
								onToggle();
								setSelectedCollections([]);
								setLoading(false);
							}
							notifySuccessListAndExport(`Added ${index + 1} contacts to list`, index + 1, sourceContacts.length, 'Processing');
							return opr;
						})
					)
				);
			} catch (err) {
				notifyError(err);
				setLoading(false);
			}

			setLoading(false);
		}

		// All done
		notifySuccessListAndExport(`Added ${sourceContacts.length} contacts to list`, sourceContacts.length, sourceContacts.length, 'Completed');
	};

	const listItemOptions: MultiSelectOption[] = Collections.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	return (
		<>
			{isActive ? <div className="is-overlay" onClick={onToggle}></div> : null}
			<div className={classNames('dropdown', { 'is-active': isActive })}>
				<div className="dropdown-trigger is-flex is-justify-content-center is-align-items-center">
					<FormButtonNew className="mx-5" onClick={onToggle}>
						<IconNewList width={16} />
						<span>Add to List</span>
					</FormButtonNew>
				</div>

				<div className="dropdown-menu list-action-button-container">
					<div className="dropdown-content is-borderless">
						<div className="dropdown-item">
							<span className="py-1 has-text-dark">Add Selected To List</span>
						</div>
						<hr className="dropdown-divider" />

						<Wrapper>
							<Header className="mb-2">List</Header>
							<div className="mb-3">
								{!isListLoading && (
									<ProspectCreatableMultiContacts
										selected={selectedCollections}
										options={listItemOptions}
										onCreateNew={onCreateCollection}
										onSelect={onSelectList}
										error={dropdownError}
									/>
								)}
							</div>

							<FormButtonNew
								type="button"
								onClick={unlockSelectedContacts}
								// variant={['is-outlined']}
								// color="is-primary"
								className="is-fullwidth"
								disabled={loading}
								// loading={loading}
							>
								Add Selection
							</FormButtonNew>
						</Wrapper>
					</div>
				</div>
			</div>

			<ProspectWarningModel
				title="Warning"
				msg="Are you sure you want to leave page"
				submitLabel="Yes"
				cancelLabel="No"
				isActive={isOpen}
				onAllow={onAllow}
				onReject={onReject}
				onCancel={onReject}
			/>
		</>
	);
};

export default ProspectListActionButton;
