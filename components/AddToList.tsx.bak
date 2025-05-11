import { FormEvent, MouseEvent, useState } from 'react';
import { v4 } from 'uuid';
import API, { graphqlOperation } from '@aws-amplify/api';
import Modal from './modals/Modal';
import Card from './cards/Card';
import Slot from './Slot';
import CardTitle from './CardTitle';
import Loader from './Loader';
import EmptyMsg from './EmptyMsg';
import IconClose from './icons/IconClose';
import { Contact, List } from '../types';
import FormInput from './form/FormInput';
import FormButton from './form/FormButton';
import AddToListItems from './AddToListItems';
import { createList, createContact, createListContact } from '../src/graphql/mutations';
import ErrorNotificaition from './notifications/ErrorNotification';
import { genericErrorMessage } from '../consts';
import { useAuthContext } from '../providers/auth-data-provider';

const AddToList = ({
	isActive,
	listItems,
	contactItems,
	isBusy,
	onSubmit,
	onCancel,
}: {
	isActive: boolean;
	listItems: List[];
	contactItems: Contact[];
	isBusy: boolean;
	onSubmit: () => void;
	onCancel: () => void;
}) => {
	const [error, setError] = useState<Error>();
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<Error>();
	const [isFormBusy, setIsFormBusy] = useState(false);

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];
	// console.log({ groupname });

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = name && name.trim().length ? undefined : new Error('Invalid name');
		isValid = err ? false : isValid;
		setNameError(err);

		return isValid;
	};

	const createNewList = async () => {
		try {
			const response: any = await API.graphql(
				graphqlOperation(createList, {
					input: {
						name,
						groupId: groupname,
						tenants: [groupname],
					},
				})
			);
			return response?.data.createList?.id;
		} catch (err) {
			console.log('Error while creating new list', err);
			setError(err);
		}
	};

	/**
	 * @summary
	 * Try and save contact model
	 *
	 * @description
	 * This will fail when an existing contact already exists
	 * This is much fater than looking up models and then creting new ones
	 *
	 * @param contact Contact data - from RampedUp API
	 * @returns ContactModel
	 */
	const saveContact = async (contact: Contact) => {
		const operation = graphqlOperation(createContact, {
			input: {
				...contact,
				...{
					id: contact.ruid + '-' + groupname,
					groupId: groupname,
					tenants: [groupname],
					// remove following fields
					isSelected: undefined,
				},
			},
		});
		try {
			const response: any = await API.graphql(operation);
			return response?.data?.createContact;
		} catch (err) {
			console.log('Error saving contact', err);
		}
	};

	const addContactsToList = async (listId: string) => {
		let promises: any = [];
		for (let i = 0; i < contactItems.length; i++) {
			let contact = contactItems[i];
			if (!contact.id) {
				await saveContact(contact);
			}
			const operation = graphqlOperation(createListContact, {
				input: {
					id: listId + '-' + contact.ruid,
					listId,
					contactId: contact.ruid + '-' + groupname,
					groupId: groupname,
					tenants: [groupname],
				},
			});
			promises.push(API.graphql(operation));
		}
		return Promise.allSettled(promises);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFormBusy(true);
		if (!(await isFormValid())) {
			setIsFormBusy(false);
			return;
		}
		setError(undefined);
		const id = await createNewList();
		if (!id) {
			setIsFormBusy(false);
			return;
		}
		try {
			await addContactsToList(id);
		} catch (err) {
			setError(new Error(genericErrorMessage));
			setIsFormBusy(false);
			return;
		}
		onSubmit && onSubmit();
	};

	const onAddToExistingList = async (list: List) => {
		setIsFormBusy(true);
		try {
			await addContactsToList(list.id);
		} catch (err) {
			setError(new Error(genericErrorMessage));
			setIsFormBusy(false);
			return;
		}
		setIsFormBusy(false);
		onSubmit && onSubmit();
	};

	return (
		<Modal isActive={isActive} onCancel={onCancel}>
			<form method="POST" onSubmit={handleSubmit}>
				<Card>
					<Slot slot="header">
						<CardTitle>Add Contact to New List</CardTitle>
						<span className="is-clickable" onClick={onCancel}>
							<IconClose />
						</span>
					</Slot>
					<Slot slot="body">
						<div className="panel-block is-align-items-flex-end">
							<div className="is-flex-grow-1 mr-5">
								<FormInput
									label="Add to New List"
									placeholder="Enter name for your list"
									name="name"
									value={name}
									error={nameError}
									onChange={setName}
									required={true}
									disabled={isBusy}
								/>
								<ErrorNotificaition error={error} />
							</div>
							<div className="is-flex-shrink-1">
								<FormButton
									variant={['is-outlined', 'is-ui-button']}
									disabled={isFormBusy}
									loading={isFormBusy}
									type="submit"
								>
									Add
								</FormButton>
							</div>
						</div>
						<div className="panel-block is-block">
							<CardTitle>Add Contact to Existing List</CardTitle>
						</div>
						{isBusy && !listItems.length ? <Loader /> : null}
						{listItems.length === 0 && !isBusy ? <EmptyMsg msg="No existing list found" /> : null}
						<AddToListItems listItems={listItems} onClick={onAddToExistingList} />
					</Slot>
				</Card>
			</form>
		</Modal>
	);
};

export default AddToList;
