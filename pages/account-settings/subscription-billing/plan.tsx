import React from "react";
import Head from "next/head";
import ModGuard from "../../../guards/ModGuard";
import PageLayout from "../../../components/layouts/PageLayout";
import SectionPlan from "../../../components/sections/choose-plan/SectionPlan";

const Plan = () => {
  return (
    <>
      <Head>
        <title>Subscription & Billing</title>
        <meta name="description" content="" />
        <img src="https://ct.capterra.com/capterra_tracker.gif?vid=2224570&vkey=abc74a82315214f8537ce165337e9ff0" alt="" />
      </Head>
      <ModGuard>
        <PageLayout size="is-max-widescreen">
          <SectionPlan />
        </PageLayout>
      </ModGuard>
    </>
  );
};

export default Plan;
