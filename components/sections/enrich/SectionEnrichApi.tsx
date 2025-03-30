import { useRouter } from 'next/router';
import { useSettingsContext } from '../../../providers/settings-provider';
import ApiForm from '../../ApiForm';
import EnrichMenu from '../../EnrichMenu';
import TrialNotice from '../../TrialNotice';

const SectionEnrichApi = () => {
	const router = useRouter();
	const { canUpgrade } = useSettingsContext();

	const onCustomize = async () => {
		await router.push({ pathname: '/account-settings/subscription-billing/plan' });
	};

	const isTrailAccount = canUpgrade;

	return (
		<>
			{isTrailAccount ? <TrialNotice onCustomize={onCustomize} /> : null}
			<EnrichMenu />
			<ApiForm />
		</>
	);
};

export default SectionEnrichApi;
