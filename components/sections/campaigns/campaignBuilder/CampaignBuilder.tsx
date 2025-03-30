import React from 'react'
import HeaderBanner from "../components/HeaderBanner"
import CampaignProgress from "./CampaignProgress"
import CampaignAudienceSummary from '../campaignSummary/summary/CampaignAudienceSummary'
import CampaignBuilderAI from './CampaignChatAI'
import CampaignSequenceStep from '../campaignSummary/summary/CampaignSequenceStep'

function CampaignBuilder() {
    return (
        <div>
            <HeaderBanner />
            <CampaignProgress />
            <div className='columns'>
                <div className=" column is-5 ">
                    <CampaignBuilderAI />
                </div>
                <div className="column is-7 ">
                    <CampaignAudienceSummary
                        minHeight='7.2rem'
                        isButton={true}
                    />
                    <CampaignSequenceStep isButton={true}/>
                </div>
            </div>
        </div>
    )
}

export default CampaignBuilder