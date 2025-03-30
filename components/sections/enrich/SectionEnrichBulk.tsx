import { Storage } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import { Enrichment } from '../../../types';
import EnrichBulkItems from '../../enrich/EnrichBulkItems';
import EnrichHeader from '../../enrich/EnrichHeader';
import EnrichUploadForm from '../../enrich/EnrichUploadForm';
import EnrichMenu from '../../EnrichMenu';
import FormButton from '../../form/FormButton';
import IconEnrichBulk from '../../icons/IconEnrichBulk';
import Modal from '../../modals/Modal';
import TrialNotice from '../../TrialNotice';
import QueryLoader from '../../QueryLoader';
import { listEnrichmentsByGroupId } from '../../../src/graphql/queries';
import { downloadUrl } from '../../../utils/helper-utils';

const SectionEnrichBulk = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [enrichmentItems, setEnrichmentItems] = useState<Enrichment[]>([]);

	const [isUploadModalActive, setIsUploadModalActive] = useState(false);

	// used to force refresh
	const [shouldRefresh, setShouldRefresh] = useState(true);

	const router = useRouter();
	const { canUpgrade } = useSettingsContext();

	const { user, groups } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	const isTrailAccount = canUpgrade;

	/**
	 * @summary
	 * Use document level events to refresh list items
	 *
	 * @see
	 * EnrichmentsInProgressEntry.tsx
	 */
	useEffect(() => {
		document.body.addEventListener('nymblr.enrich.success', refresh);
		return () => {
			document.body.removeEventListener('nymblr.enrich.success', refresh);
		};
	}, []);

	/**
	 * @summary
	 * Force list to reload
	 */
	const refresh = () => {
		setShouldRefresh(false);
		setTimeout(() => {
			setShouldRefresh(true);
		}, 100);
	};

	const onCustomize = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	};

	const onHeaderSubmit = async () => {
		setIsUploadModalActive(true);
	};

	const onUploadFormSubmit = async (value: Enrichment) => {
		debugger;
		setEnrichmentItems([value, ...enrichmentItems]);
		setIsUploadModalActive(false);

		// check _app.tsx - cross screen list of enrichments
		document.body.dispatchEvent(new Event('nymblr.enrichments.reload'));
	};

	const onUploadFormCancel = async () => {
		setIsUploadModalActive(false);
	};

	const onUpgrade = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	};

	const onCreate = (entry: Enrichment) => {
		setEnrichmentItems([entry, ...enrichmentItems]);
		setIsUploadModalActive(false);
	};

	const onUpdate = (entry: Enrichment) => {
		setEnrichmentItems(
			enrichmentItems.map((item) => {
				if (item.id === entry.id) {
					return entry;
				}
				return item;
			})
		);
		setIsUploadModalActive(false);
	};

	const onDownload = async (id: string) => {
		const item = enrichmentItems.find((item) => item.id === id);
		console.log('onDownload - item', item);
		if (!item?.s3KeyOutput) {
			console.log('onDownload - error - output key not found');
			return;
		}
		try {
			const url = await Storage.get(item.s3KeyOutput.replace('public/', ''), { download: false });
			downloadUrl(url, item.s3KeyOutput.split('/').pop() || `enrichment--${new Date().toISOString()}-${item.name}`);
		} catch (err) {
			console.log('onDownload - error', err);
		}
	};

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : null}
			<EnrichMenu />
			<EnrichHeader
				title="Bulk Enrichment"
				text="Upload a list of phone numbers, email addresses, or personal LinkedIn profiles."
				icon={<IconEnrichBulk />}
			>
				<FormButton onClick={onHeaderSubmit} variant={['is-ui-button']}>
					Upload
				</FormButton>
			</EnrichHeader>
			<EnrichBulkItems items={enrichmentItems} isBusy={isBusy} onDownload={onDownload} />
			<Modal isActive={isUploadModalActive} onCancel={onUploadFormCancel}>
				<EnrichUploadForm onSubmit={onUploadFormSubmit} onCancel={onUploadFormCancel} onUpgrade={onUpgrade} />
			</Modal>
			{groupname && shouldRefresh ? (
				<QueryLoader
					query={listEnrichmentsByGroupId}
					onLoad={setEnrichmentItems}
					isBusy={isBusy}
					onBusyToggle={setIsBusy}
					rootKey="listEnrichmentsByGroupId"
					dataKey="items"
					options={{ groupId: groupname, sortDirection: 'DESC', limit: 1999 }}
					isLoadAll={true}
				/>
			) : null}
		</>
	);
};

export default SectionEnrichBulk;
