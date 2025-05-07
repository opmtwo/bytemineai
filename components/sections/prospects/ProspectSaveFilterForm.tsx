import { FormEvent, useEffect, useState } from 'react';

import { FilterModel, IBytemineFilter } from '../../../types';
import { callApi } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardTitle from '../../CardTitle';
import FormButtonNew from '../../form/FormButtonNew';
import FormInput from '../../form/FormInput';
import IconClose from '../../icons/IconClose';
import Modal from '../../Modal';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';

const ProspectSaveFilterForm = ({
	isActive,
	item,
	filter,
	onCreate,
	onUpdate,
	onCancel,
}: {
	isActive: boolean;
	item?: FilterModel;
	filter?: IBytemineFilter;
	onCreate: (filter: FilterModel) => void;
	onUpdate: (filter: FilterModel) => void;
	onCancel: () => void;
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<Error>();

	useEffect(() => {
		if (!item) {
			setId('');
			setName('');
			return;
		}
		setId(item.id);
		setName(item.name);
	}, [item]);

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = name && name.trim().length ? undefined : new Error('Invalid name');
		isValid = err ? false : isValid;
		setNameError(err);

		return isValid;
	};

	const getFormData = (): Partial<FilterModel> => ({
		name,
		filter: JSON.stringify(filter) as any,
		isSaved: true,
	});

	const create = async () => {
		try {
			const input = await getFormData();
			const res = (await callApi(null, '/api/v1/filters', {
				method: 'POST',
				body: JSON.stringify(input),
			})) as FilterModel;
			await onCreate(res);
		} catch (err) {
			console.log('create - err', err);
		}
	};

	const update = async () => {
		try {
			const input = await getFormData();
			const res = (await callApi(null, `/api/v1/filters/${item?.id}`, {
				method: 'PUT',
				body: JSON.stringify(input),
			})) as FilterModel;
			await onUpdate(res);
		} catch (err) {
			console.log('update - err', err);
		}
	};

	const onSubmit = async (e: FormEvent) => {
		setIsBusy(true);
		e.preventDefault();
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		setError(undefined);
		id ? await update() : await create();
		setIsBusy(false);
	};

	return (
		<Modal isActive={isActive} onCancel={onCancel}>
			<form method="POST" onSubmit={onSubmit}>
				<Card>
					<Slot slot="header">
						<CardTitle>{id ? 'Update Filter' : 'Save Filter'}</CardTitle>
						<span className="is-clickable" onClick={onCancel}>
							<IconClose />
						</span>
					</Slot>
					<Slot slot="body">
						<div className="panel-block is-block">
							<FormInput
								name="name"
								type="text"
								label="Filter Name"
								value={name}
								onChange={setName}
								placeholder="Enter name of filter"
								isLast={true}
								error={nameError}
							/>
							<ErrorNotificaition error={error} />
						</div>
					</Slot>
					<Slot slot="footer">
						<FormButtonNew
							// variant={['is-outlined', 'is-ui-button']}
							disabled={isBusy}
							loading={isBusy}
							type="submit"
						>
							{id ? 'Update' : 'Save'}
						</FormButtonNew>
					</Slot>
				</Card>
			</form>
		</Modal>
	);
};

export default ProspectSaveFilterForm;
