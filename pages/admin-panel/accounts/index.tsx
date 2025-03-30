import RootGuard from '../../../guards/RootGuard';
import Redirect from '../../../components/Redirect';

const AdminPanelAccount = () => {
	return (
		<RootGuard>
			<Redirect pathname="/admin-panel" />
		</RootGuard>
	);
};

export default AdminPanelAccount;
