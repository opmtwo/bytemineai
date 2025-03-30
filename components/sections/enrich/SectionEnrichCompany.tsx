import { useState } from 'react';
import { useRouter } from 'next/router';
import { API, Auth } from 'aws-amplify';
import isValidDomain from 'is-valid-domain';
import { ContactCompany, EnrichType } from '../../../types';
import { getHostname } from '../../../utils/helper-utils';
import EnrichMenu from '../../EnrichMenu';
import EnrichSearch from '../../EnrichSearch';
import Message from '../../Message';
import { genericErrorMessage } from '../../../consts';
import Loader from '../../Loader';
import { useAuthContext } from '../../../providers/auth-data-provider';
import EnrichCompanyInfo from '../../enrich/EnrichCompanyInfo';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EnrichToolbar from '../../enrich/EnrichToolbar';
import { downloadCompanyExportList } from '../../../utils/contact-utilsx';
import EnrichSkeleton from '../../enrich-skeleton';
import TrialNotice from '../../TrialNotice';
import { useSettingsContext } from "../../../providers/settings-provider";

const SectionEnrichCompany = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [items, setItems] = useState<ContactCompany[]>([]);
	const [isListMode, setIsListMode] = useState(false);

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

    const router = useRouter();
    const { settings, canUpgrade } = useSettingsContext();
    const onCustomize = async () => {
        await router.push({ pathname: '/account-settings/subscription-billing/plan' });
    }
    const isTrailAccount = canUpgrade;

	const getTerm = (term: string) => {
		return getHostname(term);
	};

	const getIsTermValid = (term: string) => {
		return isValidDomain(term);
	};

	const getIsFormValid = async (term: string) => {
		if (!getIsTermValid(term)) {
			return new Error(`Invalid domain`);
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
			domain: term,
		});
		try {
			response = await API.post('nymblrRestApi', '/api/enrich/company', options);
			if (response?.id) {
				setItems([response]);
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
		setItems([]);
		setError(undefined);
		await search(term);
		setIsBusy(false);
	};

	const onDownload = () => {
		downloadCompanyExportList(items);
	};

	// console.log({ items });

	return (
		<>
        {isTrailAccount ? (
                <TrialNotice onCustomize={onCustomize} />
                ):(<div></div>)}
			<EnrichMenu />
			<EnrichSearch
				type={EnrichType.Company}
				// title="Company Enrichment"
				// subtitle="Get contact and company info"
				placeholder="Enter company domain"
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
			{items.map((item) => (
				<>
					<EnrichToolbar isListMode={isListMode} onListModeToggle={setIsListMode} onDownload={onDownload} />
					<EnrichCompanyInfo key={item.id} company={item} isListMode={isListMode} onDownload={onDownload} />
				</>
			))}
		</>
	);
};

export default SectionEnrichCompany;
