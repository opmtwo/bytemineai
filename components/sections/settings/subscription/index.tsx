import { useState } from 'react';

import { useAuthContext } from '../../../../providers/auth-data-provider';
import { callApi } from '../../../../utils/helper-utils';
import AccountMenu from '../../../AccountMenu';
import Breadcrumb from '../../../Breadcrumb';
import FormButtonNew from '../../../form/FormButtonNew';
import LoaderFullscreen from '../../../LoaderFullscreen';
import SettingsSubscriptionPlans from './SettingsSubscriptionPlans';

const SectionSettingsSubscription = () => {
	const [isBusy, setIsBusy] = useState(false);
	const { isLoading } = useAuthContext();

	const { isActive } = useAuthContext();

	const openCustomerPortal = async () => {
		setIsBusy(true);
		try {
			const res = (await callApi(null, 'api/v1/subscriptions/me/portal', {
				method: 'GET',
			})) as { url: string };
			console.log('openCustomerPortal - success', res);
			window.location.href = res.url;
		} catch (err) {
			console.log('openCustomerPortal - error', err);
		}
		setIsBusy(false);
	};

	return (
		<>
			{isLoading ? <LoaderFullscreen /> : null}

			<div className="is-flex is-align-items-center is-justify-content-space-between">
				<Breadcrumb title="Subscription & Billing" items={[{ label: 'Subscription & Billing', href: '/settings/subscription/', isCurrent: true }]} />
				{isActive ? (
					<div className="ml-auto">
						<FormButtonNew
							type="button"
							className="is-fullwidth has-text-centered"
							variant="active"
							disabled={isBusy}
							loading={isBusy}
							onClick={openCustomerPortal}
						>
							Manage
						</FormButtonNew>
					</div>
				) : null}
			</div>

			<div className="columns is-tablet">
				<div className="column is-4-tablet is-3-widescreen">
					<AccountMenu />
				</div>
				<div className="column is-8-tablet is-9-widescreen">
					<SettingsSubscriptionPlans />
				</div>
			</div>
		</>
	);
};

export default SectionSettingsSubscription;
