import React from "react";
import Head from "next/head";
import UserGuard from "../guards/UserGuard";
import PageLayout from "../components/layouts/PageLayout";
import SectionAudienceBuilder from "../components/sections/audience-builder/SectionAudienceBuilder";

const AudienceBuilder = () => {
  return (
    <React.Fragment>
      <UserGuard>
          <Head>

              <title>Audience Builder</title>
              <meta name="description" content="" />
          </Head>
        <PageLayout>
          <SectionAudienceBuilder />
        </PageLayout>
      </UserGuard>
    </React.Fragment>
  );
};

export default AudienceBuilder;
