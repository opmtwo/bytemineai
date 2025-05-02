import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import { Contact, IBytemineEnrichment, ListContactModel } from '../../../types';
import EnrichUploadForm from '../../enrich/EnrichUploadForm';
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
		enrichmentOnRead();
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
		// debugger;
		// setEnrichmentItems([value, ...enrichmentItems]);
		// setIsUploadModalActive(false);

		// check _app.tsx - cross screen list of enrichments
		document.body.dispatchEvent(new Event('nymblr.enrichments.reload'));
	};

	const onEnrichmentUploadFormCancel = async () => {
		// setIsUploadModalActive(false);
		enrichmentOnFormCancel();
	};

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : <div></div>}

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
