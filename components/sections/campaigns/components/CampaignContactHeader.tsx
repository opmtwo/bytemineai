import React from 'react'
import Card from '../../../cards/Card';
import Slot from "../../../Slot"

function CampaignContactHeader() {
  return (
    <div>
        <Card className='mb-4' >
        <Slot slot="body">

          <div className="columns is-mobile is-gapless is-multiline mx-auto " style={{ width: "100%", borderRadius: 5 }}>
          
          <div className="column  " style={{borderBottom:"2px solid #6236ff"}}>
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-weight-normal mb-0 " style={{color:"#6236ff"}}>232</span>
                <span className="is-size-6 " style={{color:"#6236ff"}}>In-Progress</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">1200</span>
                <span className="is-size-6 has-text-grey">Remaining</span>
              </div>
            </div>

           <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">0</span>
                <span className="is-size-6 has-text-grey">Completed</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">0</span>
                <span className="is-size-6 has-text-grey">Open</span>
              </div>
            </div>
            <div className="column   ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">0</span>
                <span className="is-size-6 has-text-grey">Account</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">0</span>
                <span className="is-size-6 has-text-grey">Replied</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">0</span>
                <span className="is-size-6 has-text-grey">Bounced</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-6 has-text-grey has-text-weight-normal mb-0">0</span>
                <span className="is-size-6 has-text-grey">Excluded</span>
              </div>
            </div>
          </div>
        </Slot>
      </Card>
    </div>
  )
}

export default CampaignContactHeader
