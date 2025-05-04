import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import { CognitoUserData, Contact, IBytemineCollection, List, ListContactModel, UserAttributes } from '../../../types';
import { parseCognitoUser } from '../../../utils/user-utils';
import Breadcrumb from '../../Breadcrumb';
import Card from '../../cards/Card';
import CardTitle from '../../CardTitle';
import ExportContacts from '../../ExportContacts';
import FormButton from '../../form/FormButton';
import IconClose from '../../icons/IconClose';
import Modal from '../../modals/Modal';
import QueryLoader from '../../QueryLoader';
import Slot from '../../Slot';
import TrialNotice from '../../TrialNotice';
import UsersLoaderNonAdmin from '../../UsersLoaderNonAdmin';
import MyListForm from './MyListForm';
import MyListItems from './MyListItems';

const SectionMyLists = () => {
	const isMounted = useRef(false);

	const [isBusy, setIsBusy] = useState(false);

	const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
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

	const { settings, canUpgrade } = useSettingsContext();

	const onCustomize = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	};

	const isTrailAccount = canUpgrade;

	const { attributes } = useAuthContext();
	const groupname = attributes?.['custom:group_name'];

	const onExport = (items: ListContactModel[]) => {
		const contactItems: Contact[] = [];
		for (let i = 0; i < items.length; i++) {
			if (!items[i]?.contact?.ruid) {
				continue;
			}
			contactItems.push(items[i].contact as Contact);
		}
		setActiveContacts(contactItems);
		setIsExportModalActive(true);
	};

	const onExportSubmit = () => setIsExportModalActive(false);

	const onExportCancel = () => setIsExportModalActive(false);

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : <div></div>}

			<Breadcrumb title="My Lists" items={[{ label: 'My Lists', href: '/my-lists', isCurrent: true }]} />

			<MyListItems onExport={onExport} />

			<Modal isActive={isCollectionFormActive} onCancel={onCollectionFormCancel}>
				<MyListForm />
			</Modal>

			<ExportContacts contacts={activeContacts} isActive={isExportModalActive} onSubmit={onExportSubmit} onCancel={onExportCancel} />

			{/* {groupname && <UsersLoaderNonAdmin onLoad={onLoad} isBusy={isBusy} onBusy={setIsBusy} groupname={groupname} nextToken={nextToken} />} */}

			{/* <Modal isActive={isDeleteModalActive} onCancel={onCancelDeleteModal}>
				<Card>
					<Slot slot="header">
						<CardTitle>Delete List</CardTitle>
						<span className="is-clickable" onClick={onCancelDeleteModal}>
							<IconClose />
						</span>
					</Slot>
					<Slot slot="body">
						<div className="panel-block is-align-items-flex-end">
							<div className="is-flex-grow-1 mr-5">Are you sure you want to delete this list?</div>
						</div>
					</Slot>
					<Slot slot="footer">
						<div className="is-flex-shrink-1">
							<FormButton
								variant={['is-outlined', 'is-ui-button']}
								onClick={(e: any) => {
									onDeleteList();
								}}
								disabled={isDeleteFormBusy}
								loading={isDeleteFormBusy}
								type="submit"
							>
								Delete List
							</FormButton>
						</div>
					</Slot>
				</Card>
			</Modal> */}
		</>
	);
};

export default SectionMyLists;
