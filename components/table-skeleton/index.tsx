import React from "react";
import Card from "../cards/Card";
import Slot from "../Slot";
import styles from "./tableSkeleton.module.css";

export default function TableSkeleton({ rows = 10 }) {
  return (
    <Card className="is-scroll-view is-clipped">
      <Slot slot="header">
        <div className={styles.skeletonHeader}>
          <div className={styles.skeletonSubHeader}>
            <div className={`${styles.lineAnimation} ${styles.checkbox}`}></div>
            <div className={`${styles.lineAnimation} ${styles.unlock}`}></div>
          </div>
          <div className={styles.skeleton2SubHeader}>
            <div className={`${styles.lineAnimation} ${styles.button}`}></div>
            <div
              className={`${styles.lineAnimation} ${styles.pagination}`}
            ></div>
          </div>
        </div>
      </Slot>
      <Slot slot="body">
        {[...new Array(rows)].map((_, index) => (
          <div className={styles.skeletonBody} key={`skeleton-${index}`}>
            <div className={styles.skeletonSubHeader}>
              <div
                className={`${styles.lineAnimation} ${styles.checkbox}`}
              ></div>
              <div>
                <div
                  className={`${styles.lineAnimation} ${styles.header}`}
                ></div>
                <div
                  className={`${styles.lineAnimation} ${styles.header1}`}
                ></div>
              </div>
            </div>
            <div className={`${styles.lineAnimation} ${styles.header}`}></div>
            <div>
              <div className={`${styles.lineAnimation} ${styles.header}`}></div>
              <div
                className={`${styles.lineAnimation} ${styles.header1}`}
              ></div>
            </div>
            <div className={`${styles.lineAnimation} ${styles.header}`}></div>
            <div className={`${styles.lineAnimation} ${styles.header}`}></div>
          </div>
        ))}
      </Slot>
      <Slot slot="footer">
        <div className={styles.skeletonfooter}>
          <div
            className={`${styles.lineAnimation} ${styles.footerPagination}`}
          ></div>
        </div>
      </Slot>
    </Card>
  );
}
