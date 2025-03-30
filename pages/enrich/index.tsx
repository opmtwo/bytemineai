import UserGuard from '../../guards/UserGuard';
import Redirect from '../../components/Redirect';

const EnrichIndex = () => {
	return (
		<UserGuard>
			<Redirect pathname="/enrich/record" />
		</UserGuard>
	);
};

export default EnrichIndex;
