import React, { useState } from "react";
import ChoosePlan from "../../subscription/ChoosePlan";
import PriceRange from "../../subscription/PriceRange";
import SummaryUpgradePlan from "../../subscription/SummaryUpgradePlan";
import { useStripeContext } from "../../../providers/stripe-provider";

const SectionPlan = () => {
  const { summaryFlag } = useStripeContext();
  return (
    <>
      <ChoosePlan />
      {summaryFlag ? (
        <>
          {" "}
          <PriceRange /> <SummaryUpgradePlan />
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default SectionPlan;
