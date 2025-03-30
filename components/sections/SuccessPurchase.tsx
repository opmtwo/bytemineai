import React from "react";
import { useEffect, useState } from 'react';
import DashboardHeader from "../dashboard/DashboardHeader";
import { useRouter } from 'next/router';
import DashboardTeam from "../dashboard/DashboardTeam";
import DashboardBonusTracker from "../dashboard/DashboardBonusTracker";
import DashBoardCountTracker from "../dashboard/dashBoardCountTracker";
import DashboardAction from "../dashboard/DashboardAction";
import { useSettingsContext } from "../../providers/settings-provider";
import { useAuthContext } from "../../providers/auth-data-provider";
import { AccountType } from "../../types";
import SuccessNotice from '../SuccessNotice';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

const SuccessPurchase = () => {
  const router = useRouter();
  const { settings } = useSettingsContext();
  const { user, isAdmin, isRoot } = useAuthContext();

  const getToken = async (isApi: boolean = false) => {
      let token;
      try {
          if (isApi) {
              token = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
          } else {
              token = `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`;
          }
      } catch (err) {
          console.log('Error fetching token in settings provider', err);
      }
      return token;
  };

  const getInput = async (body: any) => {
      const options = {
          body,
          headers: {
              'Content-Type': 'application/json',
              Authorization: await getToken(true),
          },
      };
      return options;
  };
  const subscriptionNymblr = async () => {
      const options = await getInput({ groupId: user?.attributes?.["custom:group_name"] });
      let response;
      try {
          response = await API.post('nymblrRestApi', '/api/activatesub', options);
      } catch (err) {
          console.log('Error fetching settings', err);
      }
      return response;
  }

    useEffect(() => {
        const subscribeStatus = subscriptionNymblr();

        }, []);

  const onCustomize = async () => {
      await router.push({ pathname: '/account-settings/subscription-billing/plan' });
  }

  const isTrailAccount = false;
    //!isRoot && settings?.["custom:account_type"] === AccountType.Trial;
    const axios = require('axios');
    const sendgrid = async () => {
        let list_id = 'b42c3ffe-6cf9-41c9-b866-ac7adcd89ef9';
        if (!isTrailAccount){
            list_id = '370f0c1f-bfc1-4318-8c65-b97e23501de9'
        }

        const url2 = `https://api.sendgrid.com/v3/marketing/contacts/search/emails`;
        const body2 = '{"emails": ["'+user?.attributes.email+'"]}';
        const options = {
            headers: { Authorization: `Bearer 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`, "Content-Type": `application/json` },
        };
        let response;
        let contact_id;
        try {
            response = await axios.post(url2, body2, options);
            const emailin = user?.attributes.email || '';
            contact_id = response.data.result[emailin].contact.id;

        } catch (err) {
            console.log('sendgrid - error - ', err);
            return err;
        }
        const url = 'https://api.sendgrid.com/v3/marketing/lists/b42c3ffe-6cf9-41c9-b866-ac7adcd89ef9/contacts?contact_ids='+contact_id;
        //const url = 'https://api.sendgrid.com/v3/contactdb/lists/b42c3ffe-6cf9-41c9-b866-ac7adcd89ef9/recipients/'+contact_id;
        //const body = {list_id:"b42c3ffe-6cf9-41c9-b866-ac7adcd89ef9",recipient_id:contact_id};
        const body = {contact_ids:contact_id};
        const options2 = {
            headers: { Authorization: `Bearer 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` },
            data: body
        };

        try {
            response = await axios.delete(url, options2);

        } catch (err) {
            console.log('sendgrid - error - ', err);

            return err;

        }
        list_id = '370f0c1f-bfc1-4318-8c65-b97e23501de9'
        const url1 = `https://api.sendgrid.com/v3/marketing/contacts`;
        const body1 = '{"list_ids": ["'+list_id+'"], "contacts": [{"email": "'+user?.attributes.email+'"}]}';

        try {
            response = await axios.put(url1, body1, options);
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
      <SuccessNotice onCustomize={onCustomize} />
      {/* white space */}
      <div className="my-5"></div>
      <DashboardHeader />
      <div className="columns">
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

      <DashboardAction />
    </>
  );
};

export default SuccessPurchase;
