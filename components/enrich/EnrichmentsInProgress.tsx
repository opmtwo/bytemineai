import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../providers/auth-data-provider';
import { listEnrichmentsByGroupId } from '../../src/graphql/queries';
import { Enrichment } from '../../types';
import QueryLoader from '../QueryLoader';
import EnrichmentsInProgressEntry from './EnrichmentsInProgressEntry';

const EnrichmentsInProgress = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [enrichmentItems, setEnrichmentItems] = useState<Enrichment[]>([]);

	const [shouldLoad, setShouldLoad] = useState(true);

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	/**
	 * Using window based global events to reload enrichments list
	 *
	 * @see
	 * https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
	 */
	useEffect(() => {
		const event = 'nymblr.enrichments.reload';
		document.body.addEventListener(event, forceReload);
		return () => {
			document.body.removeEventListener(event, forceReload);
		};
	}, []);

	const forceReload = () => {
		setShouldLoad(false);
		setTimeout(() => {
			setShouldLoad(true);
		}, 100);
	};

	const items = enrichmentItems
		// filter out failed / completed / timedout items
		.filter((item) => !item.isCompleted && ['failed', 'timedout'].includes(item.status) !== true)
		// filter out any items older than 30 minutes - most probably an error has occurred
		.filter((item) => moment(item.createdAt).isBefore(moment().add(30, 'minutes')))
		.map((item) => {
			const onCancel = () => {
				setEnrichmentItems(enrichmentItems.filter((_item) => _item.id !== item.id));
			};
			return <EnrichmentsInProgressEntry key={item.id} item={item} onCancel={onCancel} />;
		});

	return (
		<>
			{groupname && shouldLoad ? (
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
			<div style={{ zIndex: 8000, position: 'fixed', top: 100, right: 20, width: 220 }}>{items}</div>
		</>
	);
};

export default EnrichmentsInProgress;
