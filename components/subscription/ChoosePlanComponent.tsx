import React, { useState } from "react";
import { SubscriptionPlan, formatCurrency } from "../../utils/plan-info";
import Card from "../cards/Card";
import FormButton from "../form/FormButton";
import Slot from "../Slot";
import { useStripeContext } from "../../providers/stripe-provider";
import styles from "./CardDetail.module.css";
function ChoosePlanComponent({
  plan,
  isSelected,
}: {
  plan: SubscriptionPlan;
  isSelected: boolean;
}) {
  const { setPlanValue, setSummaryFlag, setSelectedPlan } = useStripeContext();

  function getPlanValue(plan: any) {
    const value = plan.header.plan_cost;
    setPlanValue(value);
    setSummaryFlag(true);
    setSelectedPlan(plan.id);
  }
    let button;
    if (plan.buttonTxt){
        button = <FormButton
            variant={
            isSelected ? ["is-ui-button"] : ["is-outlined", "is-ui-button"]
        }
            style={{ width: "100%" }}
            onClick={() => getPlanValue(plan)}
            >
            { isSelected ? `Selected` : `Select Plan` }
        </FormButton>;
    } else {
        button = <h1 className="is-size-6"><strong>Contact Us</strong></h1>;
    }

  return (
    <Card className={isSelected ? styles.active : ""}>
      <Slot slot="header">
        <div>
          <h1 className="has-text-primary is-size-5">
            {plan.header?.main_header}
          </h1>
          <h1 className="has-text-grey">
            {plan.header.sub_main_header}
            <span className="has-text-primary">
              <strong>{plan.header?.span_main_header}</strong>
            </span>
          </h1>
        </div>
        <div>
          <h1 className="has-text-primary is-size-4">
            {formatCurrency(plan.header?.plan_cost)}
          </h1>
          <h1 className="has-text-grey is-pulled-right">{plan.header.plan_cost_per}</h1>
        </div>
      </Slot>
      <Slot slot="body">
        <div
          className="pannel-block is-relative p-3 is-flex is-flex-direction-column mt-6 mb-4 is-justify-content-center"
          style={{ height: "60px" }}
        >
          {plan.primaryFeatures?.map((value: any, index: any) => (
            <div className="info" key={index}>
              <h1 className="has-text-centered is-size-6" key={index}>
                {value}
              </h1>
            </div>
          ))}
        </div>
        <div className="pannel-block is-relative py-3 px-5">
          <div
            className={` is-flex is-justify-content-center mt-4 
          
            `}
          >

            {button}
          </div>
          <div>
            <div className="is-flex is-justify-content-start is-flex-direction-column mt-6 mb-3">
              {plan.featureList?.map((plans: any, index: any) => {
                return (
                  <h1 className=" is-size-6 pt-1" key={index}>
                    {plans}
                  </h1>
                );
              })}
            </div>
            <div className="is-flex is-align-items-center  is-flex-direction-column">
              {plan.footer ? <plan.footer /> : null}
            </div>
          </div>
        </div>
      </Slot>
    </Card>
  );
}
export default ChoosePlanComponent;
