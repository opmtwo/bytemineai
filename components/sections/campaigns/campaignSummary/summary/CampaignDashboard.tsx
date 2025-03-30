import React from 'react';
import Banner from '../../components/CampaignBanner';
import CampaignAudienceSummary from './CampaignAudienceSummary';
import CampaignPerformance from './CampaignPerformance';
import CampaignSequenceSettings from './CampaignSequenceSettings';
import CampaignStatusSection from './CampaignStatusSection';
import CampaignSummaryMenu from '../../components/CampaignSummaryMenu';
import CampaignSequenceStep from './CampaignSequenceStep';
function CampaignDashboard() {
    const bannerText:string ="Campaign Paused. Activate your campaign to start reaching out to your prospects."
    const bannerButtonText:string="Activate"
    return (
        <div>
            <Banner bannerText={bannerText} bannerButtonText={bannerButtonText}  />
            <CampaignSummaryMenu />
            <div className='columns'>
                <div className="column is-8 ">
                    <CampaignStatusSection />
                    <CampaignPerformance />
                </div>
                <div className="column is-4 ">
                    <CampaignAudienceSummary minHeight='13.2rem' isButton={false }/>
                </div>
            </div>
            <CampaignSequenceSettings />
            <CampaignSequenceStep isButton={false} />
        </div>
    )
}

export default CampaignDashboard    