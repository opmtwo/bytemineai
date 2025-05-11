import React from "react";
import Link from "next/link";
import Card from "../cards/Card";
import CardTitle from "../CardTitle";
import FormButton from "../form/FormButton";
import Slot from "../Slot";
import FormButtonNew from "../form/FormButtonNew";
const SubscriptionCard = () => {
  return (
    <>
      <Card>
        <Slot slot="header">
          <div className="is-flex-grow-1">
            <CardTitle>Subscription</CardTitle>
          </div>
          <Link passHref href="/account-settings/subscription-billing/plan">
            <FormButtonNew type="button">
              Upgrade
            </FormButtonNew>
          </Link>
        </Slot>
        <Slot slot="body">
          <div
            className="pannel-block is-relative p-6"
            style={{ minHeight: "245px" }}
          >
            <div className=" is-flex is-justify-content-space-around py-5">
              <div className="has-text-centered">
                <h1 className="has-text-primary is-size-5">All-Inclusive</h1>
                <h1 className="has-text-grey">Plan Type</h1>
              </div>
              <div className="has-text-centered">
                <h1 className="has-text-primary is-size-5">10k</h1>
                <h1 className="has-text-grey">Extra Credits</h1>
              </div>
            </div>
            <div className="is-flex is-justify-content-space-around mt-5 pt-1 pb-3">
              <div className="has-text-centered">
                <h1 className="has-text-primary is-size-5">Jun 22,2022</h1>
                <h1 className="has-text-grey">Next Renewal</h1>
              </div>
              <div className="has-text-centered mr-3">
                <h1 className="has-text-primary is-size-5">$300</h1>
                <h1 className="has-text-grey">Amount</h1>
              </div>
            </div>
            <h1 className="has-text-grey has-text-centered pt-5">
              Cancel Subscription
            </h1>
          </div>
        </Slot>
      </Card>
    </>
  );
};

export default SubscriptionCard;
