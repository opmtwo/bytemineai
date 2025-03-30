import { ContactPerson } from '../../types';
import Card from '../cards/Card';
import Slot from '../Slot';
import EnrichTitle from './EnrichTitle';
import EnrichDuration from './EnrichDuration';
import { sentenceCase } from 'change-case';
import EnrichSpecialties from "./EnrichSpecialties";

const EnrichContactExperience = ({ contact }: { contact: ContactPerson }) => {
	// @ts-ignore
	let fCompanies = [...new Set(contact.formerCompanies)];
	// @ts-ignore
	let fTitles = [...new Set(contact.formerTitles)];
	return (
		<Card className="is-fullwidth">
			<Slot slot="header">
				<EnrichTitle enrichLabel={''} icon={<>business_center</>}>
					Experience
				</EnrichTitle>
			</Slot>
			<Slot slot="body">
				<div className="panel-block is-block">

					<EnrichSpecialties values={fTitles} />
					<div className="mb-5 mt-5">
						<p className="is-bold">Previous Companies:</p>
					</div>
					<ul>
						{ fCompanies.map((exp) => (
							<li key={exp} className="mb-2 is-capitalized">{exp}</li>
						)) }
					</ul>
					{ /* !contact.contactExperience.length ? <p className="pb-6 mb-6">Not Available</p> : null */}
				</div>
			</Slot>
		</Card>
	);
};

export default EnrichContactExperience;
