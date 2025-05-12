import { useEffect, useState } from 'react';

import { IBytemineUsage, IBytemineUser } from '../../../../types';
import { callApi } from '../../../../utils/helper-utils';
import Card from '../../../Card';
import Slot from '../../../Slot';

const SettingsUsageInfo = () => {
	const [users, setUsers] = useState<IBytemineUser[]>([]);

	const [usageItems, setUsageItems] = useState<IBytemineUsage[]>([]);

	const [creditsUsed, setCreditsUsed] = useState(0);

	useEffect(() => {
		getUsage();
	}, []);

	// Load usage items
	const getUsage = async () => {
		try {
			const res = (await callApi(null, 'api/v1/subscriptions/usage', {})) as { usage: IBytemineUsage[]; users: IBytemineUser[]; creditsUsed: number };
			setUsers(res.users);
			setUsageItems(res.usage);
			setCreditsUsed(res.creditsUsed);
		} catch (err) {
			console.log('getUsage - error', err);
		}
	};

	return (
		<>
			<h3 className="title is-4">Usage</h3>
			<Card card={{ className: 'is-clipped panel has-background-white has-font-weight-medium' }}>
				<Slot slot="header">
					<div className="columns has-text-centered has-background-white-bis has-border">
						<div className="column">
							<p className="pt-3 pb-1">
								Credits Used
								<span className="has-text-weight-normal"> (Last 30 Days)</span>
							</p>
						</div>
						<div className="column">
							<p className="pt-3 pb-1">Searches Total</p>
						</div>
						<div className="column">
							<p className="pt-3 pb-1">Users Total</p>
						</div>
					</div>
				</Slot>
				<Slot slot="body">
					<div className="columns has-text-centered is-size-6">
						<div className="column has-text-info">
							<p className="pb-5">{creditsUsed}</p>
						</div>
						<div className="column">
							<p className="pb-5">{usageItems.length}</p>
						</div>
						<div className="column">
							<p className="pb-5">{users.length}</p>
						</div>
					</div>
				</Slot>
			</Card>
		</>
	);
};

export default SettingsUsageInfo;
