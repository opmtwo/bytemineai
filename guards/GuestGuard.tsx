import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../providers/auth-data-provider';
import Redirect from '../components/Redirect';
import { useSearchParams } from 'next/navigation';

const GuestGuard = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { isAuthBusy, attributes } = useAuthContext();

	let asPath;
	if (typeof searchParams.get('asPath') === 'string') {
		asPath = searchParams.get('asPath');
	}

	if (isAuthBusy) {
		return null;
	}

	if (attributes?.sub) {
		return <Redirect pathname="/" continuePath={asPath ? (asPath as string) : undefined} />;
	}

	return <>{children}</>;
};

export default GuestGuard;
