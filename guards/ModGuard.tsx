import { ReactNode } from 'react';
import { useAuthContext } from '../providers/auth-data-provider';
import Redirect from '../components/Redirect';
import { Roles } from '../types';

const ModGuard = ({ children }: { children: ReactNode }) => {
	const { isAuthBusy, user, isAdmin, isRoot } = useAuthContext();
	const isManager = user?.attributes['custom:role'] !== Roles.Manager;

	if (isAuthBusy) {
		return null;
	}

	if (!user || !user.attributes.sub || (!isRoot && !isAdmin && !isManager)) {
		return <Redirect pathname="/" />;
	}

	return <>{children}</>;
};

export default ModGuard;
