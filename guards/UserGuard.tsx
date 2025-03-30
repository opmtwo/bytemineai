import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../providers/auth-data-provider';
import Redirect from '../components/Redirect';

const UserGuard = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { isAuthBusy, user, isExpired } = useAuthContext();

	if (isAuthBusy) {
		return null;
	}


	if (!user || !user.attributes.sub) {
		return <Redirect pathname="/login" continuePath={router.asPath} />;
	}

	if (user && user.attributes.sub && !user.attributes['custom:verificationdate'] &&  router.pathname !== '/verify-email' &&  router.pathname !== '/resend'){

		let outemail = user?.attributes.email || '';
		router.push({pathname:"/verify-email", query: {email:outemail}});
	}

	// if (isExpired() &&  router.pathname !== '/') {
	// 	return <Redirect pathname="/" />;
	// }

	return <>{children}</>;
};

export default UserGuard;
