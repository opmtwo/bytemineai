import React from 'react'
import Card from '../../../../cards/Card';
import CardAnimatePresence from '../../../../cards/CardAnimatePresence';
import CardTitle from '../../../../CardTitle';
import Info from '../../../../Info';
import Loader from '../../../../Loader';
import Slot from '../../../../Slot';
import Switch from "react-switch";
import IconCloseRed from "../../icons/IconCloseRed"

function CampaignStatusSection() {
  const handleChange = () => {
    console.log("switched")
  }
  return (
    <div style={{ borderRadius: 10 }}>
      <Card className='mb-4' >
        <Slot slot="body">

          <div className="columns is-mobile is-gapless is-multiline mx-auto " style={{ width: "100%", backgroundColor: "#D8D8D8", borderRadius: 5 }}>
            <div className="colum my-auto ml-4">
              <div className="is-relative" style={{}}>
                <Switch
                  checked={false}
                  onChange={handleChange}
                  handleDiameter={22}
                  offColor="#979797"
                  onColor="#979797"
                  offHandleColor="#FFFFFF"
                  onHandleColor="#3DC402"
                  height={20}
                  width={40}
                  borderRadius={18}
                  activeBoxShadow="0px 0px 1px 1px #979797"
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        // color: "orange",  
                        // paddingRight: 2
                      }}
                    >
                     
                    </div>
                  }
                  checkedIcon={
                    <svg viewBox="0 0 10 10" height="100%" width="100%" fill="yellow">
                      {/* <circle r={3} cx={5} cy={5} /> */}
                    </svg>
                  }
                  uncheckedHandleIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 20,
                        color: "red",
                        padding:"5px"
                      }}
                    >
                     <IconCloseRed className=''/>
                    </div>
                  }
                  checkedHandleIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "white",
                        fontSize: 18
                      }}
                    >
                      --
                    </div>
                  }
                  className="react-switch"
                  id="small-radius-switch"
                />
              </div>
            </div>
            <div className='column ml-4'>
              <div className=" has-text-weight-normal is-info-card">
                <span className="is-size-6 has-text-grey">My First Campaign</span>
              </div>

            </div>

            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-7 has-text-primary has-text-weight-normal mb-0">Active</span>
                <span className="is-size-7 has-text-grey">Campaign Status</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-7 has-text-primary has-text-weight-normal mb-0">1000</span>
                <span className="is-size-7 has-text-grey">Daily Sending Limit</span>
              </div>
            </div>
            <div className="column   ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-7 has-text-primary has-text-weight-normal mb-0">June 7,2022</span>
                <span className="is-size-7 has-text-grey">Created</span>
              </div>
            </div>
            <div className="column  ">
              <div className="has-text-centered has-text-weight-normal is-info-card">
                <span className="is-block title is-7 has-text-primary has-text-weight-normal mb-0">Pulkit Gupta</span>
                <span className="is-size-7 has-text-grey">Owner</span>
              </div>
            </div>
          </div>
        </Slot>
      </Card></div>
  )
}

export default CampaignStatusSection