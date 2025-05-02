import { motion } from 'framer-motion';
import { uniqBy } from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';

import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineEnrichment, List, ListContactModel, UserAttributes } from '../../../types';
import Anchor from '../../Anchor';
import FormButton from '../../form/FormButton';
import IconAdd from '../../icons/IconAdd';
import IconDelete from '../../icons/IconDelete';
import IconDownload from '../../icons/IconDownload';
import Loader from '../../Loader';
import QueryLoader from '../../QueryLoader';
import FlexBox from '../../FlexBox';
import FormCheckbox from '../../form/FormCheckbox';
import IconEdit from '../../icons/IconEdit';

const EnrichmentEntry = ({
	item,
	isListMode = false,
	onExport,
}: {
	item: IBytemineEnrichment;
	isListMode?: boolean;
	onExport: (listContacts: ListContactModel[]) => void;
}) => {
	const [listContactItems, setListContactItems] = useState<ListContactModel[]>([]);
	const [isContactsLoading, setIsContactsLoading] = useState(false);

	const {
		onConfirmOpen: enrichmentOnConfirmOpen,
		onConfirmCancel: enrichmentOnConfirmCancel,
		onEdit: enrichmentOnEdit,
		onDelete: enrichmentOnDelete,
		onSelect: enrichmentOnSelect,
	} = useCrudContext<IBytemineEnrichment>();

	// const [owner, setOwner] = useState<UserAttributes>();

	const uniqueContacts = uniqBy(
		listContactItems.filter((item) => item.contact?.ruid),
		'contactId'
	);

	const handleExport = () => onExport(uniqueContacts);

	// const onClickDelete = ()=> onDelete(item)
	// useEffect(() => {
	// 	const user = users.find((userItem) => userItem.sub === item.owner);
	// 	if (user) {
	// 		setOwner(user);
	// 	}
	// }, [users, item]);

	const handleDelete = () => {
		const onSubmit = () => async () => {
			await enrichmentOnDelete(item.id, {}, {}, {});
			window.dispatchEvent(new Event('logs.refresh'));
		};
		const onCancel = () => async () => {
			await enrichmentOnConfirmCancel();
			window.dispatchEvent(new Event('logs.refresh'));
		};
		enrichmentOnConfirmOpen('Delete enrichment?', 'Are you sure you want to delete this enrichment? This can not be undone!', onSubmit, onCancel);
	};

	const handleEdit = () => {
		enrichmentOnEdit(item.id);
	}

	const handleSelect = (isSelected: boolean) => {
		enrichmentOnSelect(item.id, isSelected);
	};

	const numberOfContacts = (
		<span className="has-text-weight-normal">
			{!listContactItems.length && isContactsLoading ? <Loader width={20} height={20} classNames="is-block" /> : <>{uniqueContacts.length} contacts</>}
		</span>
	);

	const fullName = (
		<span className="has-text-primary">
			{/* {item?.user?.givenName} {item?.user?.familyName} */}
		</span>
	);

	const controls = (
		<>
			<span className="is-clickable icon-text" onClick={handleDelete}>
				<span className="icon">
					<IconDelete width={24} />
				</span>
			</span>
			<span className="is-clickable icon-text" onClick={handleEdit}>
				<span className="icon">
					<IconEdit width={24} />
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
							<span className="is-relative" style={{ zIndex: 1 }} onClick={(e) => {
								e.stopPropagation();
							}}>
								<FormCheckbox className="relative" value="accept" isChecked={item.isSelected ? true : false} onChange={handleSelect} />
							</span>
							{item.name}
						</div>
						<div className="column is-4">{numberOfContacts}</div>
						<div className="column is-4">{fullName}</div>
					</Anchor>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end action-buttons">{controls}</div>
			</div>
		</motion.div>
	);
};

export default EnrichmentEntry;
