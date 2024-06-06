import React, { ReactNode, useEffect } from "react";
import styles from "./index.module.less";
import { useSwiper } from "./hook";

function Swiper<T>({
  list = [],
  autoPlay = false,
  autoPlayDuration = 3000,
  infinite = false,
  renderItem,
  triggerActive,
}: {
  list: Array<T>;
  autoPlay: boolean;
  autoPlayDuration?: number;
  infinite?: boolean;
  renderItem: (params: T, index: number) => ReactNode;
  triggerActive?: (params: number) => void;
}) {
  const { handleTouchStart, wrapEle, left, activeIndex, swiperList } =
    useSwiper<T>({
      list,
      autoPlay,
      autoPlayDuration,
      infinite,
    });

  useEffect(() => {
    triggerActive?.(activeIndex);
  }, [activeIndex]);

  return (
    <div className={styles["wrap-swipper"]}>
      <div
        className={styles["swiper"]}
        style={{
          transform: `translateX(${-left.current.toFixed(3)}px)`,
        }}
        ref={wrapEle}
      >
        {swiperList.map((i, index) => (
          <div
            key={index}
            className={styles["swiper-item"]}
            onTouchStart={(e) => {
              handleTouchStart(e, index);
            }}
            onMouseDown={(e) => {
              handleTouchStart(e, index);
            }}
          >
            {renderItem(i, index)}
          </div>
        ))}
      </div>
      <div className={styles["item"]}>
        {activeIndex + 1}/{list.length}
      </div>
    </div>
  );
}

export default Swiper;
