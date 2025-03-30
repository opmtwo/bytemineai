import Card from './cards/Card';
import CardAnimatePresence from './cards/CardAnimatePresence';
import CardTitle from './CardTitle';
import Info from './Info';
import Loader from './Loader';
import Slot from './Slot';

const Usage = ({
	isBusy,
	users,
	searches,
	creditsUsed,
	creditsLeft,
	date,
	onDateSelect,
}: {
	isBusy?: boolean;
	users: number;
	searches: number;
	creditsUsed: number;
	creditsLeft: number;
	date?: string;
	onDateSelect: () => void;
}) => (
	<Card>
		<Slot slot="header">
			<CardTitle>Usage</CardTitle>
		</Slot>
		<Slot slot="body">
			<div className="panel-block is-block is-relative">
				<CardAnimatePresence isActive={isBusy ? true : false}>
					<div className="is-overlay has-background-white is-flex is-align-items-center is-justify-content-center" style={{ opacity: 0.9 }}>
						<Loader />
					</div>
				</CardAnimatePresence>
				<div className="columns is-mobile is-multiline">

					<div className="column is-6-mobile is-3-tablet">
						<Info name="Credits Used Last 30 Days" value={creditsUsed} />
					</div>
                    <div className="column is-6-mobile is-3-tablet">
                        <Info name="Searches Total" value={searches} />
                    </div>
					<div className="column is-6-mobile is-3-tablet">
						<Info name="Users Total" value={users} />
					</div>

				</div>
			</div>
		</Slot>
	</Card>
);

export default Usage;
