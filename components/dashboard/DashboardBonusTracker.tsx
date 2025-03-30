import React from "react";
import Card from "../cards/Card";
import Slot from "../Slot";
import IconHeart from "../icons/IconHeart";
import IconTrophy from "../icons/IconTrophy";
import styles from "./dashboard.module.css";
import Anchor from "../Anchor";
import { useSettingsContext } from "../../providers/settings-provider";
import CardAnimatePresence from "../cards/CardAnimatePresence";
import Loader from "../Loader";

const DashboardBonusTracker = () => {
  const { loading } = useSettingsContext();
  return (
    <Card>
      <Slot slot="header">
        <div className="columns">
          <div className="column is-12-tablet is-flex is-align-items-center">
            <div className="is-relative">
              <span className={styles.teamIcon}></span>
              <IconHeart className={styles.teamHeartSvg} />
            </div>

            <big>
              <strong>Bonus Tracker</strong>
            </big>
          </div>
        </div>
      </Slot>
      <Slot slot="body">
        <div className="columns">
          <div className="column is-12 ">
            <div
              className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
              style={{ minHeight: "20.9rem" }}
            >
              {loading ? (
                <CardAnimatePresence isActive>
                  <Loader />
                </CardAnimatePresence>
              ) : (
                <React.Fragment>
                  <div className={styles.iconAward}>
                    <IconTrophy />
                  </div>
                  <span className="is-size-6  has-text-centered my-4">
                    Get free credits every 3 months
                    <br />
                    when you upgrade!
                  </span>

                  <big>
                      <Anchor href="/account-settings/subscription-billing/plan" className="is-size-6 py-3 has-text-primary">
                          Learn More
                      </Anchor>
                  </big>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </Slot>
    </Card>
  );
};

export default DashboardBonusTracker;
