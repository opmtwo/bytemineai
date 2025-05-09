import { FormEvent, useState } from 'react';

import { BATCH_SIZE, genericErrorMessage } from '../../../consts';
import { IBytemineCollection, IBytemineCollectionContact, IBytemineContact } from '../../../types';
import { callApi } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardTitle from '../../CardTitle';
import EmptyMsg from '../../EmptyMsg';
import FormButtonNew from '../../form/FormButtonNew';
import FormInput from '../../form/FormInput';
import IconClose from '../../icons/IconClose';
import Loader from '../../Loader';
import Modal from '../../Modal';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';
import ProspectAddToCollectionItems from './ProspectAddToCollectionItems';

const ProspectAddToCollection = ({
	isActive,
	listItems,
	contactItems,
	isBusy,
	onSubmit,
	onCancel,
}: {
	isActive: boolean;
	listItems: IBytemineCollection[];
	contactItems: IBytemineContact[];
	isBusy: boolean;
	onSubmit: () => void;
	onCancel: () => void;
}) => {
	const [error, setError] = useState<Error>();
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<Error>();
	const [isFormBusy, setIsFormBusy] = useState(false);

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = name && name.trim().length ? undefined : new Error('Invalid name');
		isValid = err ? false : isValid;
		setNameError(err);

		return isValid;
	};

	const createNewCollection = async () => {
		try {
			const collection = (await callApi(null, '/api/v1/collections', {
				method: 'POST',
				body: JSON.stringify({ name }),
			})) as IBytemineCollection;
			console.log('createNewCollection - success', { collection });
			return collection;
		} catch (err) {
			console.log('createNewCollection - error', err);
			setError(err);
		}
	};

	const saveContact = async (contact: IBytemineContact) => {
		try {
			const response = (await callApi(null, '/api/v1/contacts', {
				method: 'POST',
				body: JSON.stringify(contact),
			})) as IBytemineContact;
			console.log('createNewCollection - success', { response });
			return response;
		} catch (err) {
			console.log('createNewCollection - error', err);
			setError(err);
		}
	};

	const saveCollectionContact = async (collectionId: string, pid: string) => {
		try {
			const response = (await callApi(null, `/api/v1/collections/${collectionId}/contacts`, {
				method: 'POST',
				body: JSON.stringify({ pids: [pid] }),
			})) as IBytemineCollectionContact;
			console.log('saveCollectionContact - success', { response });
			return response;
		} catch (err) {
			console.log('saveCollectionContact - error', err);
			setError(err);
		}
	};

	const addContactsToCollection = async (collectionId: string) => {
		let promises: any = [];
		let results: any[] = [];

		for (let i = 0; i < contactItems.length; i++) {
			const callback = async () => {
				let contact = contactItems[i];
				if (!contact.id) {
					await saveContact(contact);
				}
				await saveCollectionContact(collectionId, contact.pid);
			};
			promises.push(callback());

			// Clean queue
			if (promises.length > BATCH_SIZE) {
				results = results.concat(await Promise.allSettled(promises));
				promises = [];
			}
		}

		// Clean remaining queue
		results = results.concat(await Promise.allSettled(promises));

		return results;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFormBusy(true);
		
		const isValid = await isFormValid();
		if (!isValid) {
			setIsFormBusy(false);
			return;
		}

		setError(undefined);
		const newCollection = await createNewCollection();
		if (!newCollection?.id) {
			setIsFormBusy(false);
			return;
		}

		try {
			await addContactsToCollection(newCollection.id);
			setName('');
		} catch (err) {
			setError(new Error(genericErrorMessage));
			setIsFormBusy(false);
			return;
		}

		onSubmit && onSubmit();
		setIsFormBusy(false);
	};

	const onAddToExistingList = async (list: IBytemineCollection) => {
		setIsFormBusy(true);
		try {
			await addContactsToCollection(list.id);
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
								<FormButtonNew disabled={isFormBusy} loading={isFormBusy} type="submit">
									Add
								</FormButtonNew>
							</div>
						</div>
						<div className="panel-block is-block">
							<CardTitle>Add Contact to Existing List</CardTitle>
						</div>
						{isBusy && !listItems.length ? <Loader /> : null}
						{listItems.length === 0 && !isBusy ? <EmptyMsg msg="No existing list found" /> : null}
						<ProspectAddToCollectionItems listItems={listItems} onClick={onAddToExistingList} />
					</Slot>
				</Card>
			</form>
		</Modal>
	);
};

export default ProspectAddToCollection;
