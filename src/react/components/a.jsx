import React from "react";
import styles from "../modules/a.module.less";
import '../modules/test.css'
export default () => {
  console.log("a", styles);
  return (
    <div>
      a
      <div className={styles.title}>title</div>
      <span className="test">11111</span>
    </div>
  );
};
