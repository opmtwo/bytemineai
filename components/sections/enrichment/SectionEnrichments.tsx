import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { Contact, IBytemineEnrichment, ListContactModel } from '../../../types';
import Breadcrumb from '../../Breadcrumb';
import EnrichUploadForm from '../../enrich/EnrichUploadForm';
import FormButtonNew from '../../form/FormButtonNew';
import IconNewUpload from '../../icons/IconNewUpload';
import Modal from '../../modals/Modal';
import TrialNotice from '../../TrialNotice';
import EnrichmentItems from './EnrichmentItems';

const SectionEnrichments = () => {
	const isMounted = useRef(false);
	const intervalId = useRef<NodeJS.Timeout>();

	const [isBusy, setIsBusy] = useState(false);

	const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
	const [isExportModalActive, setIsExportModalActive] = useState(false);

	useEffect(() => {
		init();
		const refreshIntervalId = setInterval(enrichmentOnRead, 10000);
		intervalId.current = refreshIntervalId;
		return () => {
			console.log('Clearing refresh interval', { refreshIntervalId });
			clearInterval(refreshIntervalId);
		};
	}, []);

	// crud context
	const {
		isBusy: enrichmentIsBusy,
		error: enrichmentError,
		items: enrichmentItems,
		onRead: enrichmentOnRead,
		activeItem: enrichmentActiveItem,
		isFormActive: enrichmentIsFormActive,
		onFormOpen: enrichmentOnFormOpen,
		onFormCancel: enrichmentOnFormCancel,
		onAdd: enrichmentOnAdd,
		onEdit: enrichmentOnEdit,
	} = useCrudContext<IBytemineEnrichment>();

	const router = useRouter();

	const init = async () => {
		setIsBusy(true);
		await enrichmentOnRead();
		isMounted.current = true;
		setIsBusy(false);
	};

	const onCustomize = async () => {
		await router.push({ pathname: '/settings/subscription' });
	};

	const isTrailAccount = true;

	const { attributes } = useAuthContext();

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

	const onEnrichmentUploadFormSubmit = async (value: IBytemineEnrichment) => {
		enrichmentOnFormCancel();
		await enrichmentOnRead();
	};

	const onEnrichmentUploadFormCancel = async () => {
		// setIsUploadModalActive(false);
		enrichmentOnFormCancel();
	};

	const onUpgrade = () => {
		router.push('/settings/subscription/');
	};

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : <div></div>}

			<Breadcrumb title="Enrich" items={[{ label: 'Enrich', href: '/enrichment', isCurrent: true }]} />

			<div className="is-flex is-align-items-center is-justify-content-space-between is-fullwidth has-border has-radius p-5 mb-5">
				<div className="mr-auto">
					<h2 className="title is-4 mb-3">Bulk Enrichment</h2>
					<p>Upload a list of phone numbers, email addresses, or personal LinkedIn profiles.</p>
				</div>
				<div className="ml-auto">
					<FormButtonNew type="button" variant="active" onClick={enrichmentOnAdd}>
						<IconNewUpload width={16} />
						<span>Upload</span>
					</FormButtonNew>
				</div>
			</div>

			<EnrichmentItems isMounted={isMounted.current} onExport={onExport} />

			<Modal isActive={enrichmentIsFormActive} onCancel={enrichmentOnFormCancel}>
				<EnrichUploadForm
					isActive={enrichmentIsFormActive}
					onSubmit={onEnrichmentUploadFormSubmit}
					onCancel={onEnrichmentUploadFormCancel}
					onUpgrade={onUpgrade}
				/>
			</Modal>
		</>
	);
};

export default SectionEnrichments;
