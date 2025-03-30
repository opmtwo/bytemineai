import React from 'react'
import Card from "../../../../cards/Card";
import Slot from "../../../../Slot";
import IconHeart from "../../../../icons/IconHeart";
import IconBulb from "../../../../icons/IconBulb";
import styles from "../../css/campaign.module.css";
import moment from "moment";
import { useSettingsContext } from "../../../../../providers/settings-provider";
import classNames from "classnames";
import CardAnimatePresence from "../../../../cards/CardAnimatePresence";
import Loader from "../../../../Loader";
import FormButton from '../../../../form/FormButton';
import IconEdit from '../../../../icons/IconEdit'
import CardTitle from '../../../../CardTitle';
import IconAudience from '../../icons/IconAudience'

function CampaignAudienceSummary({ minHeight, isButton }: { minHeight?: string; isButton: boolean }) {
    return (
        <Card>
            <Slot slot="header">
                <div className="columns " style={{ width: "100%" }}>
                    <div className="column is-7-tablet is-flex is-align-items-center">
                        <div className="is-relative">
                            <span className={styles.teamIcon}>

                            </span>
                            <IconAudience className={styles.teamIconSvg} />
                        </div>
                        <big>
                            <>Audience Summary</>
                        </big>
                    </div>
                    <div className="column is-5-tablet  is-flex is-align-items-center is-justify-content-flex-end">
                        {!isButton ? <FormButton
                            className="ml-3"
                            // onClick={handleEdit}
                            variant={['is-icon', 'is-outlined', 'is-rounded']}
                            icon={<IconEdit />}
                            size="is-small"
                        />
                            :
                            <>
                                <FormButton
                                    className="ml-3"
                                    // onClick={handleEdit}
                                    // size="is-small"
                                >Precise</FormButton>
                                <FormButton
                                    className="ml-3"
                                    // onClick={handleEdit}
                                    variant={['is-outlined']}
                                    // size="is-small"
                                >Large</FormButton>
                                <FormButton
                                    className="ml-3"
                                    // onClick={handleEdit}
                                    variant={['is-outlined']}
                                    // size="is-small"
                                >Broad</FormButton></>}
                    </div>
                </div>
            </Slot>

            {/* </Anchor> */}
            <Slot slot="body">
                <div className="columns">
                    <div className="column is-12 ">
                        <React.Fragment>
                            <div
                                className="is-flex is-flex-direction-column is-align-items-center"
                                style={{ minHeight: minHeight }}
                            >
                                <span className="is-block title is-3 has-text-primary has-text-weight-normal mb-2">
                                    {/* {settings?.["custom:bonus_credits"]} */}
                                </span>
                                <span className="is-size-6 has-text-grey px-6 mt-5"> Your audience contains <span className="has-text-message-blue">39,332</span> people based in the United States from <span className="has-text-primary">1,323</span> companies. Some of the industries they work in are Advetising and Marketing and their job titles include Director, Chief Executive Office, Sales Director, and similar.</span>
                            </div>

                            <div
                                className="is-flex"
                                style={{ minHeight: "2.9rem", padding: "3px 16px 4px 16px" }}
                            >
                                <span
                                    style={{
                                        //   width: "60px",
                                        fill: "orange",
                                        marginLeft: "auto",
                                    }}
                                >
                                    View Audience
                                </span>
                            </div>
                        </React.Fragment>
                        {/* )} */}
                    </div>
                </div>
            </Slot>
        </Card>
    )
}

export default CampaignAudienceSummary