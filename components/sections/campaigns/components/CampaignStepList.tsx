import React from 'react'
import { motion } from 'framer-motion';
import { Enrichment } from '../../../../types';
import { formatNumber } from '../../../../utils/helper-utils';
import FormButton from '../../../form/FormButton';
import IconEdit from '../../../icons/IconEdit';
import IconWorking from '../../../icons/IconWorking';
import IconAdd from '../../../icons/IconAdd';
import IconDelete from '../../../icons/IconDelete';
import IconMessage from '../icons/IconMessage';
import styles from "../css/campaign.module.css";

function CampaignStepList({ isButton }: { isButton: boolean }) {

    return (
        <div>
            <motion.div layout className="panel-block is-block">
                <div className="columns is-mobile is-align-items-center">
                    
                    <div className={`column ${isButton?"is-12":"is-6"}`}>
                        <div className="is-flex is-align-items-center">
                            <span className="is-flex is-align-items-center ml-3" >
                                <span className={styles.messageIcon}></span>
                                <IconMessage className={styles.messageIconSvg} />
                                <span className="mx-5">Day 1, 0h, 0m</span>
                            </span>
                            <span className="ml-6 has-text-weight-normal">Intro Email: Hey, how are you doing?</span>

                        </div>
                    </div>
                    {isButton ? "" :
                        <div className="column is-6">
                            <div className="columns is-mobile is-align-items-center has-text-centered">
                                <div className="column">
                                    <span className={styles.headerTextStep}>12</span>
                                    <br />
                                    <span>Contacts</span>
                                </div>   <div className="column">
                                    <span className={styles.headerTextStep}>0</span>
                                    <br />
                                    <span>Send</span>
                                </div>
                                <div className="column">
                                    <span className={styles.headerTextStep}>
                                        0
                                    </span>
                                    <br />
                                    <span>Open</span>
                                </div>
                                <div className="column">
                                    <span className={styles.headerTextStep}>
                                        0
                                    </span>
                                    <br />
                                    <span>Replied</span>
                                </div>
                                <div className="column">
                                    <span className={styles.headerTextStep}>
                                        0
                                    </span>
                                    <br />
                                    <span>Bounced</span>
                                </div>
                                <div className="column is-2 has-text-right">
                                    <FormButton
                                        className="ml-3"
                                        // onClick={item.isCompleted ? handleDownload : undefined}
                                        variant={['is-icon', 'is-outlined', 'is-rounded']}
                                        // disabled={!item.isCompleted}
                                        icon={
                                            <span style={{ width: 12 }}>
                                                <IconEdit />
                                            </span>
                                        }
                                    />
                                    <FormButton
                                        className="ml-3"
                                        // onClick={item.isCompleted ? handleDownload : undefined}
                                        variant={['is-icon', 'is-outlined', 'is-rounded']}
                                        // disabled={!item.isCompleted}
                                        icon={
                                            <span style={{ width: 12 }}>
                                                <IconDelete />
                                            </span>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </motion.div>
            {isButton ? "" : <div className="columns is-mobile panel-block is-block">
                <div className="column is-flex is-justify-content-center">
                    <FormButton
                        className="ml-3"
                        // onClick={item.isCompleted ? handleDownload : undefined}
                        variant={['is-icon', 'is-outlined', 'is-rounded']}
                        // disabled={!item.isCompleted}
                        icon={
                            <span style={{ width: 12 }}>
                                <IconAdd />
                            </span>
                        }
                    />
                </div>
            </div>}


        </div>
    )
}

export default CampaignStepList