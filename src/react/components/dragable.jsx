import React, { Fragment, useEffect, useState } from "react";
import "../modules/dragable.less";

const Dragable = () => {
  const [item, setItem] = useState([]);
  const [dragName, setDragName] = useState("");
  useEffect(() => {
    const final = [];
    for (let i = 0; i < 5; i++) {
      final.push({
        name: `item${i}`,
      });
    }
    setItem(final);
  }, []);
  const onDragStart = (e, targetName) => {
    // setDragName(targetName);
  };
  const onDragEnter = (e, targetName) => {
    console.log(e, targetName, "onDragEnter");
    // const targetIndex = item.findIndex(({ name }) => name === dragName);
    // const curIndex = item.findIndex(({ name }) => name === targetName);
    // const [curItem] = item.splice(curIndex, 1);
    // item.splice(targetIndex, 0, curItem);
    // setItem([...item]);
    setDragName(targetName);
  };
  const onDragEnd = (e, targetName) => {
    const targetIndex = item.findIndex(({ name }) => name === dragName);
    const curIndex = item.findIndex(({ name }) => name === targetName);
    const [curItem] = item.splice(curIndex, 1);
    item.splice(targetIndex, 0, curItem);
    setItem([...item]);
    setDragName("");
  };
  return (
    <div className="container">
      {!!item.length &&
        item.map(({ name }, index) => {
          // if (dragName === name) {
          //   return <div className="item-drag" key={index}></div>;
          // }
          return (
            <div
              onDragStart={(e) => {
                onDragStart(e, name);
              }}
              onDragEnter={(e) => {
                onDragEnter(e, name);
              }}
              onDragEnd={(e) => {
                onDragEnd(e, name);
              }}
              key={name}
              draggable
              className={`item ${dragName === name ? "enter" : ""}`}
            >
              {name}
            </div>
          );
        })}
    </div>
  );
};

export default Dragable;
