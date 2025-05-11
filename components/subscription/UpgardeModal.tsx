import React from "react";
import FormInput from "../form/FormInput";
import FormButton from ".././form/FormButton";
import IconClose from "../icons/IconClose";
import Card from "../cards/Card";
import Slot from "../Slot";
import { motion } from "framer-motion";
import CardTitle from "../CardTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardDetailForm from "./CardDetailForm";
import { stripeKey } from "../../utils/plan-info";
import { useStripeContext } from "../../providers/stripe-provider";
import { formatInThousand } from "../../utils/plan-info";
import FormButtonNew from "../form/FormButtonNew";

const stripePromise = loadStripe(stripeKey);
const UpgradeModal = ({
  onCancel,
  title,
}: {
  onCancel?: Function;
  title: string;
}) => {
  const { priceRangeValue, priceRangeRate, planValue } = useStripeContext();

  // processign and error message state
  const handleCancel = () => onCancel && onCancel();
  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={HandleSubmit}>
      <Elements stripe={stripePromise}>
        <Card>
          <Slot slot="header">
            <CardTitle>{title}</CardTitle>
            {onCancel ? (
              <span className="is-clickable" onClick={handleCancel}>
                <IconClose />
              </span>
            ) : null}
          </Slot>
          <Slot slot="body">
            <motion.div layout className="panel-block is-block">
              <CardDetailForm />
              <FormInput
                name="send-invoice"
                label="Send Invoices to"
                required={true}
                placeholder="Enter email address"
                className="has-text-weight-bold is-size-7"
              />
            </motion.div>
            <motion.div layout className="panel-block is-block">
              <div className="summary">
                <h1 className="has-text-primary is-size-4">Summary</h1>
                <div className="is-flex is-justify-content-space-between">
                  <h1 className="is-size-5">
                    All-Inclusive (Monthly)
                    {Boolean(priceRangeValue) &&
                      " + " +
                        formatInThousand(priceRangeValue) +
                        " " +
                        "Credits"}
                  </h1>
                  <div className="is-flex is-flex-direction-column has-text-primary">
                    <h1 className="is-size-6">
                      $
                      {((planValue || 0) as number) +
                        ((priceRangeRate || 0) as number)}
                    </h1>
                    <h2>per month</h2>
                  </div>
                </div>
                <p className="has-text-grey pt-4">
                  By confirming your subscription, you allow Nymblr, Inc. to
                  charge your card for this payment and future payments in
                  accordance with their terms. You can always cancel your
                  subscription.
                </p>
              </div>
            </motion.div>
            <Slot slot="footer">
              <motion.div className="panel-block is-block">
                <div className="is-flex is-justify-content-space-between">
                  <h1 className="has-text-grey">
                    Powered by{" "}
                    <span className="has-text-weight-bold">Stripe</span>
                  </h1>
                  <FormButtonNew
                    type="submit"
                  >
                    Upgrade
                  </FormButtonNew>
                </div>
              </motion.div>
            </Slot>
          </Slot>
        </Card>
      </Elements>
    </form>
  );
};
export default UpgradeModal;
