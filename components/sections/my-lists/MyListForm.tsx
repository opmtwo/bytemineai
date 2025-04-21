import { FormEvent, useEffect, useState } from 'react';

import { genericErrorMessage } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineCollection, List } from '../../../types';
import Card from '../../cards/Card';
import CardTitle from '../../CardTitle';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import IconClose from '../../icons/IconClose';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';
import { isLength } from 'validator';
import { callApi } from '../../../utils/helper-utils';

const MyListForm = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	const [id, setId] = useState('');

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<Error>();

	// const { attributes } = useAuthContext();
	// const groupname = attributes?.['custom:group_name'];

	// crud context
	const {
		isBusy: collectionIsBusy,
		error: collectionError,
		formErrors: collectionFormErrors,
		activeItem: collectionActiveItem,
		onCreate: collectionOnCreate,
		onUpdate: collectionOnUpdate,
		onFormCancel: onCollectionFormCancel,
	} = useCrudContext<IBytemineCollection>();

	useEffect(() => {
		loadFormData();
	}, [collectionActiveItem]);

	const loadFormData = async () => {
		if (!collectionActiveItem?.id) {
			resetForm();
			return;
		}
		setId(collectionActiveItem.id);
		setName(collectionActiveItem.name);
	};

	const resetForm = async () => {
		setId('');
		setName('');
	};

	const getFormData = () =>
		({
			name,
		} as Partial<IBytemineCollection>);

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = (await isLength(name.trim(), { min: 2 })) ? undefined : new Error(`Name is required and must be at least 2 characters.`);
		isValid = err ? false : isValid;
		setNameError(err);

		if (isValid) {
			const available = (await callApi(null, `api/v1/collections/available?name=${name}`, {})) as { id?: string };
			err = !available.id || available.id === id ? undefined : new Error(`Name already in use.`);
			isValid = err ? false : isValid;
			setNameError(err);
		}

		return isValid;
	};

	const onSuccess = async (value: IBytemineCollection) => {
		// const asPath = `/help/${value.id}/edit`;
		// if (router.asPath !== asPath) {
		// 	router.push(asPath);
		// }
		return value;
	};

	const create = async () => {
		await collectionOnCreate(getFormData() as Partial<IBytemineCollection>, {}, {}, {}, onSuccess);
		window.dispatchEvent(new Event('logs.refresh'));
	};

	const update = async () => {
		await collectionOnUpdate(getFormData(), {}, {}, {}, onSuccess);
		window.dispatchEvent(new Event('logs.refresh'));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsBusy(true);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		id ? await update() : await create();
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<Card>
				<Slot slot="header">
					<CardTitle>{id ? 'Edit List' : 'New List'}</CardTitle>
					<span className="is-clickable" onClick={onCollectionFormCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput
							name="name"
							type="search"
							label="List Name"
							value={name}
							onChange={setName}
							placeholder="Enter name of your list"
							isLast={true}
							error={nameError || collectionFormErrors?.['name']}
						/>
						<ErrorNotificaition error={collectionError} />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton variant={['is-outlined', 'is-ui-button']} disabled={isBusy} loading={isBusy} type="submit">
						{id ? 'Update' : 'Create'}
					</FormButton>
				</Slot>
			</Card>
		</form>
	);
};

export default MyListForm;
