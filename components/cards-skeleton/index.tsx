import Card from "../cards/Card";
import CardTitle from "../CardTitle";
import Slot from "../Slot";
import styles from "./cardSkeleton.module.css";

export default function CardSkelton() {
  return (
    <Card>
      <Slot slot="header">
        <CardTitle>Recent Searches</CardTitle>
      </Slot>
      <Slot slot="body">
        {[...new Array(5)].map((_, index) => (
          <div className={styles.skeleton} key={`skeleton-${index}`}>
            <div className={styles.flexcustom}>
              <div className={`${styles.line} ${styles.w5}`}></div>
              <div className={`${styles.line} ${styles.w15}`}></div>
            </div>
          </div>
        ))}
      </Slot>
    </Card>
  );
}
