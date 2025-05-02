import { useEffect, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineEnrichment, ListContactModel } from '../../../types';
import { decodeJson } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButtonNew from '../../form/FormButtonNew';
import IconNewUpload from '../../icons/IconNewUpload';
import ListView from '../../ListView';
import Loader from '../../Loader';
import { paginate } from '../../Pagination';
import PaginationNew from '../../PaginationNew';
import Slot from '../../Slot';
import EnrichmentEntry from './EnrichmentEntry';

const EnrichmentItems = ({ onExport }: { onExport: (listContacts: ListContactModel[]) => void }) => {
	const [isListMode, setIsListMode] = useState(false);

	const { attributes } = useAuthContext();

	const {
		isBusy: enrichmentIsBusy,
		items: enrichmentItems,
		itemsInUse: enrichmentItemsInUse,
		page: enrichmentPage,
		perPage: enrichmentPerPage,
		onPageChange: enrichmentOnPageChange,
		query: enrichmentQuery,
		onQueryChange: enrichmentOnQueryChange,
		onConfirmOpen: enrichmentOnConfirmOpen,
		onConfirmCancel: enrichmentOnConfirmCancel,
		onAdd: enrichmentOnAdd,
		onDelete: enrichmentOnDelete,
		onDeleteMany: enrichmentOnDeleteMany,
	} = useCrudContext<IBytemineEnrichment>();

	useEffect(() => {
		const profile = decodeJson(attributes?.profile);
		if (profile?.listModes?.EnrichmentItems) {
			setIsListMode(true);
		}
	}, []);

	const itemsList = paginate(enrichmentItemsInUse, enrichmentPerPage, enrichmentPage).map((item) => (
		<>
			<EnrichmentEntry key={item.id} item={item} isListMode={isListMode} onExport={onExport} />
		</>
	));

	const selectedItems = enrichmentItems.filter((_item) => _item.isSelected);

	const handleDeleteMany = async () => {
		const ids = selectedItems.map((_item) => _item.id);
		const onSubmit = () => async () => {
			await enrichmentOnDeleteMany(ids, {}, {}, {});
			window.dispatchEvent(new Event('logs.refresh'));
		};
		const onCancel = () => async () => await enrichmentOnConfirmCancel();
		enrichmentOnConfirmOpen(
			'Delete seeding mailbox?',
			'Are you sure you want to the selected seeding mailbox? This can not be undone!',
			onSubmit,
			onCancel
		);
	};

	const pagination = (
		<PaginationNew
			totalCount={enrichmentItemsInUse.length}
			currentPage={enrichmentPage}
			itemsPerPage={enrichmentPerPage}
			onPageChange={enrichmentOnPageChange}
			pageSizeOptions={[10, 25, 50]}
		/>
	);

	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<div className="is-flex is-justify-content-space-between is-fullwidth">
					<div className="mr-auto">
						<h2 className="title is-4 mb-3">Bulk Enrichment</h2>
						<p>Upload a list of phone numbers. email addresses. or personal LinkedIn profiles.</p>
					</div>
					<div className="ml-auto">
						<FormButtonNew variant="active" onClick={enrichmentOnAdd}>
							<IconNewUpload width={16} />
							<span>Upload</span>
						</FormButtonNew>
					</div>
				</div>
			</Slot>

			<Slot slot="body">
				<CardAnimatePresence isActive={enrichmentIsBusy && !enrichmentItems.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={!enrichmentIsBusy && !enrichmentItemsInUse.length}>
					<EmptyMsg msg="No enrichments found" />
				</CardAnimatePresence>
				{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
			</Slot>

			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default EnrichmentItems;
