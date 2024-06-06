import React, { useEffect, useRef, useState } from "react";

/**
 * react 滚动组件，支持自动滚动无限滚动
 * 如果页面元素存在margin-left则表示右边有填充，并且与左边持平
 * 如果存在填充，应当禁止自动轮播、无限滚动
 */
export const useSwiper = <T>({
  list = [],
  span = 7,
  bounce = 0.3,
  endBounce = 0.4,
  autoPlay = false,
  autoPlayDuration = 3000,
  infinite = false,
}: {
  list: Array<T>;
  span?: number;
  bounce?: number;
  endBounce?: number;
  autoPlay?: boolean;
  autoPlayDuration?: number;
  infinite?: boolean;
}) => {
  const left = useRef<number>(0);
  const toucheEle = useRef<any>(null);
  const wrapEle = useRef<HTMLDivElement>(null);
  const moving = useRef(false);
  const movingSwiper = useRef(false);
  const touchIndex = useRef(-1);
  const pageX = useRef(0);
  const pageY = useRef(0);
  const pageMove = useRef(0);
  const hasMove = useRef(0);
  const autoMoveTimer = useRef<any>(null);
  const activeIndex = useRef(0);
  const requestId = useRef<any>();
  const dealRightGutter = useRef<{
    endWidth: number;
    got: boolean;
  }>({
    got: false,
    endWidth: 0,
  });
  const [_, _update] = useState(0);
  const [swiperList, setSwiperList] = useState<Array<T>>([]);

  const getBouncePostion = () =>
    (touchIndex.current === 0 && hasMove.current < 0) ||
    (touchIndex.current === list.length - 1 && hasMove.current > 0);

  const clearTimer = () => {
    if (autoMoveTimer.current) {
      clearTimeout(autoMoveTimer.current);
      autoMoveTimer.current = null;
    }
  };

  const clearRequestId = () => {
    if (requestId.current) {
      window.cancelAnimationFrame(requestId.current);
      requestId.current = null;
    }
  };

  const move = ({
    start = 0,
    end = 0,
    speed = 1,
    done,
  }: {
    start: number;
    end: number;
    speed?: number;
    done: () => void;
  }) => {
    if (!moving.current) {
      return;
    }
    let startMove = 0;
    const len = end - Math.abs(start);
    const startLeft = left.current;
    let goRight = true;
    if (start < 0) {
      goRight = false;
    }
    const run = () => {
      clearRequestId();
      startMove = Number(startMove.toFixed(3));
      if (goRight) {
        startMove = startMove + span * speed;
      } else {
        startMove = startMove - span * speed;
      }
      if (Math.abs(startMove) > len) {
        if (goRight) {
          startMove = len;
        } else {
          startMove = -len;
        }
      }
      left.current = startLeft + startMove;
      _update((old) => old + 1);
      if (Math.abs(startMove) === len) {
        done();
      }
      if (Math.abs(startMove) < len) {
        requestId.current = window.requestAnimationFrame(run);
      }
    };
    run();
  };

  const moveBounce = (len: number, done: () => void) => {
    let goRight = true;
    if (len < 0) {
      goRight = false;
    }
    const startLeft = left.current;
    let startMove = 0;
    const run = () => {
      clearRequestId();
      startMove = Number(startMove.toFixed(3));
      if (goRight) {
        startMove = startMove - span;
      } else {
        startMove = startMove + span;
      }
      if (Math.abs(startMove) >= Math.abs(len)) {
        startMove = -len;
      }
      left.current = startLeft + startMove;
      _update((old) => old + 1);
      if (Math.abs(startMove) === Math.abs(len)) {
        done();
      }
      if (Math.abs(startMove) < Math.abs(len)) {
        requestId.current = window.requestAnimationFrame(run);
      }
    };
    run();
  };

  const done = () => {
    moving.current = false;
    hasMove.current = 0;
    pageX.current = -1;
    pageY.current = -1;
    touchIndex.current = -1;
  };

  const handleTouchStart = (
    e: React.TouchEvent | React.MouseEvent,
    index: number
  ) => {
    clearTimer();
    if (moving.current) {
      return;
    }
    moving.current = true;
    addEventlistener(e.target as Element);
    pageX.current =
      (e as React.MouseEvent).clientX ||
      (e as React.TouchEvent).targetTouches[0].pageX;
    pageY.current =
      (e as React.MouseEvent).clientY ||
      (e as React.TouchEvent).targetTouches[0].pageY;
    toucheEle.current = e.target as Element;
    pageMove.current = pageX.current;
    touchIndex.current = index;
    movingSwiper.current = false;
  };

  const touchmove = (e: Event) => {
    if (moving.current) {
      const X =
        (e as MouseEvent).clientX || (e as TouchEvent).touches[0]?.pageX;
      const Y =
        (e as MouseEvent).clientY || (e as TouchEvent).touches[0]?.pageY;
      if (Math.abs(pageX.current - X) > Math.abs(pageY.current - Y)) {
        movingSwiper.current = true;
        const oldV = pageX.current;
        pageX.current = X;
        const moveLen = oldV - X;
        const curLeft = Number(left.current.toFixed(3));
        hasMove.current = pageMove.current - X;
        if (
          !infinite &&
          getBouncePostion() &&
          (e as TouchEvent).changedTouches[0]?.clientX
        ) {
          left.current = curLeft + moveLen * endBounce;
        } else {
          left.current = curLeft + moveLen;
        }

        _update((old) => old + 1);
      } else {
        if (!movingSwiper.current) {
          moving.current = false;
        }
      }
      pageX.current = X;
      pageY.current = Y;
    }
  };

  const touchend = (e: Event) => {
    removeEventListener(e.target as Element);
    if (!moving.current) {
      return;
    }

    if (
      (e as MouseEvent).clientX ||
      (e as TouchEvent).changedTouches[0]?.pageX
    ) {
      const x =
        (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].pageX;
      if (!infinite && getBouncePostion()) {
        hasMove.current = (pageMove.current - x) * endBounce;
      } else {
        hasMove.current = pageMove.current - x;
      }
    }

    if (wrapEle.current) {
      if (getBouncePostion() && !infinite) {
        moveBounce(hasMove.current, done);
        return;
      }
      if (!dealRightGutter.current.got) {
        const marginLeft = parseFloat(
          (getComputedStyle(toucheEle.current) as any)["margin-left"]
        );
        dealRightGutter.current = {
          got: true,
          endWidth:
            toucheEle.current.offsetWidth * 2 +
            marginLeft * 3 -
            wrapEle.current.offsetWidth,
        };
      }

      const width = wrapEle.current.children[0]?.clientWidth || 0;
      if (Math.abs(hasMove.current) > width * bounce) {
        const getEnd = () => {
          if (dealRightGutter.current.endWidth) {
            if (
              hasMove.current > 0 &&
              activeIndex.current === list.length - 2
            ) {
              return dealRightGutter.current.endWidth;
            }
            if (
              hasMove.current < 0 &&
              activeIndex.current === list.length - 1
            ) {
              return dealRightGutter.current.endWidth;
            }
          }
          return width;
        };
        move({
          start: hasMove.current,
          end: getEnd(),
          done: () => {
            if (hasMove.current > 0) {
              activeIndex.current = activeIndex.current + 1;
            } else {
              activeIndex.current = activeIndex.current - 1;
            }
            _update((old) => old + 1);
            done();
            if (infinite) {
              if (activeIndex.current === -1) {
                activeIndex.current = list.length - 1;
                left.current = width * (swiperList.length - 2);
                _update((old) => old + 1);
              } else if (activeIndex.current === list.length) {
                activeIndex.current = 0;
                left.current = width;
                _update((old) => old + 1);
              }
            }
          },
        });
      } else {
        moveBounce(hasMove.current, done);
      }
    }
  };

  const addEventlistener = (dom: Element) => {
    dom.addEventListener("touchmove", touchmove);
    dom.addEventListener("touchend", touchend);
    dom.addEventListener("mousemove", touchmove);
    dom.addEventListener("mouseup", touchend);
    console.log(dom)
  };

  const removeEventListener = (dom: Element) => {
    dom.removeEventListener("touchmove", touchmove);
    dom.removeEventListener("touchend", touchend);
    dom.removeEventListener("mousemove", touchmove);
    dom.removeEventListener("mouseup", touchend);
  };

  const circle = () => {
    if (autoPlay) {
      autoMoveTimer.current = setTimeout(() => {
        clearTimer();
        const width = wrapEle.current?.children[0]?.clientWidth || 0;
        moving.current = true;
        if (infinite) {
          move({
            start: width,
            end: width * 2,
            done: () => {
              done();
              circle();
              activeIndex.current = activeIndex.current + 1;
              _update((old) => old + 1);
              if (activeIndex.current === list.length) {
                activeIndex.current = 0;
                left.current = width;
                _update((old) => old + 1);
              }
            },
          });
        } else {
          if (activeIndex.current < list.length - 1) {
            move({
              start: width,
              end: width * 2,
              done: () => {
                done();
                circle();
                activeIndex.current = activeIndex.current + 1;
                _update((old) => old + 1);
              },
            });
          } else {
            move({
              start: -width,
              end: width * list.length,
              speed: list.length,
              done: () => {
                done();
                circle();
                activeIndex.current = 0;
                _update((old) => old + 1);
              },
            });
          }
        }
      }, autoPlayDuration);
    }
  };

  useEffect(() => {
    if (list.length) {
      if (infinite && list.length > 1) {
        const end = list[list.length - 1];
        const first = list[0];
        const oldList = [...list];
        oldList.unshift(end);
        oldList.push(first);
        setSwiperList(oldList);
        left.current = wrapEle.current?.offsetWidth || 0;
      } else {
        setSwiperList(list);
      }
    }
  }, [list.length, infinite]);

  useEffect(() => {
    circle();
    return () => {
      if (toucheEle.current) {
        removeEventListener(toucheEle.current as Element);
      }
    };
  }, []);

  return {
    handleTouchStart,
    swiperList,
    left,
    wrapEle,
    activeIndex: activeIndex.current,
  };
};
