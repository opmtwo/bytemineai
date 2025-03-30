import React from 'react'
import CampaignSummaryMenu from '../../components/CampaignSummaryMenu'
import FormButton from '../../../../form/FormButton'
import FormInput from '../../../../form/FormInput'
import Card from '../../../../cards/Card'
import Slot from '../../../../Slot'
import ErrorNotificaition from '../../../../notifications/ErrorNotification'
import FormLabel from '../../../../form/FormLabel'
import Switch from "react-switch";
import IconCloseRed from "../../icons/IconCloseRed"
import IconCheck from "../../icons/IconCheck"

const handleChange = () => {
    console.log("switched")
}


function CampaignSettings() {
    return (
        <div>
            <CampaignSummaryMenu />
            <div className='columns'>
                <div className='column is-2 mt-2' style={{color:"#6236ff"}}>
                    <big>Campaign Settings</big>
                </div>
                <div className='column is-7'>
                    <Card>
                        <Slot slot="header">
                            <big>Campaign Settings</big>
                        </Slot>
                        <Slot slot="body">
                            <div className="panel-block is-block">
                                <FormInput
                                    name="firstName"
                                    // value={firstName}
                                    label="Campaign Name"
                                    // onChange={setFirstName}
                                    placeholder='Enter campaign name'
                                    required={true}
                                    className="mt-2"
                                // error={firstNameError}
                                />
                                <div className='mt-5'>
                                    <FormLabel
                                        // value={lastName}
                                        label="Exclude Contacts with Replies"
                                    // onChange={setLastName}
                                    // error={lastNameError}
                                    />
                                    <Switch
                                        checked={true}
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
                                                    padding: "5px"
                                                }}
                                            >
                                                <IconCloseRed className='' />
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
                                               <IconCheck/>
                                            </div>
                                        }
                                        className="react-switch mt-2"
                                        id="small-radius-switch"
                                    />
                                </div>
                                <div className='mt-5'>
                                    <FormInput
                                        name="companyName"
                                        // value={companyName}
                                        label="Exclude Contacts from a Campaign"
                                        // onChange={setCompanyName}
                                        required={true}
                                        // error={companyNameError}
                                        placeholder='Select Campaigns'
                                        className="mt-2"
                                    />
                                </div>
                                <div className='mt-5'>
                                    <FormLabel
                                        // value={lastName}
                                        label="Exclude All Existing Contacts"
                                    // onChange={setLastName}
                                    // error={lastNameError}
                                    />
                                    <Switch
                                        checked={true}
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
                                            <div
                                            style={{
                                                display: "flex",
                                                // justifyContent: "center",
                                                // alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "orange",  
                                                // paddingRight: 2
                                            }}
                                        >

                                        </div>
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
                                                    padding: "5px"
                                                }}
                                            >
                                                <IconCloseRed className='' />
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
                                               <IconCheck/>
                                            </div>
                                        }
                                        className="react-switch mt-2"
                                        id="small-radius-switch"
                                    />
                                </div>
                                <IconCheck/>
                                {/* <div className='mt-3'> */}
                                    <FormInput
                                        name="companyName"
                                        // value={newPassword}
                                        label="Owner"
                                        // onChange={setNewPassword}
                                        type="text"
                                        // error={newPasswordError}
                                        placeholder='Pulkit Gupta'
                                        className="mt-2"
                                    />
                                {/* </div> */}
                                {/* <ErrorNotificaition error={error} /> */}
                            </div>
                        </Slot>
                        <Slot slot="footer">
                            <FormButton
                                type="submit"
                                variant={['is-outlined', 'is-ui-button']}
                                color= "is-link"
                                
                            // disabled={isBusy}
                            // loading={isBusy}
                            >
                                Save
                            </FormButton>
                        </Slot>
                    </Card>
                </div>
                <div className='column is-3'>

                </div>
            </div>

        </div>
    )
}

export default CampaignSettings