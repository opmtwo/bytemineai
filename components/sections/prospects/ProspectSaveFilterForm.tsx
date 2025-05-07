import { FormEvent, useEffect, useState } from 'react';

import { FilterModel, IBytemineFilter } from '../../../types';
import Card from '../../Card';
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
	onCreate: Function;
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

	const getInput = () => {
		// let operation = createFilter;
		// let operationName = 'createFilter';
		// let input = {
		// 	name,
		// 	userId: user?.attributes.sub,
		// 	groupId: groupname,
		// 	tenants: [groupname],
		// 	rampedUpFilter: JSON.stringify(filter),
		// 	savedFilter: true
		// };
		// if (id) {
		// 	operation = updateFilter;
		// 	operationName = 'updateFilter';
		// 	input = { ...input, ...{ id } };
		// }
		// return { operation, operationName, input };
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if ((await isFormValid()) !== true) {
			return;
		}
		// setError(undefined);
		// setIsBusy(true);
		// const { operation, operationName, input } = getInput();
		// let response: any;
		// try {
		// 	response = await API.graphql(graphqlOperation(operation, { input }));
		// 	id ? await onUpdate(response.data[operationName]) : await onCreate(response.data[operationName]);
		// } catch (err) {
		// 	console.log(`Error in ${operationName} - ${JSON.stringify(err, null, 2)}`);
		// 	setError(new Error(genericErrorMessage));
		// }
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
