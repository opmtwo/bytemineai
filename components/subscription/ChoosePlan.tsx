import React, { useState } from "react";
import Card from "../cards/Card";
import CardTitle from "../CardTitle";
import Slot from "../Slot";
import { SUBCRIPTION_PLANS } from "../../utils/plan-info";
import ChoosePlanComponent from "./ChoosePlanComponent";
import IconUnavailable from "../../components/icons/IconUnavailable";
import IconAvailable from "../../components/icons/IconAvailable";
import { useStripeContext } from "../../providers/stripe-provider";
import IconTrophy from "../icons/IconTrophy";
import styles from "../dashboard/dashboard.module.css";

const ChoosePlan = () => {
  const { selectedPlan } = useStripeContext();

  return (
    <div className="mb-6">
      <Slot slot="body">
        <Slot slot="header">
          <div className="is-flex-grow-1 p-6">
            <h2 className="title is-3 has-text-primary is-size-4 has-text-centered">
              Picking a plan shouldn’t feel like buying a used car.
            </h2>
            <CardTitle>
              <div className="has-text-centered">
                All-Inclusive plan with valid data for your entire team.
              </div>
            </CardTitle>
          </div>
        </Slot>
        <div className="pannel-block is-realtive py-3 px-2">
            <div className="columns is-tablet planslist">
                <div className="column is-3-tablet is-3-widescreen planslist">
              <Card>
                <Slot slot="body">
                  <div
                    className="pannel-block is-relative p-5 is-flex is-flex-direction-column is-align-items-center"
                    style={{
                      minHeight: "760px",
                      borderTop: "4px solid var(--primary)",
                      borderRadius: "5px",
                      boxShadow: "0 0 4px 0 var(--primary)",
                    }}
                  >
                    <strong className="is-size-4">All-Inclusive &</strong>
                    <strong className="is-size-4">Quality Guarantee</strong>

                    <div className="is-size-4">&nbsp;</div>
                      <div className={styles.iconAward}>
                          <IconTrophy />
                      </div>
                      <div className="is-size-4">&nbsp;</div>

                    <div className="pb-6">
                      <strong className="is-size-4">Never Ever Pay For</strong>
                    </div>
                    <IconUnavailable />

                    <h1 className="p-3 is-size-6">Invalid Emails</h1>

                    <IconUnavailable />

                    <h1 className="pt-4 is-size-6">More Users</h1>
                    <div className=" pt-4 pb-6">
                      <strong className=" is-size-4">Get Free Credits</strong>
                    </div>

                    <IconAvailable />

                    <h1 className="pt-2 pb-4 is-size-6">Every 3 Months</h1>
                    
                  </div>
                </Slot>
              </Card>
            </div>
            {SUBCRIPTION_PLANS.map((plan, index) => (
                    <div className="column is-3-tablet is-3-widescreen planslist" key="{index}">
                <ChoosePlanComponent
                  key={`plan_${index}`}
                  plan={plan}
                  isSelected={selectedPlan === plan.id}
                />
              </div>
            ))}
          </div>
        </div>
      </Slot>
    </div>
  );
};

export default ChoosePlan;
