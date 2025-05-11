import React from "react";
import Card from "../cards/Card";
import Slot from "../Slot";
import IconHeart from "../icons/IconHeart";
import IconBulb from "../icons/IconBulb";
import styles from "./dashboard.module.css";
import moment from "moment";
import { useSettingsContext } from "../../providers/settings-provider";
import classNames from "classnames";
import CardAnimatePresence from "../cards/CardAnimatePresence";
import Loader from "../Loader";

const DashboardBonusTracker = () => {
  const { settings, loading } = useSettingsContext();
  const createdAt = Number(settings?.["custom:created_at"]);
  const expiredDate = moment(createdAt).add(90, "days");
  const today = moment();
  let daysLeft = expiredDate.diff(today, "days");
  console.log(daysLeft);

  while (daysLeft<0){
      daysLeft = daysLeft+90;
  }
    console.log(daysLeft);
  return (
    <Card>
      <Slot slot="header">
        <div className="columns" style={{ width: "100%" }}>
          <div className="column is-8-tablet is-flex is-align-items-center">
            <div className="is-relative">
              <span className={styles.teamIcon}></span>
              <IconHeart className={styles.teamHeartSvg} />
            </div>
            <big>
              <strong>Bonus Tracker</strong>
            </big>
          </div>

          <div
            className={classNames(
              "column is-4-tablet is-flex is-align-items-center is-justify-content-end",
              {
                [styles["formButtonInvited"]]: true,
              }
            )}
          >
            <span className="is-size-6 has-text-grey ${styles.formButtonInvited">
              {daysLeft} days Left
            </span>
          </div>
        </div>
      </Slot>
      <Slot slot="body">
        <div className="columns">
          <div className="column is-12 ">
            {loading ? (
              <CardAnimatePresence isActive>
                <Loader />
              </CardAnimatePresence>
            ) : (
              <React.Fragment>
                <div
                  className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
                  style={{ minHeight: "16.5rem" }}
                >
                  <span className="is-block title is-3 has-text-primary has-text-weight-normal mb-2">
                    {settings?.["custom:bonus_credits"]}
                  </span>
                  <span className="is-size-6 has-text-grey">Bonus Credits</span>
                </div>

                <div
                  className="is-flex"
                  style={{ minHeight: "2.9rem", padding: "3px 16px 4px 16px" }}
                >
                  <span
                    style={{
                      width: "60px",
                      fill: "orange",
                      marginRight: "10px",
                    }}
                  >
                    <IconBulb />
                  </span>
                  <p>
                    We appreciate your business and we want to give you
                    something back. You will receive free credits every quarter.
                  </p>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Slot>
    </Card>
  );
};

export default DashboardBonusTracker;
