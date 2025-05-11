import React from "react";
import Card from "../cards/Card";
import IconStack from "../icons/IconStack";
import IconChrome from "../icons/IconChrome";
import IconTarget from "../icons/IconTarget";
import IconUser from "../icons/IconUser";
import IconDownload from "../icons/IconDownload";
import Slot from "../Slot";
import styles from "./dashboard.module.css";
import Link from "next/link";

const dashboardData = [
  {
    title: "Find prospects",
    src: "/prospect-finder",
    icon: <IconTarget />,
  },
  {
    title: "Enrich my data",
    src: "/enrich/bulk",
    icon: <IconStack />,
  },
  {
    title: "Download contacts",
    src: "/audience-builder",
    icon: <IconDownload />,
  },
  {
    title: "Enrich LinkedIn",
    src: "https://chrome.google.com/webstore/detail/nymblr-connect/nnbppllimdmkmlhaknfgafolieocaofd",
    icon: <IconChrome />,
  },
];

const DashboardAction = () => {
  return (
    <>
      <h2 className="pb-5 mb-3 is-size-4">
        <strong>What would you like to do?</strong>
      </h2>
      <div className="columns">
        {dashboardData?.map(({ title, icon, src }, index) => (
          <div className="column is-3" key={`dashboardData-${index}`}>
            <Card >
              <Slot slot="body" >
                <div
                  className="columns is-align-items-center mb-2"
                  style={{ padding: "25px 20px",minHeight: "115px" }}
                >
                  <div className="column is-2">
                    <span className={styles.commonActionIcon}>{icon}</span>
                  </div>
                  <div className="column is-10">
                    <big>
                      <Link href={src} passHref>
                          {(src === 'https://chrome.google.com/webstore/detail/nymblr-connect/nnbppllimdmkmlhaknfgafolieocaofd') ? <a style={{color:'#444'}} target="_blank" rel="noopener noreferrer"><strong style={{ cursor: "pointer" }}>{title}</strong></a> : <strong style={{ cursor: "pointer" }}>{title}</strong> }
                      </Link>
                    </big>
                  </div>
                </div>
              </Slot>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardAction;
