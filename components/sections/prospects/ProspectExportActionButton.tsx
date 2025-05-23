import classNames from 'classnames';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import throttledQueue from 'throttled-queue';

import Auth from '@aws-amplify/auth';

import { MAXIMUM_CONTACTS_TO_UNLOCK } from '../../../consts';
import useRoutePrompt from '../../../hooks/useRouterPrompt';
import { useAuthContext } from '../../../providers/auth-data-provider';
import {
	ActionExport,
	ActionList,
	ActionSelect,
	Contact,
	IBytemineCollection,
	IBytemineCollectionContact,
	IBytemineContact,
	List,
	SortData,
} from '../../../types';
import { callApi, encodeContact, notifyError, notifySuccess, notifySuccessListAndExport } from '../../../utils/helper-utils';
import FormButton from '../../form/FormButton';
import FormButtonNew from '../../form/FormButtonNew';
import FormInput from '../../form/FormInput';
import IconDownloadComponent from '../../icons/components/IconDownloadComponent';
import IconNewExport from '../../icons/IconNewExport';
import Modal from '../../modals/Modal';
import QueryLoader from '../../QueryLoader';
import { Header, THROTTLE_LIMIT, THROTTLE_TIME, Wrapper } from './ProspectCommon';
import CreatableMultiContacts, { createOption, MultiSelectOption } from './ProspectCreatableMultiContacts';
import ProspectWarningModel from './ProspectWarningModel';

const throttleQ = throttledQueue(THROTTLE_LIMIT, THROTTLE_TIME);

const ProspectExportActionButton = ({
	selectedAction = '',
	contacts = [],
	displayItems = [],
	sortMap = [],
	onSuccess = (items: IBytemineContact[], exportContacts: boolean, selectedAction: ActionExport) => {},
	onExport = () => {},
	isContactsOnly = false,
}: {
	selectedAction: string;
	contacts: IBytemineContact[];
	displayItems: IBytemineContact[];
	sortMap?: SortData[];
	onSuccess: (items: IBytemineContact[], exportContacts: boolean, selectedAction: ActionExport) => void;
	onExport: (type: ActionExport, targetIds: string[], sortMap?: SortData[]) => void;
	isContactsOnly?: boolean;
}) => {
	// const { user } = useAuthContext();
	// const groupname = user?.attributes['custom:group_name'];

	const [isActive, setIsActive] = useState(false);

	const [isListLoading, setIsListLoading] = useState(false);

	const [collections, setCollections] = useState<IBytemineCollection[]>([]);

	const [selectedCollections, setSelectedCollections] = useState<MultiSelectOption[]>([]);

	const [dropdownError, setDropdownError] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);

	const onToggle = () => setIsActive(!isActive);

	const { isOpen, onAllow, onReject } = useRoutePrompt(loading);

	// const [fromRecord, setFromRecord] = useState("");
	// const [toRecord, setToRecord] = useState("");
	// const [maximumPeoplePerCompany, setMaximumPeoplePerCompany] = useState("");

	useEffect(() => {
		getCollections();
	}, []);

	// Load collections / lists
	const getCollections = async () => {
		setIsListLoading(true);
		try {
			const res = (await callApi(null, '/api/v1/collections', {})) as IBytemineCollection[];
			setCollections(res);
			console.log('getCollections - success', res);
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

	// export records
	const exportRecords = (allContactList: IBytemineContact[]) => {
		let totalContactsForExport: string[] = [];
		if (selectedAction === ActionList.All) {
			onExport(ActionExport.All, [], sortMap);
		} else if (selectedAction === ActionList.CurrentPage) {
			totalContactsForExport = allContactList.map((item) => item.id);
			onExport(ActionExport.CurrentPage, totalContactsForExport, sortMap);
		} else if (selectedAction === '') {
			onExport(ActionExport.Selected, [], sortMap);
		}
		return totalContactsForExport.length;
	};

	const onExportSelection = async () => {
		const totalSelected = contacts.filter((contact) => contact.isSelected).length;

		if (totalSelected === 0) {
			notifyError(new Error('No records selected to export!'));
			return;
		}

		if (selectedCollections.length >= 10) {
			setDropdownError('Maximum of 10 list can be selected!');
			return;
		}

		// notifySuccessListAndExport(`Exporting  contacts to list`, 0, selectedCollections.length, 'Prcocessing');
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

		// logic for my-contacts page only
		if (isContactsOnly) {
			// as we already have loaded all the contacts!
			// they are unlocked too
			if (selectedCollections.length > 0) {
				// add contact to list
				// list are selected, you need to call that api to add contacts to lists
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
									setSelectedCollections([]);
									setLoading(false);
								}
								// notifySuccessListAndExport(`Added ${index + 1} contacts to list`, index, sourceContacts.length, 'completed');
								return opr;
							})
						)
					);
				} catch (error) {
					notifyError(error);
					setLoading(false);
				}
			}
			// unlock contacts,
			const totalRecords = exportRecords(sourceContacts);
			// notifySuccessListAndExport(
			// 	`Exported ${totalRecords === 0 ? 'All' : totalRecords} contacts  successfully`,
			// 	totalRecords,
			// 	totalRecords,
			// 	`Exported and Added to My files`
			// );
			onToggle();
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
				console.log({ sourceContacts, pids });

				const fullContacts = (await callApi(null, '/api/v1/contacts/unlock', {
					method: 'POST',
					body: JSON.stringify({ pids }),
				})) as IBytemineContact[];

				// notifySuccessListAndExport(`${pids.length} contacts unlocked`, pids.length, pids.length, `unlocked contact`);

				// for the unlocked contacts update in table
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

				// only if the there is selected list, add the contacts in the list
				if (selectedCollections.length > 0) {
					const operations: any[] = [];
					// try {
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

					await Promise.allSettled(
						operations.map((opr, index) =>
							throttleQ<any>(() => {
								if (index === operations.length - 1) {
									let action: ActionExport = ActionExport.Selected;
									if (selectedAction === ActionList.All) {
										action = ActionExport.All;
									} else if (selectedAction === ActionList.CurrentPage) {
										action = ActionExport.CurrentPage;
									} else if (selectedAction === '') {
										action = ActionExport.Selected;
									}
									// onSuccess(fullContacts);
									onSuccess(fullContacts, true, action);
									onToggle();
									setSelectedCollections([]);
									setLoading(false);
								}
								notifySuccessListAndExport(`Exported ${index + 1} contacts`, index, pids.length, 'Processing');
								return opr;
							})
						)
					);
				} else {
					let action: ActionExport = ActionExport.Selected;
					if (selectedAction === ActionList.All) {
						action = ActionExport.All;
					} else if (selectedAction === ActionList.CurrentPage) {
						action = ActionExport.CurrentPage;
					} else if (selectedAction === '') {
						action = ActionExport.Selected;
					}
					onSuccess(fullContacts, true, action);
				}
				const totalRecords = existingContacts.length;
				onToggle();
				// notifySuccess(
				//   `Added ${totalRecords === 0 ? "All" : totalRecords} contacts `,
				//   totalRecords,
				//   totalRecords,
				//   "Completed"
				// );

				// notifySuccessListAndExport(
				// 	`Exported ${totalRecords === 0 ? 'All' : totalRecords} contacts  successfully!`,
				// 	totalRecords,
				// 	totalRecords,
				// 	'Exported and added to My Files'
				// );

				setLoading(false);
			} catch (err) {
				notifyError(err);
				setLoading(false);
			}
		}
	};

	const listItemOptions: MultiSelectOption[] = collections.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	return (
		<>
			{isActive ? <div className="is-overlay" onClick={onToggle}></div> : null}
			<div className={classNames('dropdown', { 'is-active': isActive })}>
				<div className="dropdown-trigger is-flex is-justify-content-center is-align-items-center">
					<FormButtonNew variant="active" onClick={onToggle}>
						<IconNewExport width={16} />
						<span>Export</span>
					</FormButtonNew>
				</div>
				<div className="dropdown-menu list-action-button-container">
					<div className="dropdown-content is-borderless">
						<div className="dropdown-item">
							<span className="py-1 has-text-dark">Export Selected</span>
						</div>
						<hr className="dropdown-divider" />

						<Wrapper>
							<Header className="mb-2">List</Header>
							<div className="mb-3">
								{!isListLoading && (
									<CreatableMultiContacts
										selected={selectedCollections}
										options={listItemOptions}
										onCreateNew={onCreateCollection}
										onSelect={onSelectList}
										error={dropdownError}
									/>
								)}
								{/* {groupname ? (
									<QueryLoader
										onLoad={setCollections}
										query={listListsByGroupId}
										rootKey='listListsByGroupId'
										dataKey='items'
										onBusyToggle={setIsListLoading}
										options={{ groupId: groupname }}
									/>
								) : null} */}
							</div>

							<FormButtonNew
								onClick={onExportSelection}
								// variant={['is-outlined']}
								color="is-primary"
								className="is-fullwidth"
								disabled={loading}
								// loading={loading}
							>
								Export Selection
							</FormButtonNew>
						</Wrapper>

						{/* <hr className="dropdown-divider" />
						<Wrapper>
							<Header className="mb-2">Advanced Section</Header>
							<div className="columns is-is-mobile">
								<div className="column is-half">
									<FormInput
										type="number"
										name="fromRecord"
										value={fromRecord}
										label="From record #"
										onChange={setFromRecord}
										required={true}
									/>
								</div>
								<div className="column is-half">
									<FormInput
										type="number"
										name="toRecord"
										value={toRecord}
										label="To record #"
										onChange={setToRecord}
			required={true}
									/>
								</div>
							</div>
							<div className="columns is-is-mobile">
								<div className="column">
									<FormInput
										type="number"
										name="maximumPeoplePerCompany"
										value={maximumPeoplePerCompany}
										label="Maximum people per company"
										onChange={setMaximumPeoplePerCompany}
										required={true}
									/>
								</div>
							</div>
<div className="columns">
								<div className="column">
									<FormButton
										onClick={() => {}}
										variant={["is-outlined"]}
										color="is-primary"
										className="is-fullwidth"
										disabled={false}
									>
										Export Selection
									</FormButton>
								</div>
							</div>
						</Wrapper> */}
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

export default ProspectExportActionButton;
