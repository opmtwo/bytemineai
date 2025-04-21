import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineUser } from '../../../types';
import Modal from '../../modals/Modal';
import UserForm from '../../UserForm';
import UserItems from './UserItems';

const SectionMyTeam = () => {
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			return;
		}
		isMounted.current = true;
		userOnRead();
	}, []);

	// crud context
	const {
		isBusy: userIsBusy,
		error: userError,
		items: userItems,
		onRead: userOnRead,
		activeItem: userActiveItem,
		isFormActive: userIsFormActive,
		onFormCancel: userOnFormCancel,
		onAdd: onUserAdd,
		onEdit: onUserEdit,
	} = useCrudContext<IBytemineUser>();

	const router = useRouter();

	// const canAddNewUsers = settings?.['custom:seats'] && accountItems.length && parseInt(settings?.['custom:seats']) > accountItems.length ? true : false;

	return (
		<>
			<UserItems />

			<Modal isActive={userIsFormActive} onCancel={userOnFormCancel}>
				<UserForm />
			</Modal>
		</>
	);
};

export default SectionMyTeam;
