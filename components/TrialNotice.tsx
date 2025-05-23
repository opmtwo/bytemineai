import moment from 'moment';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../providers/auth-data-provider';
import { AccountType } from '../types';
import CardAnimatePresence from './cards/CardAnimatePresence';
import FormButton from './form/FormButton';
import FormButtonNew from './form/FormButtonNew';
import IconClock from './icons/IconClock';

const TrialNotice = ({ onCustomize }: { onCustomize: () => void }) => {
	const [message, setMessage] = useState<string>();
	const [creditsLeft, setCreditsLeft] = useState(0);

	const { team, isTrial, subscription } = useAuthContext();

	useEffect(() => {
		if (!team?.id) {
			return;
		}
		(async () => {
			try {
				const now = moment();
				const then = moment.unix(parseInt(team?.createdAt || '') / 1000).add(1, 'days');
				setCreditsLeft(subscription?.currentCredits || 0);

				if (now > then && (subscription?.currentCredits || 50) <= 0) {
					setMessage('Upgrade now and save 15%, use code NYMBLR15 at checkout.');
					return;
				}

				const diffDates = then.diff(now);
				const timeData = moment.duration(diffDates);
				const days = timeData.days();
				const hours = timeData.hours();
				const minutes = timeData.minutes();

				let message = 'Upgrade within ';

				if (days > 0) {
					message = `${message} ${days} days `;
				}

				if (hours > 0) {
					message = `${message} ${hours} hours `;
				}

				if (minutes > 0) {
					message = `${message} ${minutes} minutes `;
				}

				message = `${message} and save 20%, use code NYMBLR20 at checkout.`;
				setMessage(message);
			} catch (err) {
				console.log('Error fetching usage details', err);
			}
		})();
	}, [team?.id]);

	return null

	return (
		<CardAnimatePresence isActive={subscription?.id !== undefined && isTrial ? true : false}>
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
					<FormButtonNew type="button" onClick={onCustomize} className="ml-5">
						Upgrade
					</FormButtonNew>
				</div>
			</div>
		</CardAnimatePresence>
	);
};

export default TrialNotice;
