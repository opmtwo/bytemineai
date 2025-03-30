import { ContactCompany } from '../../types';
import Card from '../cards/Card';
import Slot from '../Slot';
import EnrichCompanyInfoList from './EnrichCompanyInfoList';
import EnrichCompanyInfoTable from './EnrichCompanyInfoTable';
import EnrichDownloadButton from './EnrichDownloadButton';
import EnrichTitle from './EnrichTitle';

const EnrichCompanyInfo = ({ company, isListMode, onDownload }: { company: ContactCompany; isListMode: boolean; onDownload: () => void }) => {
	return (
		<Card>
			<Slot slot="header">
				<EnrichTitle icon={<>storefront</>}>{company.legalName || company.name}</EnrichTitle>
				<EnrichDownloadButton onDownload={onDownload} />
			</Slot>
			<Slot slot="body">
				{isListMode ? (
					<EnrichCompanyInfoTable items={[company]} className="is-comfortable is-resizable" />
				) : (
					<EnrichCompanyInfoList company={company} />
				)}
			</Slot>
		</Card>
	);
};

export default EnrichCompanyInfo;
