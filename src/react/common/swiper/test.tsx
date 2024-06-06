import React from "react";
import Swiper from ".";

const Test = () => {
  const list: Array<{ color: string }> = [
    { color: "red" },
    { color: "blue" },
    { color: "yellow" },
  ];
  const renderItem = ({ color }: { color: string }) => {
    return (
      <div
        style={{
          background: color,
          marginLeft: 20,
          width: 260,
          height: 100,
        }}
      >
        {color}
      </div>
    );
  };
  const renderItem1 = ({ color }: { color: string }) => {
    return (
      <div
        style={{
          background: color,
          width: 400,
          height: 100,
        }}
      >
        {color}
      </div>
    );
  };
  return (
    <div
      style={{
        width: 400,
      }}
    >
      <Swiper<{ color: string }>
        list={list}
        autoPlay={false}
        autoPlayDuration={3000}
        renderItem={renderItem}
      />
      <div
        style={{
          background: "green",
          height: 100,
          marginRight: 20,
        }}
      ></div>
      <Swiper<{ color: string }>
        list={list}
        autoPlay={false}
        autoPlayDuration={3000}
        renderItem={renderItem1}
      />
    </div>
  );
};

export default Test;
