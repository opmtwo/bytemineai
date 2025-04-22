import Card from '../../../Card';
import Slot from '../../../Slot';

const SettingsUsageInfo = () => {
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
							<p className="pb-5">90</p>
						</div>
						<div className="column">
							<p className="pb-5">6</p>
						</div>
						<div className="column">
							<p className="pb-5">0</p>
						</div>
					</div>
				</Slot>
			</Card>
		</>
	);
};

export default SettingsUsageInfo;
