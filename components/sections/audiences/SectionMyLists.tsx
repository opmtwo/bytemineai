import { useState } from 'react';
import { CognitoUserData, Contact, List, ListContactModel, UserAttributes } from '../../../types';
import QueryLoader from '../../QueryLoader';
import { listAudiencesByGroupId, listListsByGroupId } from '../../../src/graphql/queries';
import MyListItems from './MyListItems';
import Modal from '../../modals/Modal';
import MyListForm from './MyListForm';
import ExportContacts from '../../ExportContacts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { parseCognitoUser } from '../../../utils/user-utils';
import UsersLoaderNonAdmin from '../../UsersLoaderNonAdmin';
import TrialNotice from '../../TrialNotice';
import { useSettingsContext } from "../../../providers/settings-provider";
import { useRouter } from 'next/router';
import API, { graphqlOperation } from '@aws-amplify/api';
import { deleteAudience } from '../../../src/graphql/mutations';
import Card from '../../cards/Card';
import Slot from '../../Slot';
import CardTitle from '../../CardTitle';
import FormButton from '../../form/FormButton';
import IconClose from '../../icons/IconClose';

const SectionMyLists = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [listItems, setListItems] = useState<List[]>([]);
	const [isModalActive, setIsModalActive] = useState(false);
	const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
	const [isExportModalActive, setIsExportModalActive] = useState(false);
	const [accountItems, setAccountItems] = useState<UserAttributes[]>([]);
	const [nextToken, setNextToken] = useState<string>();
	const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
	const [isDeleteFormBusy, setIsDeleteFormBusy] = useState(false)
	const [deleteListId, setDeleteListId] = useState(null)

	const router = useRouter();
	const { settings, canUpgrade } = useSettingsContext();
	const onCustomize = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	}
	const isTrailAccount = canUpgrade;

	const { user, groups } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	const onAdd = () => {
		setIsModalActive(true);
	};

	const onNew = () => {
		setIsModalActive(true);
	};

	const onCancel = () => {
		setIsModalActive(false);
	};

	const onCreate = (entry: List) => {
		setListItems([entry, ...listItems]);
		setIsModalActive(false);
	};

	const onUpdate = (entry: List) => {
		const index = listItems.findIndex((item) => item.id === entry.id);
		if (index !== -1) {
			const newItems = [...listItems];
			newItems[index] = entry;
			setListItems(newItems);
		} else {
			setListItems([entry, ...listItems]);
		}
		setIsModalActive(false);
	};

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

	const onLoad = (users: CognitoUserData[], token?: string) => {
		const newUsers: UserAttributes[] = users.map((data) => parseCognitoUser(data));
		setAccountItems([...newUsers, ...accountItems]);
		setNextToken(token);
	};

	const onDelete = (items: any) => {
		setDeleteListId(items?.id)
		setIsDeleteModalActive(true)
	}
	const onDeleteList = async () => {
		try {
			setIsDeleteFormBusy(true)
			let response: any;
			response = await API.graphql(graphqlOperation(deleteAudience, {
				input: {
					id: deleteListId,
				},
			}));
			console.log(response)
			if (response) {
				router.reload()
				setIsDeleteModalActive(false)
				setDeleteListId(null)
				setIsDeleteFormBusy(true)

			}
		} catch (err) {
			console.log('ERROR', err);
		}
	}

	const onCancelDeleteModal = () => {
		setIsDeleteModalActive(false)
	}

	return (
		<>
			{isTrailAccount ? (
				<TrialNotice onCustomize={onCustomize} />
			) : (<div></div>)}
			<MyListItems items={listItems} isBusy={isBusy} onAdd={onAdd} onNew={onNew} onExport={onExport} users={accountItems} onDelete={onDelete} />
			{groupname ? (
				<QueryLoader
					onLoad={setListItems}
					query={listAudiencesByGroupId}
					rootKey="listAudiencesByGroupId"
					dataKey="items"
					onBusyToggle={setIsBusy}
					options={{ groupId: groupname }}
				/>
			) : null}
			<Modal isActive={isModalActive} onCancel={onCancel}>
				<MyListForm onCreate={onCreate} onUpdate={onUpdate} onCancel={onCancel} />
			</Modal>
			<ExportContacts
				contacts={activeContacts}
				isActive={isExportModalActive}
				onSubmit={onExportSubmit}
				onCancel={onExportCancel}
			/>
			{groupname && (
				<UsersLoaderNonAdmin
					onLoad={onLoad}
					isBusy={isBusy}
					onBusy={setIsBusy}
					groupname={groupname}
					nextToken={nextToken}
				/>
			)}
			<Modal isActive={isDeleteModalActive} onCancel={onCancelDeleteModal}>
				<Card>
					<Slot slot="header">
						<CardTitle>Delete Audiences</CardTitle>
						<span className="is-clickable" onClick={onCancelDeleteModal}>
							<IconClose />
						</span>
					</Slot>
					<Slot slot="body">
						<div className="panel-block is-align-items-flex-end">
							<div className="is-flex-grow-1 mr-5">
								Are you sure you want to delete this audience?
							</div>
						</div>
					</Slot>
					<Slot slot="footer">
						<div className="is-flex-shrink-1">
							<FormButton
								variant={['is-outlined', 'is-ui-button']}
								onClick={(e: any) => { onDeleteList() }}
								disabled={isDeleteFormBusy}
								loading={isDeleteFormBusy}
								type="submit"
							>
								Delete List
							</FormButton>
						</div>
					</Slot>
				</Card>
			</Modal>
		</>
	);
};

export default SectionMyLists;