import React from "react";
import SubscriptionInvoices from "./SubscriptionInvoices";
import CreditCard from "./CreditCard";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionBilling = () => {
  return (
    <>
      <div className="columns is-tablet">
        <div className="column is-6-tablet is-6-widescreen">
          <SubscriptionCard />
        </div>
        <div className="column is-6-tablet is-6-widescreen">
          <CreditCard />
        </div>
      </div>
      <SubscriptionInvoices />
    </>
  );
};
export default SubscriptionBilling;
