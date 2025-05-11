import { motion } from 'framer-motion';
import { Enrichment } from '../../types';
import { formatNumber } from '../../utils/helper-utils';
import FormButton from '../form/FormButton';
import IconDownload from '../icons/IconDownload';
import IconWorking from '../icons/IconWorking';
import FormButtonNew from '../form/FormButtonNew';

const EnrichBulkEntry = ({ item, onDownload }: { item: Enrichment; onDownload: (id: string) => void }) => {
	const handleDownload = () => onDownload(item.id);

	return (
		<motion.div layout className="panel-block is-block">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-4">
					<div className="is-flex is-align-items-center">
						<span>{item.name}</span>
						{item.isCompleted ? null : (
							<span className="is-flex is-align-items-center ml-3">
								<IconWorking fill="var(--primary)" />
								<span className="ml-3 has-text-weight-normal">Processing</span>
							</span>
						)}
					</div>
				</div>
				<div className="column is-8">
					<div className="columns is-mobile is-align-items-center has-text-centered">
						<div className="column is-4">
							<span className="has-text-primary">{formatNumber(item.recordsUploaded.toString())}</span>
							<br />
							<span>Records Uploaded</span>
						</div>
						<div className="column is-3 ml-5 ">
							<span className="has-text-primary">
								{item?.isCompleted ? (item.recordsEnriched ? formatNumber(item.recordsEnriched.toString()) : '0') : '-'}
							</span>
							<br />
							<span>Records Enriched</span>
						</div>
						<div className="column is-3 ml-5">
							<span className="has-text-primary">
								{item.isCompleted ? `${(((item.recordsEnriched || 0) / item.recordsUploaded) * 100).toFixed(0)}%` : '-'}
							</span>
							<br />
							<span>Match Rate</span>
						</div>
						<div className="column is-1 has-text-right ml-5">
							<FormButtonNew
								type="button"
								className="ml-3"
								onClick={item.isCompleted ? handleDownload : undefined}
								variant="icon"
								disabled={!item.isCompleted}
								icon={
									<span style={{ width: 12 }}>
										<IconDownload width={8} />
									</span>
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default EnrichBulkEntry;
