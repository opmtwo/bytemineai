import React, { useState } from 'react';
import classNames from 'classnames';
import Card from '../../../../cards/Card';
import CardTitle from '../../../../CardTitle';
import FormInput from '../../../../form/FormInput';
import IconCopy from '../../../../icons/IconCopy';
import IconEye from '../../../../icons/IconEye';
import Slot from '../../../../Slot';
import Anchor from '../../../../Anchor';
import FormButton from '../../../../form/FormButton';
import IconEdit from '../../../../icons/IconEdit';
import IconTeam from '../../../../icons/IconTeam';
import styles from "../../css/campaign.module.css";
import CampaignStepList from '../../components/CampaignStepList';
import IconStep from '../../icons/IconStep';
function CampaignSequenceStep({ isButton }: { isButton: boolean }) {
  return (
    <div>	<>
      <Card>
        <Slot slot="header">
          <div className="columns " style={{ width: "100%" }}>
            <div className="column is-8-tablet is-flex is-align-items-center">
              <div className="is-relative">
                <span className={styles.teamIcon}></span>
                <IconStep className={styles.teamIconSvg} />
              </div>
              <big>
                <>Sequence Steps (4)</>
              </big>
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
              {/* <IconFilter/> */}
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
              {!isButton ? <FormButton variant={['is-outlined', 'is-ui-button']}>Add Step</FormButton>
                :
                <>
                  <FormButton
                    className="ml-3"
                    // onClick={handleEdit}
                  >Short</FormButton>
                  <FormButton
                    className="ml-3"
                    // onClick={handleEdit}
                    variant={['is-outlined']}
                  >Medium</FormButton>
                  <FormButton
                    className="ml-3"
                    // onClick={handleEdit}
                    variant={['is-outlined']}
                  >Long</FormButton></>}

            </div>
          </div>
        </Slot>
        <Slot slot="body">
          {!isButton ? "" : <div className=" panel-block is-block is-relative mb-2" style={{ borderBottom: 0 }}>
            <FormInput
              readonly={true}
              label="Select Senders"
              placeholder='koko@nymblr.com'
            />
          </div>}
          <CampaignStepList isButton={isButton} />
        </Slot>
      </Card>
    </></div>
  )
}
export default CampaignSequenceStep