import { useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { List } from '../../../types';
import Card from '../../cards/Card';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Slot from '../../Slot';
import { createList, updateList } from '../../../src/graphql/mutations';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import IconClose from '../../icons/IconClose';
import { useAuthContext } from '../../../providers/auth-data-provider';
import CardTitle from '../../CardTitle';

const MyListForm = ({ item, onCreate, onUpdate, onCancel }: { item?: List; onCreate: Function; onUpdate: Function; onCancel?: Function }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [id, setId] = useState('');
	const [name, setName] = useState('');

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	useEffect(() => {
		if (!item) {
			setId('');
			setName('');
			return;
		}
		setId(item.id);
		setName(item.name);
	}, [item]);

	const getInput = () => {
		let operation = createList;
		let operationName = 'createList';
		let input = {
			name,
			tenants: [groupname],
		};
		if (id) {
			operation = updateList;
			operationName = 'updateList';
			input = { ...input, ...{ id } };
		}
		return { operation, operationName, input };
	};

	const onSave = async () => {
		setIsBusy(true);
		const { operation, operationName, input } = getInput();
		let response: any;
		try {
			console.log({ input });
			response = await API.graphql(graphqlOperation(operation, { input }));
			(await id) ? onUpdate(response.data[operationName]) : onCreate(response.data[operationName]);
		} catch (err) {
			console.log(`Error in ${operationName} - ${JSON.stringify(err, null, 2)}`);
			setError(err);
		}
		setIsBusy(false);
	};

	return (
		<Card>
			<Slot slot="header">
				<CardTitle>New List</CardTitle>
				<FormButton variant={['is-inverted', 'is-icon', 'is-rounded']} icon={<IconClose />} onClick={onCancel} />
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
					/>
					<ErrorNotificaition error={error} />
				</div>
			</Slot>
			<Slot slot="footer">
				<FormButton variant={['is-outlined', 'is-ui-button']} onClick={onSave} disabled={isBusy} loading={isBusy}>
					Save Search
				</FormButton>
			</Slot>
		</Card>
	);
};

export default MyListForm;
