import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../providers/auth-data-provider';
import { useSettingsContext } from '../providers/settings-provider';
import { AccountType } from '../types';
import CardAnimatePresence from './cards/CardAnimatePresence';
import FormButton from './form/FormButton';
import IconBulb from './icons/IconBulb';

const SuccessNotice = ({ onCustomize }: { onCustomize: () => void }) => {
	const [message, setMessage] = useState<string>();
	const [creditsLeft, setCreditsLeft] = useState(0);

	const { user, isRoot } = useAuthContext();
	const { getGroupUsage, settings } = useSettingsContext();

	const groupname = user?.attributes['custom:group_name'];

    

	useEffect(() => {
		if (!groupname || !settings?.['custom:created_at']) {
			return;
		}
		(async () => {
			try {
                setMessage('Thanks for upgrading your account!');
			} catch (err) {
				console.log('Error fetching usage details', err);
			}
		})();
	}, [groupname, settings?.['custom:created_at']]);

	const isActive = !isRoot && settings?.['custom:account_type'] === AccountType.Trial && message !== undefined;

	return (
		<CardAnimatePresence isActive={isActive}>
			<div
				className="box p-5 is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-space-between has-border-primary"
				style={{ borderWidth: 1, borderStyle: 'solid' }}
			>
				<div className="is-flex is-align-items-center mr-a">
					<span className="is-size-5 has-text-primary ml-5">{message}</span>
				</div>
				<div className="is-fullwidth is-hidden-widescreen my-3"></div>
				<div className="is-flex is-align-items-center ml-a">
				</div>
			</div>
		</CardAnimatePresence>
	);
};

export default SuccessNotice;
