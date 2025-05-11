import FormButton from '../form/FormButton';
import FormButtonNew from '../form/FormButtonNew';
import IconDownload from '../icons/IconDownload';

const EnrichDownloadButton = ({ onDownload }: { onDownload: () => void }) => (
	<FormButtonNew
		type="button"
		variant="icon"
		className="ml-a is-ui-svg"
		onClick={onDownload}
		icon={<IconDownload />}
		size="sm"
		style={{ fontSize: '0.66em' }}
	/>
);

export default EnrichDownloadButton;
