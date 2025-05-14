import { sentenceCase } from 'change-case';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { EActionSelect, IBytemineEnrichment, ListContactModel, SortData, SortOrder } from '../../../types';
import { decodeJson, getSortedItems } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormDoubleCheckbox from '../../form/FormDoubleCheckbox';
import IconNewProcessing from '../../icons/IconNewProcessing';
import ListView from '../../ListView';
import Loader from '../../Loader';
import { paginate } from '../../Pagination';
import PaginationNew from '../../PaginationNew';
import Slot from '../../Slot';
import TableSkeleton from '../../table-skeleton';
import EnrichmentEntry from './EnrichmentEntry';

const EnrichmentItems = ({ onExport }: { onExport: (listContacts: ListContactModel[]) => void }) => {
	const [isListMode, setIsListMode] = useState(false);

	const { attributes } = useAuthContext();

	const {
		isBusy: enrichmentIsBusy,
		isLoading: enrichmentIsLoading,
		items: enrichmentItems,
		itemsInUse: enrichmentItemsInUse,
		page: enrichmentPage,
		perPage: enrichmentPerPage,
		onPageChange: enrichmentOnPageChange,
		query: enrichmentQuery,
		onQueryChange: enrichmentOnQueryChange,
		onConfirmOpen: enrichmentOnConfirmOpen,
		onConfirmCancel: enrichmentOnConfirmCancel,
		onSelectMany: enrichmentOnSelectMany,
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

	const itemsHeader = (
		<motion.div layout className="panel-block is-block has-background-white-bis">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<div className="columns is-mobile is-align-items-center has-text-dark">
						<div className="column is-4">
							<span className="is-flex is-align-items-center">
								<span
									className="is-relative field"
									style={{ zIndex: 1 }}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<FormDoubleCheckbox
										className="is-filter-checkbox has-border-alt m-0"
										isChecked={paginate(enrichmentItemsInUseSorted, enrichmentPerPage, enrichmentPage).every((item) => item.isSelected)}
										onChange={() => {
											enrichmentOnSelectMany(EActionSelect.ToggleCurrentPage, []);
										}}
									/>
								</span>
								<span className="ml-5">My File</span>
							</span>
						</div>
						<div className="column is-2 has-text-centered">Records Uploaded</div>
						<div className="column is-2 has-text-centered">Records Enriched</div>
						<div className="column is-2 has-text-centered">Match Rate</div>
						<div className="column is-2 has-text-centered">Status</div>
					</div>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end action-buttons">Action</div>
			</div>
		</motion.div>
	);

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

	if (enrichmentIsLoading && !enrichmentItems.length) {
		return <TableSkeleton />;
	}

	return (
		<>
			<Card className="is-scroll-view">
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
								<>
									{enrichmentIsLoading && !enrichmentItems.length ? null : (
										<>
											{itemsHeader}
											{itemsList}
										</>
									)}
								</>
							)}
						</>
					) : null}
				</Slot>
			</Card>
			{enrichmentItemsInUse.length ? pagination : null}
		</>
	);
};

export default EnrichmentItems;
