import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import { Contact, IBytemineEnrichment, ListContactModel } from '../../../types';
import Breadcrumb from '../../Breadcrumb';
import EnrichUploadForm from '../../enrich/EnrichUploadForm';
import LoaderFullscreen from '../../LoaderFullscreen';
import Modal from '../../modals/Modal';
import TrialNotice from '../../TrialNotice';
import EnrichmentItems from './EnrichmentItems';

const SectionEnrichments = () => {
	const isMounted = useRef(false);

	const [isBusy, setIsBusy] = useState(false);

	const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
	const [isExportModalActive, setIsExportModalActive] = useState(false);

	useEffect(() => {
		if (isMounted.current) {
			return;
		}
		isMounted.current = true;
		init();
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

	const { settings, canUpgrade } = useSettingsContext();

	const init = async () => {
		setIsBusy(true);
		await enrichmentOnRead();
		setIsBusy(false);
	};

	const onCustomize = async () => {
		await router.push({ pathname: '/settings/subscription' });
	};

	const isTrailAccount = canUpgrade;

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
		await init();
	};

	const onEnrichmentUploadFormCancel = async () => {
		// setIsUploadModalActive(false);
		enrichmentOnFormCancel();
	};

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : <div></div>}

			{enrichmentIsBusy || isBusy ? <LoaderFullscreen /> : null}

			<Breadcrumb title="Enrich" items={[{ label: 'Enrich', href: '/enrichment', isCurrent: true }]} />

			<EnrichmentItems onExport={onExport} />

			<Modal isActive={enrichmentIsFormActive} onCancel={enrichmentOnFormCancel}>
				<EnrichUploadForm
					isActive={enrichmentIsFormActive}
					onSubmit={onEnrichmentUploadFormSubmit}
					onCancel={onEnrichmentUploadFormCancel}
					onUpgrade={() => {}}
				/>
			</Modal>
		</>
	);
};

export default SectionEnrichments;
