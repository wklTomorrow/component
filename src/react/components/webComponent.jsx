import React from "react";
export default () => {
  return (
    <div>
      <order-card
        handleCb={`(str) => {
          console.log(str);
        }`}
        label={"hello world"}
        onClick={() => {
          console.log("hhhh");
        }}
      ></order-card>
    </div>
  );
};
