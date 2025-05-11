import { sentenceCase } from 'change-case';
import { ReactNode, useEffect, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineEnrichment, ListContactModel, SortData, SortOrder } from '../../../types';
import { decodeJson, getSortedItems } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButtonNew from '../../form/FormButtonNew';
import IconNewProcessing from '../../icons/IconNewProcessing';
import IconNewUpload from '../../icons/IconNewUpload';
import ListView from '../../ListView';
import Loader from '../../Loader';
import { paginate } from '../../Pagination';
import PaginationNew from '../../PaginationNew';
import Slot from '../../Slot';
import EnrichmentEntry from './EnrichmentEntry';

const EnrichmentItems = ({ onExport }: { onExport: (listContacts: ListContactModel[]) => void }) => {
	const [isListMode, setIsListMode] = useState(true);

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

	const keysToExport = ['name', 'recordsUploaded', 'recordsEnriched', 'matchRate', 'status'];

	const keysToExportMap: SortData[] = keysToExport.map((value) => ({
		id: value,
		content: sentenceCase(value),
		sortOrder: SortOrder.none,
		order: undefined,
		render: (item: IBytemineEnrichment, key: string, content: ReactNode | string) => {
			if (['processing'].includes(item.status?.trim().toLowerCase()) === false) {
				return content;
			}
			if (['recordsEnriched', 'matchRate', 'status'].includes(key) === false) {
				return content;
			}
			return (
				<span className="is-inline-flex is-align-items-center px-2 py-1" style={{ backgroundColor: '#eaecf0', borderRadius: 20 }}>
					<IconNewProcessing width={12} />
					<span className="ml-2">Processing</span>
				</span>
			);
		},
	}));

	const [sortMap, setSortMap] = useState<SortData[]>(keysToExportMap);

	const onSort = (key: string, order: SortOrder) => {
		let newMap = [...sortMap].map((value) => {
			if (value.id === key) {
				value.sortOrder = order;
			}
			return value;
		});
		setSortMap(newMap);
	};

	const onReorder = (newMap: SortData[]) => setSortMap(newMap);

	const enrichmentItemsInUseSorted = getSortedItems(enrichmentItemsInUse, sortMap as any);

	const itemsList = paginate(enrichmentItemsInUseSorted, enrichmentPerPage, enrichmentPage).map((item) => (
		<>
			<EnrichmentEntry key={item.id} item={item} sortMap={sortMap} isSticky={false} isListMode={isListMode} onExport={onExport} />
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
						<FormButtonNew type="button" variant="active" onClick={enrichmentOnAdd}>
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
				{enrichmentItemsInUse.length ? (
					<>
						{isListMode ? (
							<ListView headings={sortMap} isSticky={false} className="is-comfortable is-resizable" onReorder={onReorder} onSort={onSort}>
								{itemsList}
							</ListView>
						) : (
							itemsList
						)}
					</>
				) : null}
			</Slot>
			{enrichmentItemsInUse.length ? <Slot slot="footer">{pagination}</Slot> : null}
		</Card>
	);
};

export default EnrichmentItems;
