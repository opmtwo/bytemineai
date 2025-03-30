import React from 'react';
import Card from "../../../cards/Card";
import Slot from "../../../Slot";
import IconPerformance from "../icons/IconPerformance";
// import styles from "../css/campaign.module.css";


function CampaignChatAI() {
  return (
    <div> <div>
    <Card>
    <Slot slot="header">
        <div className="columns " style={{ width: "100%" }}>
            <div className="column is-8-tablet is-flex is-align-items-center">
                <div className="is-relative">
                    {/* <span className={styles.teamIcon}></span> */}
                    {/* <IconPerformance className={styles.teamIconSvg} /> */}
                </div>
                <big>
                    <>Campaign Builder AI</>
                </big>
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
               {/* <IconFilter/> */}
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
                <span></span>
            </div>
        </div>
    </Slot>
    <Slot slot="body">
        <div className="panel-block is-block is-relative">
            {/* <CardAnimatePresence isActive={true }>
        <div className="is-overlay has-background-white is-flex is-align-items-center is-justify-content-center" style={{ opacity: 0.9 }}>
            <Loader />
        </div>
    </CardAnimatePresence> */}
        </div>
    </Slot>
</Card></div></div>
  )
}

export default CampaignChatAI