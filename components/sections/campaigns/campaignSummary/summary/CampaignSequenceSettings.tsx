import React, { useState } from 'react';
import Card from '../../../../cards/Card';
import FormInput from '../../../../form/FormInput';
import Slot from '../../../../Slot';
import FormButton from '../../../../form/FormButton';
import IconEdit from '../../../../icons/IconEdit';
import styles from "../../css/campaign.module.css";
import IconInfo from "../../icons/IconInfo"
import IconStep from '../../icons/IconStep';
function CampaignSequenceSettings() {
  return (
    <div className='mb-6'>	<>
      <Card>
        <Slot slot="header">
          <div className="columns " style={{ width: "100%" }}>
            <div className="column is-8-tablet is-flex is-align-items-center">
              <div className="is-relative">
                <span className={styles.teamIcon}></span>
                <IconStep className={styles.teamIconSvg} />
              </div>
              <big>
                <>Sequence Settings</>
              </big>
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
              {/* <IconFilter/> */}
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
              <FormButton
                className="ml-3"
                // onClick={handleEdit}
                variant={['is-icon', 'is-outlined', 'is-rounded']}
                icon={<IconEdit />}
                size="is-small"
              />
            </div>
          </div>
        </Slot>
        <Slot slot="body">
          <div className='columns'>
            <div className="column is-three-quarters panel-block is-block is-relative mb-2" style={{ borderBottom: 0 }}>
              <FormInput
                readonly={true}
                label="Senders"
                placeholder='koko@nymblr.com'
                iconLabel={<IconInfo className='' />}
              />
            </div>
            <div className=' column panel-block is-block is-relative mb-2' style={{ borderBottom: 0 }}>
              <FormInput
                readonly={true}
                label="Length"
                iconLabel={<IconInfo className='' />}
              />

            </div>
            <div className='column panel-block is-block is-relative mb-2' style={{ borderBottom: 0 }}>
              <FormInput
                readonly={true}
                label="Style"
                iconLabel={<IconInfo className='' />}
              />

            </div>
          </div>
        </Slot>
      </Card>
    </></div>
  )
}

export default CampaignSequenceSettings