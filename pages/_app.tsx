import '../styles/index.scss';

import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { LayoutGroup } from 'framer-motion';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import EnrichmentsInProgress from '../components/enrich/EnrichmentsInProgress';
import Favicon from '../components/Favicon';
import SettingsLoader from '../components/SettingsLoader';
import AuthDataProvider from '../providers/auth-data-provider';
import { HeaderContextProvider } from '../providers/header-provider';
import StripeProvider from '../providers/stripe-provider';
import amplifyConfig from '../src/aws-exports';

Amplify.configure(amplifyConfig, {
	API: {
		REST: {
			headers: async () => {
				try {
					const session = await fetchAuthSession();
					const token = session.tokens?.accessToken?.toString();
					return { Authorization: token! };
				} catch (err) {
					console.log('Error fetching access token in amplify configuration', err);
					return { Authorization: '' };
				}
			},
		},
	},
});

const NewApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<ToastContainer />
			<HeaderContextProvider>
				<AuthDataProvider>
					<StripeProvider>
						<SettingsLoader />
						<Favicon />
						<LayoutGroup>
							<Component {...pageProps} />
							<EnrichmentsInProgress />
						</LayoutGroup>
					</StripeProvider>
				</AuthDataProvider>
			</HeaderContextProvider>
		</>
	);
};

export default NewApp;
