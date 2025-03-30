import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Redirect = ({ pathname, continuePath }: { pathname: string; continuePath?: string }) => {
	const router = useRouter();

	useEffect(() => {
		if (router.pathname !== pathname) {
			console.log('Redirect pathname', pathname);
			console.log('Redirect pathname', router.pathname);
			router.push({
				pathname,
				...(continuePath ? { query: { continue: continuePath } } : {}),
			});
		}
	}, [router.pathname]);

	return null;
};

export default Redirect;
