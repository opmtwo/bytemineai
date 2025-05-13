import { motion } from 'framer-motion';
import { uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineCollection, IBytemineContact } from '../../../types';
import { callApi } from '../../../utils/helper-utils';
import Anchor from '../../Anchor';
import FormDoubleCheckbox from '../../form/FormDoubleCheckbox';
import IconNewDownload from '../../icons/IconNewDownload';
import IconNewEdit from '../../icons/IconNewEdit';
import IconNewTrash from '../../icons/IconNewTrash';
import Loader from '../../Loader';

const MyListEntry = ({
	item,
	isListMode = false,
	onExport,
}: {
	item: IBytemineCollection;
	isListMode?: boolean;
	onExport: (listContacts: IBytemineContact[]) => void;
}) => {
	const [listContactItems, setListContactItems] = useState<IBytemineContact[]>([]);
	const [isContactsLoading, setIsContactsLoading] = useState(false);

	const {
		onConfirmOpen: collectionOnConfirmOpen,
		onConfirmCancel: collectionOnConfirmCancel,
		onEdit: collectionOnEdit,
		onDelete: collectionOnDelete,
		onSelect: collectionOnSelect,
	} = useCrudContext<IBytemineCollection>();

	useEffect(() => {
		getCollectionContacts(item.id);
	}, [item.id]);

	// const [owner, setOwner] = useState<UserAttributes>();

	const uniqueContacts = uniqBy(
		listContactItems.filter((item) => item.pid),
		'pid'
	);

	const handleExport = () => onExport(uniqueContacts);

	// Load collection contacts
	const getCollectionContacts = async (id: string) => {
		setIsContactsLoading(true);
		try {
			const res = (await callApi(null, `/api/v1/collections/${id}/contacts`, {})) as IBytemineContact[];
			setListContactItems(res);
		} catch (err) {
			console.log('getCollectionContacts - error', err);
		}
		setIsContactsLoading(false);
	};

	// const onClickDelete = ()=> onDelete(item)
	// useEffect(() => {
	// 	const user = users.find((userItem) => userItem.sub === item.owner);
	// 	if (user) {
	// 		setOwner(user);
	// 	}
	// }, [users, item]);

	const handleDelete = () => {
		const onSubmit = () => async () => {
			await collectionOnDelete(item.id, {}, {}, {});
			window.dispatchEvent(new Event('logs.refresh'));
		};
		const onCancel = () => async () => {
			await collectionOnConfirmCancel();
			window.dispatchEvent(new Event('logs.refresh'));
		};
		collectionOnConfirmOpen('Delete seeding mailbox?', 'Are you sure you want to delete this seeding mailbox? This can not be undone!', onSubmit, onCancel);
	};

	const handleEdit = () => {
		collectionOnEdit(item.id);
	};

	const handleSelect = (isSelected: boolean) => {
		collectionOnSelect(item.id, isSelected);
	};

	const numberOfContacts = (
		<span className="has-text-weight-normal">
			{!listContactItems.length && isContactsLoading ? <Loader width={20} height={20} classNames="is-block" /> : <>{uniqueContacts.length} contacts</>}
		</span>
	);

	const fullName = (
		<span className="has-text-primary">
			{item?.user?.givenName} {item?.user?.familyName}
		</span>
	);

	const controls = (
		<>
			<span className="is-clickable icon-text" onClick={handleDelete}>
				<span className="icon has-text-danger ml-3">
					<IconNewTrash width={12} stroke="currentColor" />
				</span>
			</span>
			<span className="is-clickable icon-text" onClick={handleEdit}>
				<span className="icon ml-3">
					<IconNewEdit width={12} />
				</span>
			</span>
			<span className="is-clickable icon-text" onClick={handleExport}>
				<span className="icon has-border has-border-alt has-radius-small ml-3">
					<IconNewDownload width={12} />
				</span>
			</span>
			{/* <FormButton className="ml-3" onClick={handleDelete} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconDelete />} />
			<FormButton className="ml-3" onClick={handleExport} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconDownload />} /> */}
		</>
	);

	const url = `/my-lists/${item.id}`;

	if (isListMode) {
		return (
			<tr className="is-relative">
				<td>
					{item.name}
					<Anchor href={url} className="is-overlay">
						<span></span>
					</Anchor>
				</td>
				<td>{numberOfContacts}</td>
				<td>{fullName}</td>
				<td className="action-buttons">{controls}</td>
			</tr>
		);
	}

	return (
		<motion.div layout className="panel-block is-block">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<Anchor href={url} className="columns is-mobile is-align-items-center has-text-dark">
						<div className="column is-4 is-flex">
							<div className="is-flex is-align-items-center">
								<span
									className="is-relative field"
									style={{ zIndex: 1 }}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<FormDoubleCheckbox value={item.id} className="is-filter-checkbox has-border-alt m-0" isChecked={item.isSelected} onChange={handleSelect} />
								</span>
								<span className="ml-5">{item.name}</span>
							</div>
						</div>
						<div className="column is-4">{numberOfContacts}</div>
						<div className="column is-4">{fullName}</div>
					</Anchor>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end">{controls}</div>
			</div>
		</motion.div>
	);
};

export default MyListEntry;
