import AccountMenu from '../../AccountMenu';
import SubscriptionBilling from '../../subscription/SubscriptionBilling';
const SectionSubscriptionBilling = () => {
	return (
		<div className="columns is-tablet">
			<div className="column is-3-tablet is-2-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-9-tablet is-10-widescreen">
				<SubscriptionBilling/>
			</div>
		</div>
	);
};

export default SectionSubscriptionBilling;
