import { motion } from 'framer-motion';
import { uniqBy } from 'lodash';
import { useEffect, useState } from 'react';
import { listListContactsByListId } from '../../../src/graphql/queries';
import {Audience, List, ListContactModel, UserAttributes} from '../../../types';
import Anchor from '../../Anchor';
import FormButton from '../../form/FormButton';
import IconAdd from '../../icons/IconAdd';
import IconDownload from '../../icons/IconDownload';
import Loader from '../../Loader';
import QueryLoader from '../../QueryLoader';
import {useRouter} from "next/router";
import IconDelete from '../../icons/IconDelete';

const MyListEntry = ({
	item,
	users = [],
	isListMode = false,
	onAdd,
	onExport,
	onDelete
}: {
	item: Audience;
	users: UserAttributes[];
	isListMode?: boolean;
	onAdd: Function;
	onExport: (listContacts: ListContactModel[]) => void;
	onDelete:(listContacts: any) => void;
}) => {
	const [listContactItems, setListContactItems] = useState<ListContactModel[]>([]);
	const [isContactsLoading, setIsContactsLoading] = useState(false);
	const [owner, setOwner] = useState<UserAttributes>();
	const router = useRouter();
	const uniqueContacts = uniqBy(listContactItems.filter(item => item.contact?.ruid), 'contactId');
	const onClickDelete = ()=> onDelete(item)
	const handleExport = () => {
		null;
	};

	useEffect(() => {
		const user = users.find((userItem) => userItem.sub === item.owner);
		if (user) {
			setOwner(user);
		}
	}, [users, item]);

	const numberOfContacts = (
		<span className="has-text-weight-normal">
			{item.expectedCount} contacts
		</span>
	);

	const fullName = (
		<span className="has-text-primary">
			{owner?.given_name} {owner?.family_name}
		</span>
	);
	const open_csv = async () => {
		await router.push(item.filePath);
	}
	const controls_enabled = (
		<>
			<FormButton
				className="ml-3"
				onClick={onClickDelete}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconDelete />}
			/>

			<FormButton
				className="ml-3"
				onClick={open_csv}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconDownload />}
			/>
		</>
	);
	const controls_disabled = (
		<>
	<FormButton
				className="ml-3"
				onClick={onClickDelete}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconDelete />}
			/>
			<FormButton
				className="ml-3"
				onClick={handleExport}
				disabled={true}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconDownload />}
			/>
		</>
	);

	const url = `/my-lists/${item.id}`;

	const queryLoader = (
		<QueryLoader
			query={listListContactsByListId}
			onLoad={setListContactItems}
			isBusy={isContactsLoading}
			onBusyToggle={setIsContactsLoading}
			rootKey="listListContactsByListId"
			dataKey="items"
			options={{ listId: item.id, sortDirection: 'DESC', limit: 999 }}
			isLoadAll={true}
		/>
	);

	if (isListMode) {
		return (
			<tr className="is-relative">
				<td>
					{item.name}
					<Anchor href={url} className="is-overlay">
						<span></span>
					</Anchor>
					{queryLoader}
				</td>
				<td>{numberOfContacts}</td>
				<td>{fullName}</td>
				<td className="action-buttons">{(item.filePath) && (controls_enabled)}{(!item.filePath) && (controls_disabled)}</td>
			</tr>
		);
	}

	return (
		<motion.div layout className="panel-block is-block">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<div className="columns is-mobile is-align-items-center has-text-dark">
						<div className="column is-4">{item.name}</div>
						<div className="column is-2">{numberOfContacts}</div>
						<div className="column is-3">{item.currentStatus} {(item.currentStatus !== 'Ready') ? (<Loader classNames='' width={12} height={12} style={{display: "inline"}}></Loader>) : (null)} </div>
						<div className="column is-3">{fullName}</div>
					</div>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end action-buttons">{(item.filePath) && (controls_enabled)}{(!item.filePath) && (controls_disabled)}</div>
			</div>
			{queryLoader}
		</motion.div>
	);
};

export default MyListEntry;