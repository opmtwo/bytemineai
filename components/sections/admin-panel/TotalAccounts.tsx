import React from 'react'
import Card from '../../cards/Card';
import Info from '../../Info';
import Slot from '../../Slot';

function TotalAccounts() {
  return (
    <div>
      <Card>
        <Slot slot="header">
          <div className="columns " style={{ width: "100%" }}>
            <div className="column is-8-tablet is-flex is-align-items-center">
              <div className="is-relative">
              </div>
              <big>
                <strong>Total Accounts</strong>
              </big>
            </div>
            <div className="column is-2-tablet  is-flex is-align-items-center is-justify-content-flex-end">
              {/* <IconFilter/> */}
            </div>
            <div className="column is-2-tablet has-text-primary is-flex is-align-items-center is-justify-content-flex-end">
              <span>Nymblr</span>
            </div>
          </div>
        </Slot>
        <Slot slot="body">
          <div className="panel-block is-block is-relative">
            <div className="columns is-mobile is-multiline">
              <div className="column  ">
                <Info name="Trial" value={3000} />
              </div>
              <div className="column  ">
                <Info name="Monthly" value={250} />
              </div>
              <div className="column   ">
                <Info name="Annual" value={30} />
              </div>
              <div className="column  ">
                <Info name="Enterprise" value={3} />
              </div>
            </div>
          </div>
        </Slot>
      </Card>
      </div>
  )
}

export default TotalAccounts
