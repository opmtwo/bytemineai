import React from "react";
import Card from "../cards/Card";
import IconStack from "../icons/IconStack";
import IconChrome from "../icons/IconChrome";
import IconTarget from "../icons/IconTarget";
import IconUser from "../icons/IconUser";
import IconJohnSmith from "../icons/IconJohnSmith";
import Slot from "../Slot";
import styles from "./dashboard.module.css";
import Link from "next/link";
import FormButton from "../form/FormButton";
import { useRouter } from 'next/router';


const dashboardData = [
  {
    title: "Find prospects",
    src: "/prospect-finder",
    icon: <IconTarget />,
  },
  {
    title: "Enrich my data",
    src: "/enrich/company",
    icon: <IconStack />,
  },
  {
    title: "Manage my account",
    src: "/account-settings",
    icon: <IconUser />,
  },
  {
    title: "Install Chrome Extension",
    src: "https://chrome.google.com/webstore/detail/nymblr-connect/nnbppllimdmkmlhaknfgafolieocaofd",
    icon: <IconChrome />,
  },
];

const DashboardAction2 = () => {
  const router = useRouter();
  const chromeExtension = async () => {
    await router.push('https://chrome.google.com/webstore/detail/nymblr-connect/nnbppllimdmkmlhaknfgafolieocaofd');
  }

  return (
    <>

      <div className="columns" style={{marginTop:"20px"}}>

          <div className="column is-12" key={`dashboardData-001`} >
            <Card>
              <Slot slot="body">
                <div
                  className="columns is-flex is-align-items-center mb-2"
                  style={{ padding: "25px 20px", minHeight: "250px" }}
                >

                  <div className="column is-8">
                    <h1 className='has-text-primary' style={{fontSize:'26px'}}>LinkedIn Chrome Extension</h1>
                    <p style={{fontSize:'8px',color:'#444'}}>&nbsp;</p>
                    <p style={{fontSize:'18px',color:'#444'}}>Get the LinkedIn Chrome Extension and unlock contact information for people directly on their LinkedIn profile.</p>
                    <p style={{fontSize:'12px',color:'#444'}}>&nbsp;</p>
                    <Link href='https://chrome.google.com/webstore/detail/nymblr-connect/nnbppllimdmkmlhaknfgafolieocaofd' target="_blank" rel="noopener noreferrer">
                      <FormButton   type='button' color='is-primary' size='is-medium' className='is-primary' >Install for Free</FormButton>
                    </Link>

                      <div style={{position:'absolute',right:'140px',bottom:'10px'}}><IconJohnSmith /></div>

                  </div>
                </div>
              </Slot>
            </Card>
          </div>

      </div>
    </>
  );
};

export default DashboardAction2;
