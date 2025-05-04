import ApiForm from '../../ApiForm';
import Breadcrumb from '../../Breadcrumb';

const SectionApi = () => {
	return (
		<>
			<Breadcrumb title="API Keys" items={[{ label: 'API Keys', href: '/my-team', isCurrent: true }]} />

			<ApiForm />
		</>
	);
};

export default SectionApi;
