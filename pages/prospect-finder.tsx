import React from "react";
import Head from "next/head";
import UserGuard from "../guards/UserGuard";
import PageLayout from "../components/layouts/PageLayout";
import SectionProspectFinder from "../components/sections/prospect-finder/SectionProspectFinder";

const ProspectFinder = () => {
  return (
    <React.Fragment>
      <UserGuard>
          <Head>
              <img alt="" src="https://ct.capterra.com/capterra_tracker.gif?vid=2224570&vkey=abc74a82315214f8537ce165337e9ff0" />
              <title>Prospect Finder</title>
              <meta name="description" content="" />
          </Head>
        <PageLayout>
          <SectionProspectFinder />
        </PageLayout>
      </UserGuard>
    </React.Fragment>
  );
};

export default ProspectFinder;
