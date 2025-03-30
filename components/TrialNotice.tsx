import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../providers/auth-data-provider';
import { useSettingsContext } from '../providers/settings-provider';
import { AccountType } from '../types';
import CardAnimatePresence from './cards/CardAnimatePresence';
import FormButton from './form/FormButton';
import IconClock from './icons/IconClock';

const TrialNotice = ({ onCustomize }: { onCustomize: () => void }) => {
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
				const usage = await getGroupUsage(groupname);
				const now = moment();				
				const then = moment.unix(parseInt(settings?.['custom:created_at'] || '') / 1000).add(1, 'days');
				setCreditsLeft((usage?.totalCredits || 0) - (usage?.totalUsage || 0));
				if (now > then || usage?.isExpired) {
                    setMessage('Upgrade now and save 15%, use code NYMBLR15 at checkout.');
				} else {
					const diffDates=then.diff(now)
					const timeData=moment.duration(diffDates);
		            const days=timeData.days();
					const hours=timeData.hours();
					const minutes=timeData.minutes();
				
					let message="Upgrade within ";

					if(days > 0){
						message=`${message} ${days} days `;
					}
					if(hours > 0){
						message=`${message} ${hours} hours `;
					}
					if(minutes > 0){
						message=`${message} ${minutes} minutes `;
					}
                    message=`${message} and save 20%, use code NYMBLR20 at checkout.`
    				setMessage(message);
				}
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
				style={{ borderWidth: 1, borderStyle: 'solid', marginBottom: 20 }}
			>
				<div className="is-flex is-align-items-center mr-a">
					<IconClock />
					<span className="is-size-5 has-text-primary ml-5">{message}</span>
				</div>
				<div className="is-fullwidth is-hidden-widescreen my-3"></div>
				<div className="is-flex is-align-items-center ml-a">
					<FormButton onClick={onCustomize} variant={['is-ui-button']} className="ml-5">
						Upgrade
					</FormButton>
				</div>
			</div>
		</CardAnimatePresence>
	);
};

export default TrialNotice;
