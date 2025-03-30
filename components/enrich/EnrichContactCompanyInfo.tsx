import { ContactPerson } from '../../types';
import { formatNumber } from '../../utils/helper-utils';
import Anchor from '../Anchor';
import Card from '../cards/Card';
import IconLinkedin from '../icons/IconLinkedin';
import Slot from '../Slot';
import EnrichInfo from './EnrichInfo';
import EnrichLocation from './EnrichLocation';
import EnrichMap from './EnrichMap';
import EnrichTitle from './EnrichTitle';

const EnrichContactCompanyInfo = ({ contact }: { contact: ContactPerson }) => {
	const companyLocation = {
		locality: contact.companyAddressLine1 || contact.companyName,
		addressLine2: contact.companyAddressLine2,
		region: contact.companyRegion,
		majorMetroCity: contact.companyCity,
		majorMetroState: contact.companyRegion,
	};

	return (
		<Card>
			<Slot slot="header">
				<EnrichTitle enrichLabel="" icon={<>storefront</>}>
					Company Info
				</EnrichTitle>
			</Slot>
			<Slot slot="body">
				<div className="panel-block is-block">
					<div className="columns is-mobile is-multiline">
						<div className="column is-12-mobile is-4-desktop">
							<EnrichInfo name="Company Name" description={contact.companyName} />
							<EnrichInfo name="Industry" description={contact.companyPrimaryIndustry} />
							<EnrichInfo name="Size" description={formatNumber(contact.companyEmployees)} />
							<EnrichInfo name="Revenue" description={contact.companyRevenueRange} />
							<EnrichInfo name="SIC" description={contact.companySICCode6} />
							<EnrichInfo name="NAICS Description" description={contact.companyNAICSCode} />
						</div>
						<div className="column is-12-mobile is-4-desktop">
							<EnrichInfo name="HQ Phone Number" description={contact.companyPhone} />
							{contact.companyDomain ? (
								<EnrichInfo
									name="Website"
									description={
										<Anchor href={contact.companyDomain} className="is-normalcase" target="_blank">
											{contact.companyDomain}
										</Anchor>
									}
								/>
							) : null}

							{contact.companyLinkedinUrl ? (
								<>
									<EnrichInfo
										name="Social Profiles"
										description={
											<>
												{contact.companyLinkedinURL ? (
													<>
														<Anchor className="contact-social" target="_blank" href={`https://${contact.companyLinkedinURL}`}>
															<IconLinkedin />
														</Anchor>
													</>
												) : null}
											</>
										}
									/>
								</>
							) : null}
							<EnrichInfo name="Followers" description={formatNumber(contact.companyLinkedinFollowers)} />
						</div>
						<div className="column is-12-mobile is-4-desktop">
							<EnrichInfo name="Location" description={<EnrichLocation location={companyLocation} />} />
							<EnrichMap location={companyLocation} />
						</div>
					</div>
				</div>
			</Slot>
		</Card>
	);
};

export default EnrichContactCompanyInfo;
