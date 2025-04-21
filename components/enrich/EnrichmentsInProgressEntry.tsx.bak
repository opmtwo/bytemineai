import { useEffect, useState } from 'react';
import { getEnrichment } from '../../src/graphql/queries';
import { Enrichment } from '../../types';
import Card from '../cards/Card';
import CardTitle from '../CardTitle';
import FormLabel from '../form/FormLabel';
import FormProgressBar from '../form/FormProgress';
import IconCheckAlt from '../icons/IconCheckAlt';
import IconClose from '../icons/IconClose';
import IconInfo from '../icons/IconInfo';
import IconWorking from '../icons/IconWorking';
import QueryLoader from '../QueryLoader';
import Slot from '../Slot';

const EnrichmentsInProgressEntry = ({ item, onCancel }: { item: Enrichment; onCancel: () => void }) => {
	// loading in progress
	const [isBusy, setIsBusy] = useState(false);

	// current status
	const [status, setStatus] = useState('');

	// is complete
	const [isCompleted, setIsCompleted] = useState(false);

	// current progress
	const [progress, setProgress] = useState(0);

	// used to force refresh
	const [shouldRefresh, setShouldRefresh] = useState(false);

	// interval id used to refresh
	const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

	useEffect(() => {
		onLoad(item);
		setIntervalId(setInterval(refresh, 5000));
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, []);

	useEffect(() => {
		setStatus(item.status);
		setIsCompleted(item.isCompleted);
		if (item.isCompleted === true || ['failed', 'timedout'].includes(item.status)) {
			if (intervalId) {
				clearInterval(intervalId);
			}
			return;
		}
	}, [item.status]);

	/**
	 * @summary
	 * force query loader to reload
	 */
	const refresh = () => {
		setShouldRefresh(false);
		setTimeout(() => {
			setShouldRefresh(true);
		}, 100);
	};

	const onLoad = async (entry: Enrichment) => {
		// update local state
		setStatus(entry.status);
		setIsCompleted(entry.isCompleted);

		// when complete then mark progress as 100% else show value based on progress
		if (entry.isCompleted) {
			setProgress(100);
		} else {
			setProgress((entry.recordsProcessed / entry.recordsUploaded) * 100);
		}

		// when task has completed or failed then clear refresh interval
		if (intervalId && ['completed', 'failed', 'timedout'].includes(entry.status)) {
			clearInterval(intervalId);

			/**
			 * @summary
			 * Use document level events to refresh list items
			 *
			 * @see
			 * SectionEnrichBulk.tsx
			 */
			document.body.dispatchEvent(new Event('nymblr.enrich.success'));
		}
	};

	/**
	 * @summary
	 * If there is an error in the query then clear the refresh interval
	 */
	const onError = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	return (
		console.log(progress, "progress"),
		<>
			<Card>
				<Slot slot="header">
					<>
						<CardTitle>Enriching bulk file</CardTitle>
						<span className="is-clickable" onClick={onCancel}>
							<IconClose />
						</span>
					</>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block py-5">
						<FormProgressBar value={progress} />
						<div className="is-flex is-align-items-center mt-3 is-titlecase">
							{status === 'completed' && isCompleted ? (
								<>
									<span className="is-flex mr-3">
										<FormLabel label="Completed" />
									</span>
									<IconCheckAlt width={12} />
								</>
							) : ['failed', 'timedout'].includes(status) ? (
								<>
									<span className="is-flex mr-3">
										<FormLabel label="Failed" />
									</span>
									<IconInfo width={12} />
								</>
							) : (
								<>
									<IconWorking fill="var(--primary)" />
									<span className="ml-3">Processing</span>
								</>
							)}
						</div>
					</div>
				</Slot>
			</Card>
			{shouldRefresh ? (
				<QueryLoader
					query={getEnrichment}
					onLoad={onLoad}
					isBusy={isBusy}
					onBusyToggle={setIsBusy}
					rootKey="data"
					dataKey="getEnrichment"
					options={{ id: item.id }}
					isLoadAll={false}
					isSingle={true}
					onError={onError}
				/>
			) : null}
		</>
	);
};

export default EnrichmentsInProgressEntry;
