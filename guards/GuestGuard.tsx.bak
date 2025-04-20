import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../providers/auth-data-provider';
import Redirect from '../components/Redirect';

const GuestGuard = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { isAuthBusy, user } = useAuthContext();

	if (isAuthBusy) {
		return null;
	}

	if (user && user.attributes.sub && router.pathname !== '/verify-email'  && router.pathname !== '/resend') {
		return <Redirect pathname="/" continuePath={router.asPath} />;
	}

	return <>{children}</>;
};

export default GuestGuard;
