import { ContactPerson } from '../../types';
import Anchor from '../Anchor';
import IconLinkedin from '../icons/IconLinkedin';
import EnrichInfo from './EnrichInfo';
import EnrichLocation from './EnrichLocation';
import EnrichMap from './EnrichMap';

const EnrichContactInfoList = ({ contact }: { contact: ContactPerson }) => {
	return (
		<div className="panel-block is-block">
			<div className="columns is-mobile is-multiline">
				<div className="column is-12-mobile is-4-desktop">
					<EnrichInfo name="Confidence Score" description={contact.confidenceScore} />
					<EnrichInfo name="Company" description={contact.companyName} />
					<EnrichInfo name="Job Title" description={contact.contactTitle} />
					<EnrichInfo name="Seniority" description={contact.contactTitleLevel[0]} />
					<EnrichInfo name="Department" description={contact.contactJobFunctions} />

				</div>
				<div className="column is-12-mobile is-4-desktop">
					<EnrichInfo name="Direct Dial" description={contact.directDialPhone} />
					{contact.contactEmail ? (
						<EnrichInfo name="Work Email" description={<span className="is-lowercase">{contact.contactEmail}</span>} />
					) : null}
					{contact.contactPersonalEmail ? (
						<EnrichInfo name="Personal Email" description={<span className="is-lowercase">{contact.contactPersonalEmail}</span>} />
					) : null}
					<EnrichInfo
						name="Social Profiles"
						description={
							<>
								{contact.contactLinkedinURL ? (
									<>
										<Anchor className="contact-social" target="_blank" href={`https://${contact.contactLinkedinURL}`}>
											<IconLinkedin />
										</Anchor>
									</>
								) : null}
							</>
						}
					/>
				</div>
				<div className="column is-12-mobile is-4-desktop">
					<EnrichInfo
						name="Location"
						description={
							<EnrichLocation
								location={{
									locality: contact.contactState,
									majorMetroCity: contact.contactCity,
									postalCode: contact.contactZipCode,
									country: '',
									continent: '',
								}}
							/>
						}
					/>
					<EnrichMap
						location={{
							majorMetroCity: contact.contactCity,
							region: contact.contactState,
							country: '',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default EnrichContactInfoList;
