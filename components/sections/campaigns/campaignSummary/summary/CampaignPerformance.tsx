import React from 'react'
import Card from '../../../../cards/Card';
import CardAnimatePresence from '../../../../cards/CardAnimatePresence';
import CardTitle from '../../../../CardTitle';
import Info from '../../../../Info';
import Loader from '../../../../Loader';
import Slot from '../../../../Slot';
import FormButton from '../../../../form/FormButton';
import IconTeam from '../../../../icons/IconTeam';
import styles from "../../css/campaign.module.css";
import IconFilter from "../../../../icons/IconFilter";
import IconPerformance from '../../icons/IconPerformance';

function CampaignPerformance() {
    return (
        <div>
            <Card>
            <Slot slot="header">
                <div className="columns " style={{ width: "100%" }}>
                    <div className="column is-8-tablet is-flex is-align-items-center">
                        <div className="is-relative">
                            <span className={styles.teamIcon}></span>
                            <IconPerformance className={styles.teamIconSvg} />
                        </div>
                        <big>
                            <>Performance</>
                        </big>
                    </div>
                    <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
                       {/* <IconFilter/> */}
                    </div>
                    <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
                        <span> All Time</span>
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
                    <div className="columns is-mobile is-multiline">

                        <div className="column  ">
                            <Info name="Contacts" value={500} />
                        </div>
                        <div className="column  ">
                            <Info name="Emails Sent" value={500} />
                        </div>
                        <div className="column   ">
                            <Info name="Open Emails" value={500} />
                        </div>
                        <div className="column  ">
                            <Info name="Replies" value={500} />
                        </div>
                        <div className="column   ">
                            <Info name="Bounces" value={500} />
                        </div>

                    </div>
                </div>
            </Slot>
        </Card></div>
    )
}

export default CampaignPerformance