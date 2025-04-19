import '../styles/index.scss';

// import Amplify from "@aws-amplify/core";
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { LayoutGroup } from 'framer-motion';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import EnrichmentsInProgress from '../components/enrich/EnrichmentsInProgress';
import Favicon from '../components/Favicon';
import SettingsLoader from '../components/SettingsLoader';
import AuthDataProvider from '../providers/auth-data-provider';
import SettingsProvider from '../providers/settings-provider';
import StripeProvider from '../providers/stripe-provider';
import amplifyConfig from '../src/aws-exports';

// Amplify.configure(amplifyConfig);

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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
			        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			        })(window,document,'script','dataLayer','GTM-MKDRX86');
			      `}
      </Script>
      <ToastContainer />
      <AuthDataProvider>
        <SettingsProvider>
          <StripeProvider>
            <SettingsLoader />
            <Favicon />
            <LayoutGroup>
              <Component {...pageProps} />
              <EnrichmentsInProgress />
            </LayoutGroup>
          </StripeProvider>
        </SettingsProvider>
      </AuthDataProvider>
    </>
  );
};

export default NewApp;
