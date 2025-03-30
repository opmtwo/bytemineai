import { ContactPerson } from '../../types';
import Card from '../cards/Card';
import Slot from '../Slot';
import EnrichDuration from './EnrichDuration';
import EnrichTitle from './EnrichTitle';

const EnrichContactEducation = ({ contact }: { contact: ContactPerson }) => {
	return (
		<Card className="is-fullwidth">
			<Slot slot="header">
				<EnrichTitle enrichLabel={''} icon={<>school</>}>
					Education
				</EnrichTitle>
			</Slot>
			<Slot slot="body">
				<div className="panel-block is-block">
					{contact.contactEducation.map((edu) => (
						<div key={edu.schoolName} className="mb-5">
							<p>{edu.degrees.join(', ')}</p>
							<p className="is-capitalized">{edu.schoolName}</p>
							<p>
								<EnrichDuration startDate={edu.startDate} endDate={edu.endDate} />
							</p>
						</div>
					))}
					{!contact.contactEducation.length ? <p className="pb-6 mb-6">Not Available</p> : null}
				</div>
			</Slot>
		</Card>
	);
};

export default EnrichContactEducation;
