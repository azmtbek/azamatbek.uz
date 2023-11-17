import React from "react";
import styles from "./Mountains.module.css";
const Mountains = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.mountain}>
        <div className={styles["mountain-top"]}>
          <div className={styles["mountain-cap-1"]}></div>
          <div className={styles["mountain-cap-2"]}></div>
          <div className={styles["mountain-cap-3"]}></div>
        </div>
      </div>
      <div className={styles["mountain-two"]}>
        <div className={styles["mountain-top"]}>
          <div className={styles["mountain-cap-1"]}></div>
          <div className={styles["mountain-cap-2"]}></div>
          <div className={styles["mountain-cap-3"]}></div>
        </div>
      </div>
      <div className={styles["mountain-three"]}>
        <div className={styles["mountain-top"]}>
          <div className={styles["mountain-cap-1"]}></div>
          <div className={styles["mountain-cap-2"]}></div>
          <div className={styles["mountain-cap-3"]}></div>
        </div>
      </div>
      <div className={styles.cloud}></div>
    </div>
  );
};

export default Mountains;
