import { ContactPerson } from '../../types';
import Card from '../cards/Card';
import Slot from '../Slot';
import EnrichContactInfoList from './EnrichContactInfoList';
import EnrichContactInfoTable from './EnrichContactInfoTable';
import EnrichDownloadButton from './EnrichDownloadButton';
import EnrichTitle from './EnrichTitle';

const EnrichContactInfo = ({ contact, isListMode, onDownload }: { contact: ContactPerson; isListMode: boolean; onDownload: () => void }) => {
	return (
		<Card>
			<Slot slot="header">
				<EnrichTitle icon={<>mail</>}>
					{contact.contactFirstName} {contact.contactLastName}
				</EnrichTitle>
				{ /*<EnrichDownloadButton onDownload={onDownload} />*/}
			</Slot>
			<Slot slot="body">
				{isListMode ? (
					<EnrichContactInfoTable items={[contact]} className="is-comfortable is-resizable" />
				) : (
					<EnrichContactInfoList contact={contact} />
				)}
			</Slot>
		</Card>
	);
};

export default EnrichContactInfo;
