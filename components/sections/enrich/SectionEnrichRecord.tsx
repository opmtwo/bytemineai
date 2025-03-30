import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { genericErrorMessage } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import { ContactPerson, EnrichType } from '../../../types';
import { downloadContactPersonExportList } from '../../../utils/contact-utilsx';
import EnrichContactCompanyInfo from '../../enrich/EnrichContactCompanyInfo';
import EnrichContactEducation from '../../enrich/EnrichContactEducation';
import EnrichContactExperience from '../../enrich/EnrichContactExperience';
import EnrichContactInfo from '../../enrich/EnrichContactInfo';
import EnrichContactSkills from '../../enrich/EnrichContactSkills';
import EnrichHeader from '../../enrich/EnrichHeader';
import EnrichToolbar from '../../enrich/EnrichToolbar';
import EnrichMenu from '../../EnrichMenu';
import EnrichSearch from '../../EnrichSearch';
import IconEnrichRecord from '../../icons/IconEnrichRecord';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import TrialNotice from '../../TrialNotice';

const SectionEnrichRecord = () => {
	// list of contacts
	const [contactItems, setContactItems] = useState<ContactPerson[]>([]);

	// busy and error status
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	// is list mode
	const [isListMode, setIsListMode] = useState(true);

	// next router
	const router = useRouter();

	// current user and group
	const { user, groups } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	// is user on trial
	const { canUpgrade } = useSettingsContext();

	// on upgrade go to billing
	const onCustomize = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	};

	// trial?
	const isTrailAccount = canUpgrade;

	// get search term
	const getTerm = (term: string) => term;

	/**
	 * @summary
	 * Validate linkedin profile url
	 *
	 * @see
	 * https://stackoverflow.com/a/23917081/17117328
	 * https://stackoverflow.com/questions/8450403/how-to-validate-a-linkedin-public-profile-url
	 *
	 * @param term Input linkedin url
	 * @returns {boolean}
	 */
	const getIsValidLinkedin = (term: string) => {
		const matches = term.match(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/);
		return matches?.length ? true : false;
	};

	const getIsValidPhone = (term: string) => {
		return isMobilePhone(term);
	};

	const getIsValidEmail = (term: string) => {
		return isEmail(term);
	};

	const getIsTermValid = (term: string) => {
		// check linkedin
		if (getIsValidLinkedin(term)) {
			return true;
		}

		// check phone
		if (getIsValidPhone(term)) {
			return true;
		}

		// check phone
		if (getIsValidEmail(term)) {
			return true;
		}

		return false;
	};

	const getIsFormValid = async (term: string) => {
		// valid?
		if (getIsTermValid(term)) {
			return true;
		}

		// not valid
		return new Error(`Please enter a valid linkedin profile url, phone number or email address`);
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
		const linkedinUrl = getIsValidLinkedin(term) ? term : null;
		const mobilePhone = getIsValidPhone(term) ? term : null;
		const emailAddress = getIsValidEmail(term) ? term : null;
		const options = await getInput({
			groupId: groupname,
			linkedinUrl,
			mobilePhone,
			emailAddress,
		});
		try {
			response = await API.post('nymblrRestApi', '/api/enrich/contact', options);
			console.log(response);
			if (response?.contactid) {
				setContactItems([response]);
			} else {
				setError(new Error('No records found'));
			}
		} catch (err) {

			console.log('search - error: ', err);
			setError(new Error('No records found'));
			//setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			return;
		}
	};

	const onSubmit = async (term: string) => {
		setIsBusy(true);
		setContactItems([]);
		setError(undefined);
		await search(term);
		setIsBusy(false);
	};

	const onDownload = () => {
		downloadContactPersonExportList(contactItems);
	};

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : null}
			<EnrichMenu />
			<ErrorNotificaition error={error} className="has-text-centered pb-5" />
			<EnrichHeader title="Record Enrichment" text="Enrich phone number, email address, or personal LinkedIn profile." icon={<IconEnrichRecord />}>
				<EnrichSearch
					type={EnrichType.All}
					placeholder="Enter phone, email, or LinkedIn profile"
					getTerm={getTerm}
					getIsTermValid={getIsTermValid}
					getIsFormValid={getIsFormValid}
					onSubmit={onSubmit}
				/>
			</EnrichHeader>
			{contactItems.map((item) => (
				<section key={item.contactId}>
					<EnrichToolbar isListMode={isListMode} onListModeToggle={setIsListMode} onDownload={onDownload} />
					<EnrichContactInfo contact={item} isListMode={isListMode} onDownload={onDownload} />
					{isListMode ? null : (
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
					)}
				</section>
			))}
		</>
	);
};

export default SectionEnrichRecord;
