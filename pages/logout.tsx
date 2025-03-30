import { useEffect } from 'react';
import Head from 'next/head';
import { useAuthContext } from '../providers/auth-data-provider';

const Logout = () => {
	const { onSignOut } = useAuthContext();

	useEffect(() => {
		onSignOut();
		document.body.style.removeProperty('--primary');
	}, [onSignOut]);

	return (
		<Head>
			<title>Logout</title>
			<meta name="description" content="" />
		</Head>
	);
};

export default Logout;
