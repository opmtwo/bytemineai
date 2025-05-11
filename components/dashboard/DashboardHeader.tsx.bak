import React from "react";
import styles from "./dashboard.module.css";
import classNames from "classnames";
import { useAuthContext } from "../../providers/auth-data-provider";
import Card from "../cards/Card";
import Slot from "../Slot";

const DashboardHeader = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Card>
        <Slot slot="body">
          <div className="is-relative">
            <div
              className={classNames("panel-block has-radius", {
                [styles["headerImg"]]: true,
              })}
            ></div>
            <div className={styles.headerText}>
              <h2 className="title" style={{ marginTop: "5px" }}>
                Hey, {user?.attributes.given_name}!
              </h2>
              <h2 className="title">It&apos;s time to find some leads.</h2>
            </div>
          </div>
        </Slot>
      </Card>
    </>
  );
};

export default DashboardHeader;
