import React from "react";
import styles from "../css/campaign.module.css";
import classNames from "classnames";
import { useAuthContext } from "../../../../providers/auth-data-provider";
import Card from "../../../cards/Card";
import Slot from "../../../Slot";

const DashboardHeader = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Card>
        <Slot slot="body">
            
            <div
              className={classNames("panel-block2 has-radius is-relative", {
                [styles["headerImg"]]: true,
              })}
            >
            <div className={styles.headerText}>
              <h2 className="title" style={{ marginTop: "5px" }}>
                Hey, {user?.attributes.given_name}! Our AI Campaign Builder will help you
              </h2>
              <h2 className="title">build and launch a cold outbound email campaign in less than 1 minute.</h2>
            </div>
            </div>
        </Slot>
      </Card>
    </>
  );
};

export default DashboardHeader;
