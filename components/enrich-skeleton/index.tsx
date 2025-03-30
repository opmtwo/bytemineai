import Card from "../cards/Card";
import CardTitle from "../CardTitle";
import Slot from "../Slot";
import styles from "./index.module.css";

export default function EnrichSkeleton() {
  return (
    <Card>
      <Slot slot="header">
        <div className={styles.headerContainer}>
          <div className={styles.leftHeaderContainer}>
            <div className={`${styles.lineAnimation} ${styles.checkbox}`}></div>
            <div className={`${styles.lineAnimation} ${styles.title}`}></div>
          </div>
          <div className={`${styles.lineAnimation} ${styles.checkbox}`}></div>
        </div>
      </Slot>
      <Slot slot="body">
        {[...new Array(6)].map((_, index) => (
          <div className={styles.skeleton} key={`skeleton-${index}`}>
            <div className={`${styles.line} ${styles.w5}`}></div>
            <div className={`${styles.line} ${styles.w5}`}></div>
            <div className={`${styles.line} ${styles.w5}`}></div>
          </div>
        ))}
      </Slot>
    </Card>
  );
}
