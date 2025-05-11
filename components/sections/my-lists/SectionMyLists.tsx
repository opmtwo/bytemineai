import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineCollection, IBytemineContact } from '../../../types';
import Breadcrumb from '../../Breadcrumb';
import ExportContacts from '../../ExportContacts';
import LoaderFullscreen from '../../LoaderFullscreen';
import Modal from '../../modals/Modal';
import TrialNotice from '../../TrialNotice';
import MyListForm from './MyListForm';
import MyListItems from './MyListItems';

const SectionMyLists = () => {
	const isMounted = useRef(false);

	const [isBusy, setIsBusy] = useState(false);

	const [activeContacts, setActiveContacts] = useState<IBytemineContact[]>([]);
	const [isExportModalActive, setIsExportModalActive] = useState(false);

	useEffect(() => {
		if (isMounted.current) {
			return;
		}
		isMounted.current = true;
		collectionOnRead();
	}, []);

	// crud context
	const {
		isBusy: collectionIsBusy,
		error: collectionError,
		items: collectionItems,
		onRead: collectionOnRead,
		activeItem: collectionActiveItem,
		isFormActive: isCollectionFormActive,
		onFormCancel: onCollectionFormCancel,
		onAdd: onCollectionAdd,
		onEdit: onCollectionEdit,
	} = useCrudContext<IBytemineCollection>();

	const router = useRouter();

	const onCustomize = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	};

	const isTrailAccount = true;

	const { attributes } = useAuthContext();
	const groupname = attributes?.['custom:group_name'];

	const onExport = (items: IBytemineContact[]) => {
		const contactItems: IBytemineContact[] = [];
		for (let i = 0; i < items.length; i++) {
			if (!items[i]?.pid) {
				continue;
			}
			contactItems.push(items[i]);
		}
		setActiveContacts(contactItems);
		setIsExportModalActive(true);
	};

	const onExportSubmit = () => setIsExportModalActive(false);

	const onExportCancel = () => setIsExportModalActive(false);

	return (
		<>
			{collectionIsBusy ? <LoaderFullscreen /> : null}

			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : <div></div>}

			<Breadcrumb title="My Lists" items={[{ label: 'My Lists', href: '/my-lists', isCurrent: true }]} />

			<MyListItems onExport={onExport} />

			<Modal isActive={isCollectionFormActive} onCancel={onCollectionFormCancel}>
				<MyListForm />
			</Modal>

			<ExportContacts contacts={activeContacts} isActive={isExportModalActive} onSubmit={onExportSubmit} onCancel={onExportCancel} />
		</>
	);
};

export default SectionMyLists;
