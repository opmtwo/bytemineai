import React from 'react'
import { motion } from 'framer-motion';
import FormButton from '../../../form/FormButton';
import IconAdd from '../../../icons/IconAdd';
import IconDelete from '../../../icons/IconDelete';
import styles from "../css/campaign.module.css";
import FormCheckbox from '../../../form/FormCheckbox';
import IconSend from '../icons/IconSend';

function CampaignContactList() {
    return (
        <div>
            <motion.div layout className="panel-block is-block">
                <div className="columns is-mobile is-align-items-center">
                    <div className="column is-4">
                        <div className="is-flex is-align-items-center">
                            <span className="is-flex is-align-items-center ml-3" >
                                <FormCheckbox
                                    isChecked={false}
                                />
                                <span className="mx-5">John Smith<br />Vice President of Sales</span>
                            </span>
                            <span className="ml-6">Amazon.com</span>
                        </div>
                    </div>
                    <div className="column is-8">
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
                                            <IconSend />
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
                                            <IconAdd />
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
                </div>
            </motion.div>
        </div>
    )
}

export default CampaignContactList