import Card from '../cards/Card';
import Slot from '../Slot';
import EnrichTitle from './EnrichTitle';
import { ContactPerson } from '../../types';
import EnrichSpecialties from './EnrichSpecialties';

const EnrichContactSkills = ({ contact }: { contact: ContactPerson }) => {
	return (
		<Card className="is-fullwidth">
			<Slot slot="header">
				<EnrichTitle enrichLabel={''} icon={<>emoji_events</>}>Skills</EnrichTitle>
			</Slot>
			<Slot slot="body">
				<div className="panel-block is-block">
					<EnrichSpecialties values={contact.contactSkills} />
					{!contact.contactSkills.length ? <p className="pb-6 mb-6">Not Available</p> : null}
				</div>
			</Slot>
		</Card>
	);
};

export default EnrichContactSkills;
