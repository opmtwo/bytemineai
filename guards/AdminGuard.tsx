import { ReactNode } from 'react';
import { useAuthContext } from '../providers/auth-data-provider';
import Redirect from '../components/Redirect';

const AdminGuard = ({ children }: { children: ReactNode }) => {
	const { isAuthBusy, user, isAdmin, isRoot } = useAuthContext();

	if (isAuthBusy) {
		return null;
	}

	if (!user || !user.attributes.sub || (!isRoot && !isAdmin)) {
		return <Redirect pathname="/" />;
	}

	return <>{children}</>;
};

export default AdminGuard;
