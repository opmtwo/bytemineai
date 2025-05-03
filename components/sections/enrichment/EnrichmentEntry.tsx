import { motion } from 'framer-motion';
import { uniqBy } from 'lodash';
import { useState } from 'react';

import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineEnrichment, ListContactModel, SortData } from '../../../types';
import { forceDownloadS3File } from '../../../utils/helper-utils';
import Anchor from '../../Anchor';
import FormCheckbox from '../../form/FormCheckbox';
import IconDelete from '../../icons/IconDelete';
import IconNewDownload from '../../icons/IconNewDownload';
import Loader from '../../Loader';

const EnrichmentEntry = ({
	sortMap,
	isSticky,
	item,
	isListMode = false,
	onExport,
}: {
	sortMap: SortData[];
	isSticky?: boolean;
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

	// Compute match rate
	item.matchRate = Math.round((item.recordsEnriched / item.recordsUploaded) * 100).toFixed(0) + '%';

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
	};

	const handleDownload = async () => {
		try {
			await forceDownloadS3File(item.s3KeyOutput);
		} catch (err) {
			console.log('handleDownload - error', err);
		}
	};

	const handleSelect = (isSelected: boolean) => {
		enrichmentOnSelect(item.id, isSelected);
	};

	const numberOfContacts = (
		<span className="has-text-weight-normal">
			{!listContactItems.length && isContactsLoading ? <Loader width={20} height={20} classNames="is-block" /> : <>{uniqueContacts.length} contacts</>}
		</span>
	);

	const fullName = <span className="has-text-primary">{/* {item?.user?.givenName} {item?.user?.familyName} */}</span>;

	const itemCheckbox = (
		<FormCheckbox
			value={item.id}
			isChecked={item.isSelected}
			onChange={(isChecked: boolean) => {
				enrichmentOnSelect(item.id, isChecked);
			}}
		/>
	);

	const controls = (
		<>
			<span className="is-clickable icon-text" onClick={handleDelete}>
				<div className="is-flex is-align-items-center is-justify-content-center image is-32x32">
					<IconDelete width={16} />
				</div>
			</span>
			<span className="is-clickable icon-text" onClick={item.isCompleted ? handleDownload : undefined}>
				<div className="is-flex is-align-items-center is-justify-content-center image is-32x32 has-border has-radius-small">
					<IconNewDownload width={16} />
				</div>
			</span>
		</>
	);

	const url = `/my-lists/${item.id}`;

	if (isListMode) {
		return (
			<tr>
				{isSticky ? <td className="action-select is-sticky">{itemCheckbox}</td> : null}
				{sortMap.map((value, index) => {
					return <td key={value.id}>{(item as any)[value.id]}</td>;
				})}
				<td className="is-sticky">{controls}</td>
			</tr>
		);
	}

	return (
		<motion.div layout className="panel-block is-block">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<Anchor href={url} className="columns is-mobile is-align-items-center has-text-dark">
						<div className="column is-4 is-flex">
							<span
								className="is-relative"
								style={{ zIndex: 1 }}
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
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
