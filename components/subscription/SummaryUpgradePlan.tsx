import React, { useState } from "react";
import { Dispatch, SetStateAction, useEffect } from 'react';
import Card from "../cards/Card";
import CardTitle from "../CardTitle";
import FormButton from "../form/FormButton";
import Slot from "../Slot";
import styles from "./PriceRange.module.css";
import UpgradeModal from "./UpgardeModal";
import Modal from "../modals/Modal";
import CardAnimatePresence from "../cards/CardAnimatePresence";
import { useStripeContext } from "../../providers/stripe-provider";
import { useAuthContext } from '../../providers/auth-data-provider';
import { useRouter } from 'next/router';
import { formatInThousand } from "../../utils/plan-info";
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { UserAttributes } from '../../types';
import { parseCognitoUser } from '../../utils/user-utils';


const SummaryUpgradePlan = ({

}: {

}) => {

    const { user, isAdmin, isRoot } = useAuthContext();
    const router = useRouter();
    
  const { selectedPlan, planValue, priceRangeValue, priceRangeRate } = useStripeContext();
  let planTxt = "Monthly";
  let planTxtMin = "month";
  if ( selectedPlan != undefined && selectedPlan > 1){
      planTxt = "Yearly";
      planTxtMin = "year"
  }
  const [isUpgradeModalActive, setUpgradeModalActive] = useState(false);
  //const onUpgradeModal = () => setUpgradeModalActive(true);
    const getOptions = async () => {
        const options = {
            queryStringParameters: {
                planValue,
                priceRangeValue,
                priceRangeRate,
                username:user?.getUsername()
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        };
        return options;
    };
    const onUpgradeModal = async () => {
        const options = await getOptions();
        const apiName = 'subscribe1';
        const path = '/subscribe';
        try {
            const subscriptionData = await API.get(apiName, path, options);
            if (subscriptionData.redirecturl !== undefined){
                await router.push(subscriptionData.redirecturl);
            }
            console.log(subscriptionData);
        } catch (err) {
            console.log('Error loading subscriptions', err);
        }

        console.log('stripey');
    }

  const onUpgradeModalCancel = () => setUpgradeModalActive(false);
  return (
    <>
      <Card className={styles.borderTopDesign}>
        <Slot slot="header">
          <div className="is-flex-grow-1 is-size-6 ">
            <CardTitle className="has-text-primary">Summary</CardTitle>
            <h1 className=" is-size-6">
                All-Inclusive ({planTxt})
              {Boolean(priceRangeValue) &&
                " + " + formatInThousand(priceRangeValue) + " " + "Credits"}
            </h1>
          </div>
          <h1 className="is-size-6 mr-4 has-text-primary"><strong>
            $ {((planValue || 0) as number) + ((priceRangeRate || 0) as number)}
            /{planTxtMin}</strong>
          </h1>
          <FormButton
            variant={["is-outlined", "is-ui-button"]}
            onClick={onUpgradeModal}
          >
            Upgrade
          </FormButton>
        </Slot>
      </Card>
      {/* upgrade modal */}
      <Modal isActive={isUpgradeModalActive} onCancel={onUpgradeModalCancel}>
        <CardAnimatePresence isActive={isUpgradeModalActive}>
          <UpgradeModal title="Upgrade" onCancel={onUpgradeModalCancel} />
        </CardAnimatePresence>
      </Modal>
    </>
  );
};

export default SummaryUpgradePlan;
