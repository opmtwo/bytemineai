import { useState } from 'react';
import { API, Auth } from 'aws-amplify';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { ContactCompany, ContactPerson, EnrichType } from '../../../types';
import EnrichMenu from '../../EnrichMenu';
import EnrichSearch from '../../EnrichSearch';
import Message from '../../Message';
import { genericErrorMessage } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EnrichContactExperience from '../../enrich/EnrichContactExperience';
import EnrichContactInfo from '../../enrich/EnrichContactInfo';
import EnrichContactEducation from '../../enrich/EnrichContactEducation';
import EnrichContactSkills from '../../enrich/EnrichContactSkills';
import EnrichContactCompanyInfo from '../../enrich/EnrichContactCompanyInfo';
import { downloadContactPersonExportList } from '../../../utils/contact-utilsx';
import EnrichToolbar from '../../enrich/EnrichToolbar';
import EnrichSkeleton from '../../enrich-skeleton';
import TrialNotice from '../../TrialNotice';
import { useSettingsContext } from "../../../providers/settings-provider";
import { useRouter } from 'next/router';

const SectionEnrichPhone = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [contactItems, setContactItems] = useState<ContactPerson[]>([]);
	const [companyItems, setCompanyItems] = useState<ContactCompany[]>([]);
	const [isListMode, setIsListMode] = useState(false);

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

    const router = useRouter();
    const { settings, canUpgrade } = useSettingsContext();
    const onCustomize = async () => {
        await router.push({ pathname: '/account-settings/subscription-billing/plan' });
    }
    const isTrailAccount = canUpgrade;

	const getTerm = (term: string) => term;

	const getIsTermValid = (term: string) => {
		return isMobilePhone(term);
	};

	const getIsFormValid = async (term: string) => {
		if (!getIsTermValid(term)) {
			return new Error(`Invalid Phone`);
		}
		return true;
	};

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const search = async (term: string) => {
		let response;
		const options = await getInput({
			groupId: groupname,
			mobilePhone: term,
		});
		try {
			response = await API.post('nymblrRestApi', '/api/enrich/contact', options);
			if (response?.contactId) {
				setContactItems([response]);
			} else {
				setError(new Error('No records found'));
			}
		} catch (err) {
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			return;
		}
	};

	const onSubmit = async (term: string) => {
		setIsBusy(true);
		setContactItems([]);
		setCompanyItems([]);
		setError(undefined);
		await search(term);
		setIsBusy(false);
	};

	const onDownload = () => {
		downloadContactPersonExportList(contactItems);
	};

	// console.log({ contactItems });
	// console.log({ companyItems });

	return (
		<>
        {isTrailAccount ? (
                <TrialNotice onCustomize={onCustomize} />
                ):(<div></div>)}
			<EnrichMenu />
			<EnrichSearch
				type={EnrichType.Phone}
				// title="Phone Number Enrichment"
				// subtitle="Get contact and company info"
				placeholder="Enter phone number"
				getTerm={getTerm}
				getIsTermValid={getIsTermValid}
				getIsFormValid={getIsFormValid}
				onSubmit={onSubmit}
			/>
			<CardAnimatePresence isActive={error !== undefined}>
				<div className="pb-5">
					<Message color="is-info" className="has-text-centered">
						<p>{error?.message}</p>
					</Message>
				</div>
			</CardAnimatePresence>
			{isBusy ? <EnrichSkeleton /> : null}
			{contactItems.map((item) => (
				<section key={item.contactId}>
					<EnrichToolbar isListMode={isListMode} onListModeToggle={setIsListMode} onDownload={onDownload} />
					<EnrichContactInfo contact={item} isListMode={isListMode} onDownload={onDownload} />
					{isListMode ? (
						<>
							<div className="columns is-mobile is-multiline">
								<div className="column is-12-mobile is-4-desktop is-flex">
									<EnrichContactExperience contact={item} />
								</div>
								<div className="column is-12-mobile is-4-desktop is-flex">
									<EnrichContactEducation contact={item} />
								</div>
								<div className="column is-12-mobile is-4-desktop is-flex">
									<EnrichContactSkills contact={item} />
								</div>
							</div>
							<EnrichContactCompanyInfo contact={item} />
						</>
					) : null}
				</section>
			))}
		</>
	);
};

export default SectionEnrichPhone;
