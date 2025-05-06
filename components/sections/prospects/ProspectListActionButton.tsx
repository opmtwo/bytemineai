import classNames from 'classnames';
import { useState } from 'react';
import throttledQueue from 'throttled-queue';

import { MAXIMUM_CONTACTS_TO_UNLOCK } from '../../../consts';
import useRoutePrompt from '../../../hooks/useRouterPrompt';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { ActionList, IBytemineCollection, IBytemineContact } from '../../../types';
import { notifyError, notifySuccess, notifySuccessListAndExport } from '../../../utils/helper-utils';
import FormButtonNew from '../../form/FormButtonNew';
import IconPlusComponent from '../../icons/components/IconPlusComponent';
import { Header, THROTTLE_LIMIT, THROTTLE_TIME, Wrapper } from './ProspectCommon';
import ProspectCreatableMultiContacts, { MultiSelectOption } from './ProspectCreatableMultiContacts';
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
	const { attributes } = useAuthContext();

	const [isActive, setIsActive] = useState(false);
	const [isListLoading, setIsListLoading] = useState(false);
	const [listItems, setListItems] = useState<IBytemineCollection[]>([]);
	const [selectedLists, setSelectedLists] = useState<MultiSelectOption[]>([]);
	const [dropdownError, setDropdownError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { isOpen, onAllow, onReject } = useRoutePrompt(loading);
	const onToggle = () => setIsActive(!isActive);

	// const [fromRecord, setFromRecord] = useState<string>("");
	// const [toRecord, setToRecord] = useState<string>("");
	// const [maximumPeoplePerCompany, setMaximumPeoplePerCompany] = useState<string>("");

	const onCreateList = async (listName: string) => {
		// const response: any = await API.graphql(
		//   graphqlOperation(createList, {
		//     input: {
		//       name: listName,
		//       groupId: groupname,
		//       tenants: [groupname],
		//     },
		//   })
		// );
		// const newOption = createOption({
		//   label: listName,
		//   value: response?.data.createList?.id,
		// });
		// setSelectedLists((prevList) => [...prevList, newOption]);
		// return response?.data.createList?.id;
	};

	const onSelectList = (options: MultiSelectOption[]) => {
		setSelectedLists(options);
	};

	const unlockSelectedContacts = async () => {
		setDropdownError('');

		const totalSelected = contacts.filter((contact) => contact.isSelected).length;

		if (totalSelected === 0) {
			notifyError(new Error('No records selected to add to list!'));
			return;
		}

		if (selectedLists.length === 0) {
			setDropdownError('No list selected to add contacts!');
			return;
		}

		if (selectedLists.length >= 10) {
			setDropdownError('Maximum of 10 list can be selected!');
			return;
		}

		notifySuccessListAndExport(`Adding contacts to list`, 0, selectedLists.length, 'Prcocessing');

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
			setLoading(true);

			try {
				const operations: any[] = [];

				for (let sl = 0; sl < selectedLists.length; sl++) {
					for (let i = 0; i < sourceContacts.length; i++) {
						let contact = sourceContacts[i];

						// Create contact item specific to the team
						// ID should be {{contact pid}}-{{team id}}
						if (!contact.id) {
							// const operation = graphqlOperation(createContact, {
							// 	input: {
							// 		...contact,
							// 		...{
							// 			id: contact.ruid + '-' + groupname,
							// 			groupId: groupname,
							// 			tenants: [groupname],
							// 			// remove following fields
							// 			isSelected: undefined,
							// 		},
							// 	},
							// });
							// await API.graphql(operation);
						}

						const listId = selectedLists[sl].value;
						// const operation = graphqlOperation(createListContact, {
						// 	input: {
						// 		id: listId + '-' + contact.ruid,
						// 		listId,
						// 		contactId: contact.ruid + '-' + groupname,
						// 		groupId: groupname,
						// 		tenants: [groupname],
						// 	},
						// });
						// operations.push(operation);
					}
				}

				// await Promise.allSettled(
				// 	operations.map((opr, index) =>
				// 		throttleQ<any>(() => {
				// 			if (index === operations.length - 1) {
				// 				onToggle();
				// 				setSelectedLists([]);
				// 				setLoading(false);
				// 			}
				// 			notifySuccessListAndExport(`Added ${index + 1} contact to list`, index + 1, sourceContacts.length, 'Processing');
				// 			return API.graphql(opr);
				// 		})
				// 	)
				// );
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
				// const pids = sourceContacts.map((item) => item.id).filter((id) => id?.trim()?.length);
				// const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
				// const options = {
				// 	body: {
				// 		ruids: Array.from(new Set(ruids)),
				// 		groupId: user?.attributes['custom:group_name'],
				// 		userId: user?.attributes.sub,
				// 	},
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		Authorization: `Bearer ${idToken}`,
				// 	},
				// };
				// const fullContacts = await API.post('nymblrRestApi', '/api/contact-details', options);
				// notifySuccess(`${options.body.ruids.length} contacts unlocked`);
				// -------------------------------------------------------------
				// Update contacts with unlocked info
				// -------------------------------------------------------------
				// let existingContacts = [...(sourceContacts || [])];
				// for (let i = 0; i < fullContacts.length; i++) {
				// 	const index = existingContacts.findIndex((item) => item.pid && item.pid === fullContacts[i].pid);
				// 	if (index === -1) {
				// 		continue;
				// 	}
				// 	existingContacts[index] = {
				// 		...fullContacts[i],
				// 		isSelected: existingContacts[index].isSelected,
				// 	};
				// }
				// -------------------------------------------------------------
				// Update current selection with unlocked info
				// -------------------------------------------------------------
				// // All
				// if (selectedAction === ActionList.All) {
				// 	existingContacts = [...(existingContacts || [])];
				// }
				// // Current page
				// if (selectedAction === ActionList.CurrentPage) {
				// 	const displayItemsIds = fullContacts.map((cont: any) => cont.id);
				// 	existingContacts = (existingContacts || []).filter((item) => displayItemsIds.includes(item.id));
				// }
				// // No selection
				// if (selectedAction === '') {
				// 	existingContacts = (existingContacts || []).filter((item) => item.isSelected);
				// }
				// -------------------------------------------------------------
				// Create contacts specific to the team members
				// Add the contacts to the specified lists
				// -------------------------------------------------------------
				// const operations: any[] = [];
				// for (let sl = 0; sl < selectedLists.length; sl++) {
				// 	for (let i = 0; i < existingContacts.length; i++) {
				// 		let contact = existingContacts[i];
				// 		if (!contact.id) {
				// 			const operation = graphqlOperation(createContact, {
				// 				input: {
				// 					...contact,
				// 					...{
				// 						id: contact.ruid + '-' + groupname,
				// 						groupId: groupname,
				// 						tenants: [groupname],
				// 						// remove following fields
				// 						isSelected: undefined,
				// 					},
				// 				},
				// 			});
				// 			await API.graphql(operation);
				// 		}
				// 		const listId = selectedLists[sl].value;
				// 		const operation = graphqlOperation(createListContact, {
				// 			input: {
				// 				id: listId + '-' + contact.ruid,
				// 				listId,
				// 				contactId: contact.ruid + '-' + groupname,
				// 				groupId: groupname,
				// 				tenants: [groupname],
				// 			},
				// 		});
				// 		operations.push(operation);
				// 	}
				// }
				// -------------------------------------------------------------
				// Use batches to perform the above operations
				// Create team specific contacts
				// Add the contacts to the specified lists
				// -------------------------------------------------------------
				// await Promise.allSettled(
				// 	operations.map((opr, index) =>
				// 		throttleQ<any>(() => {
				// 			if (index === operations.length - 1) {
				// 				onSuccess(fullContacts);
				// 				onToggle();
				// 				setSelectedLists([]);
				// 				setLoading(false);
				// 			}
				// 			notifySuccessListAndExport(`Added ${index + 1} contacts to list`, index + 1, sourceContacts.length, 'Processing');
				// 			return API.graphql(opr);
				// 		})
				// 	)
				// );
			} catch (err) {
				notifyError(err);
				setLoading(false);
			}
		}

		// All done
		notifySuccessListAndExport(`Added ${sourceContacts.length} contacts to list`, sourceContacts.length, sourceContacts.length, 'Completed');
	};

	const listItemOptions: MultiSelectOption[] = listItems.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	return (
		<>
			{isActive ? <div className="is-overlay" onClick={onToggle}></div> : null}
			<div className={classNames('dropdown', { 'is-active': isActive })}>
				<div className="dropdown-trigger is-flex is-justify-content-center is-align-items-center">
					<FormButtonNew
						onClick={onToggle}
						// variant={['is-outlined']}
						// color="is-primary"
						className="is-flex-direction-row-reverse mr-5 pl-5-1"
						icon={
							<span className="pr-6 is-flex is-justify-content-center is-align-items-center">
								<IconPlusComponent height={16} width={16} />
							</span>
						}
					>
						List
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
										selected={selectedLists}
										options={listItemOptions}
										onCreateNew={onCreateList}
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
