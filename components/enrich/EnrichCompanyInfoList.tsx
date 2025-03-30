import { ContactCompany } from '../../types';
import { formatNumber } from '../../utils/helper-utils';
import Anchor from '../Anchor';
import IconFacebook from '../icons/IconFacebook';
import IconLinkedin from '../icons/IconLinkedin';
import Summary from '../Summary';
import EnrichInfo from './EnrichInfo';
import EnrichLocation from './EnrichLocation';
import EnrichMap from './EnrichMap';
import EnrichSpecialties from './EnrichSpecialties';

const EnrichCompanyInfoList = ({ company }: { company: ContactCompany }) => {
	return (
		<div className="panel-block is-block">
			<div className="columns is-mobile is-multiline">
				<div className="column is-12-mobile is-4-desktop">
					<EnrichInfo name="Company Name" description={company.legalName || company.name} />
					<EnrichInfo name="Industry" description={company.industry || company.name} />
					<EnrichInfo name="Size" description={formatNumber(company.employees)} />
					<EnrichInfo name="Revenue" description={company.revenueRange} />
					<EnrichInfo
						name="SIC"
						description={
							company.sicCodes?.[0]?.sicCode6 ||
							company.sicCodes?.[0]?.sicCode4 ||
							company.sicCodes?.[0]?.sicCode3 ||
							company.sicCodes?.[0]?.sicCode2
						}
					/>
					<EnrichInfo
						name="SIC Description"
						description={
							company.sicCodes?.[0]?.sicCode6Desc ||
							company.sicCodes?.[0]?.sicCode4Desc ||
							company.sicCodes?.[0]?.sicCode3Desc ||
							company.sicCodes?.[0]?.sicCode2Desc
						}
					/>
					<EnrichInfo name="NAICS Description" description={company.naicsDesc} />
				</div>
				<div className="column is-12-mobile is-4-desktop">
					<EnrichInfo name="Company Type" description={company.companyType || company.ownershipStatus} />
					<EnrichInfo name="HQ Phone Number" description={company.phone || company.otherPhones?.[0]} />
					<EnrichInfo
						name="Website"
						description={
							<Anchor href={company.website} className="is-normalcase" target="_blank">
								{company.website}
							</Anchor>
						}
					/>
					<EnrichInfo name="Direct Dial" description={company.phone || company.otherPhones?.[0]} />
					{company.linkedInIdUrl || company.facebookUrl ? (
						<EnrichInfo
							name="Social Profiles"
							description={
								<>
									{company.linkedInIdUrl ? (
										<>
											<Anchor className="contact-social" target="_blank" href={`https://${company.linkedInIdUrl}`}>
												<IconLinkedin />
											</Anchor>
										</>
									) : null}
									{company.facebookUrl ? (
										<>
											<Anchor className="contact-social" target="_blank" href={`https://${company.facebookUrl}`}>
												<IconFacebook />
											</Anchor>
										</>
									) : null}
								</>
							}
						/>
					) : null}
					<EnrichInfo name="Followers" description={formatNumber(company.linkedInFollowers)} />
				</div>
				<div className="column is-12-mobile is-4-desktop">
					{company.description ? <EnrichInfo name="About" description={<Summary text={company.description} />} />: null}
					{company.specialties?.length ? <EnrichInfo name="Specialties" description={<EnrichSpecialties values={company.specialties} />} /> : null}
					<EnrichInfo name="Location" description={<EnrichLocation location={company.location} />} />
					<EnrichMap location={company.location} />
				</div>
			</div>
		</div>
	);
};

export default EnrichCompanyInfoList;
