import { ReactNode } from 'react';
import { useAuthContext } from '../providers/auth-data-provider';
import Redirect from '../components/Redirect';

const RootGuard = ({ children }: { children: ReactNode }) => {
	const { isAuthBusy, user, isRoot } = useAuthContext();

	if (isAuthBusy) {
		return null;
	}

	if (!user || !user.attributes.sub || !isRoot) {
		return <Redirect pathname="/" />;
	}

	return <>{children}</>;
};

export default RootGuard;
