import React from "react";
import DashboardHeader from "../../dashboard/DashboardHeader";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardTeam from "../../dashboard/DashboardTeam";
import DashboardBonusTracker from "../../dashboard/DashboardBonusTracker";
import DashBoardCountTracker from "../../dashboard/dashBoardCountTracker";
import DashboardAction from "../../dashboard/DashboardAction";
import DashboardAction2 from "../../dashboard/DashboardAction2";
import { useSettingsContext } from "../../../providers/settings-provider";
import { useAuthContext } from "../../../providers/auth-data-provider";
import { AccountType } from "../../../types";
import TrialNotice from '../../TrialNotice';
import client from "@sendgrid/client";


const SectionDashboard = () => {
  const router = useRouter();
  const { settings, canUpgrade } = useSettingsContext();

  console.log('settings',settings);
    console.log('canUpgrade',canUpgrade);
  const { isRoot, user } = useAuthContext();
  const onCustomize = async () => {
      await router.push({ pathname: '/account-settings/subscription-billing/plan' });
  }

  const isTrailAccount = canUpgrade;
  const axios = require('axios');
  const sendgrid = async () => {
      let list_id = 'b42c3ffe-6cf9-41c9-b866-ac7adcd89ef9';
      if (!isTrailAccount){
          list_id = '370f0c1f-bfc1-4318-8c65-b97e23501de9'
      }
      //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
      const url = `https://api.sendgrid.com/v3/marketing/contacts`;
      const body = '{"list_ids": ["'+list_id+'"], "contacts": [{"email": "'+user?.attributes.email+'", "first_name": "'+user?.attributes.given_name+'", "last_name": "'+user?.attributes.family_name+'"}]}';
      const options = {
          headers: { Authorization: `Bearer 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`, "Content-Type": `application/json` },
      };
      let response;
      try {
          response = await axios.put(url, body, options);
      } catch (err) {
          console.log('sendgrid - error - ', err);

              return err;

      }
      return response.data;
  }
    useEffect(() => {
        sendgrid();
    }, []);
  return (
    <>
        {isTrailAccount ? (
                <TrialNotice onCustomize={onCustomize} />
        ):(<div></div>)}

      {/* white space */}
      <DashboardHeader />
      <DashboardAction />
      
      <div className="columns" style={{marginBottom:"28px"}}>
        <div className="column is-7">
          <DashboardTeam />
        </div>
        <div className="column is-5 customHeightinPanel">
          {!isTrailAccount ? (
            <DashBoardCountTracker />
          ) : (
            <DashboardBonusTracker />
          )}
        </div>
      </div>

      {/* white space */}
      <div className="columns" style={{marginTop:"38px"}}>
      <div className="column is-12"><DashboardAction2 /></div>
      </div>
      
    </>
  );
};

export default SectionDashboard;
