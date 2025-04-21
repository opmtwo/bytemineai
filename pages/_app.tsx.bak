import { AppProps } from "next/app";
import Head from "next/head";
import Amplify from "@aws-amplify/core";
import { ToastContainer } from "react-toastify";

import amplifyConfig from "../src/aws-exports";
import AuthDataProvider from "../providers/auth-data-provider";
import SettingsProvider from "../providers/settings-provider";
import StripeProvider from "../providers/stripe-provider";
import "../styles/index.scss";
import { AnimateSharedLayout } from "framer-motion";
import SettingsLoader from "../components/SettingsLoader";
import Favicon from "../components/Favicon";
import Script from "next/script";
import EnrichmentsInProgress from "../components/enrich/EnrichmentsInProgress";


Amplify.configure(amplifyConfig);

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
            <AnimateSharedLayout>
              <Component {...pageProps} />
              <EnrichmentsInProgress />
            </AnimateSharedLayout>
          </StripeProvider>
        </SettingsProvider>
      </AuthDataProvider>
    </>
  );
};

export default NewApp;
