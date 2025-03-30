import React from 'react'
import Card from '../../../cards/Card'
import Slot from '../../../Slot'
import FormButton from '../../../form/FormButton'
import IconCheck from '../icons/IconCheck'

function CampaignProgress() {
    return (
        <div>
            <Card className='mb-4' >
                <Slot slot="body" >
                    <div className="columns is-mobile is-gapless is-multiline mx-auto " style={{ width: "100%", borderRadius: 5 ,borderTop:"4px solid var(--primary)" }}>
                        <div className="column my-auto" >
                            <div className="has-text-centered has-text-weight-normal is-info-card">
                                {/* <span className="is-block title is-6 has-text-weight-normal mb-0 " style={{ color: "#6236ff" }}>232</span> */}
                                <span className="is-size-6 " style={{ color: "var(--primary)" }}>Campaign Progress</span>
                            </div>
                        </div>
                        <div className="column my-auto ml-6">
                            <div className="has-text-centered has-text-weight-normal is-info-card">
                                <span className="is-size-7 has-text-grey"><IconCheck/>Build Audience</span>
                            </div>
                        </div>
                        <div className="column my-auto ">
                            <div className="has-text-centered has-text-weight-normal is-info-card">
                                <span className="is-size-7 has-text-grey">Generate Sequence & Content</span>
                            </div>
                        </div>
                        <div className="column my-auto ">
                            <div className="has-text-centered has-text-weight-normal is-info-card">
                                <span className="is-size-7 has-text-grey">Connect Senders</span>
                            </div>
                        </div>
                        <div className="column my-auto mr-6">
                            <div className="has-text-centered has-text-weight-normal is-info-card">
                                <span className="is-size-7 has-text-grey">Launch Campaign</span>
                            </div>
                        </div>
                        <div className="column ml-6">
                        <div className="has-text-centered has-text-weight-normal is-info-card">
                        <span className="is-size-6 ">
                        <FormButton
                                type="submit"
                                color= "is-link"
                            >
                                Launch Campaign
                            </FormButton>
                            </span>
                        </div>
                        </div>
                    </div>
                </Slot>
            </Card>
        </div>
    )
}

export default CampaignProgress