import React from "react";
import styles from "../modules/a.module.less";
export default () => {
  console.log("a", styles);
  return (
    <div>
      a
      <span className={styles.title}>title</span>
    </div>
  );
};
