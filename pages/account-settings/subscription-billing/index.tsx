import Head from "next/head";
import ModGuard from "../../../guards/ModGuard";
import PageLayout from "../../../components/layouts/PageLayout";
import SectionSubscriptionBilling from "../../../components/sections/subscription-billing/SectionSubscriptionBilling";
const subscriptionBilling = () => {
  return (
    <ModGuard>
      <Head>
        <title>Subscription & Billing</title>
        <meta name="description" content="" />
      </Head>
      <PageLayout>
        <SectionSubscriptionBilling />
      </PageLayout>
    </ModGuard>
  );
};
export default subscriptionBilling;
