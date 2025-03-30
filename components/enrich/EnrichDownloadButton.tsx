import FormButton from '../form/FormButton';
import IconDownload from '../icons/IconDownload';

const EnrichDownloadButton = ({ onDownload }: { onDownload: () => void }) => (
	<FormButton
		variant={['is-outlined', 'is-icon', 'is-rounded']}
		className="ml-a is-ui-svg"
		onClick={onDownload}
		icon={<IconDownload />}
		size="is-small"
		style={{ fontSize: '0.66em' }}
	/>
);

export default EnrichDownloadButton;
