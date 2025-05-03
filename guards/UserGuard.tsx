import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import Redirect from '../components/Redirect';
import { useAuthContext } from '../providers/auth-data-provider';

const UserGuard = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { isAuthBusy, attributes, isExpired } = useAuthContext();
	const searchParams = useSearchParams();

	let asPath;
	if (typeof searchParams.get('asPath') === 'string') {
		asPath = searchParams.get('asPath');
	}

	if (isAuthBusy) {
		return null;
	}

	if (!attributes?.sub) {
		return <Redirect pathname="/login" continuePath={asPath ? (asPath as string) : undefined} />;
	}

	return <>{children}</>;
};

export default UserGuard;
