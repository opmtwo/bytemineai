import { Dispatch, SetStateAction } from 'react';
import FormButton from '../form/FormButton';
import ViewToggle from '../ViewToggle';

const EnrichToolbar = ({
	isListMode,
	onListModeToggle,
	onDownload,
}: {
	isListMode: boolean;
	onListModeToggle: Dispatch<SetStateAction<boolean>>;
	onDownload: () => void;
}) => {
	return (
		<div className="is-flex is-fullwidth">
			<FormButton variant={['is-outlined', 'is-ui-button']} onClick={onDownload} className="mb-5">
				Export
			</FormButton>
			<ViewToggle name="isListMode" isChecked={isListMode} onChange={onListModeToggle} />
		</div>
	);
};

export default EnrichToolbar;
