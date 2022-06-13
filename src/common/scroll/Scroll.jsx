import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  useImperativeHandle,
} from "react";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import { debounce } from "@/utils";

BScroll.use(PullUp);
BScroll.use(PullDown);

const Scroll = forwardRef((props, ref) => {
  const wrapperRef = useRef();
  const [bScroll, setBScroll] = useState(null);

  const {
    click = true,
    probeType = 3,
    pullUpLoad = false,
    pullDownRefresh = false,
    useTransition = false,
    onPullUp,
    onPullDown,
    onScroll,
    onScrollEnd,
    onEnterThreshold,
    onLeaveThreshold,
  } = props;

  //初始化BetterScroll
  useEffect(() => {
    const bScroll = new BScroll(wrapperRef.current, {
      click,
      probeType,
      pullUpLoad,
      pullDownRefresh,
      useTransition,
    });
    setBScroll(bScroll);

    return () => {
      bScroll.destroy();
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, [probeType]);

  const handlePullUp = useMemo(() => {
    return debounce(onPullUp, 300);
  }, [onPullUp]);

  const handlePullDown = useMemo(() => {
    return debounce(onPullDown, 300);
  }, [onPullDown]);

  const handleEnterThreshold = useMemo(() => {
    return debounce(onEnterThreshold, 300);
  }, [onEnterThreshold]);

  const handleLeaveThreshold = useMemo(() => {
    return debounce(onLeaveThreshold, 300);
  }, [onLeaveThreshold]);

  // 上拉加载
  useEffect(() => {
    if (!bScroll?.finishPullUp) return;

    bScroll.on("pullingUp", () => {
      handlePullUp(() => {
        console.log("上拉");
        bScroll.finishPullUp();
        bScroll.refresh();
      });
    });

    return () => {
      bScroll.off("pullingUp");
    };
  }, [bScroll, handlePullUp]);

  //下拉刷新
  useEffect(() => {
    if (!bScroll?.finishPullDown) return;

    bScroll.on("pullingDown", () => {
      handlePullDown(fn => {
        console.log("下拉");
        bScroll.finishPullDown();
        // BScroll 配置项bounceTime默认为800, 等待bounceAnimation然后刷新
        setTimeout(() => {
          fn?.();
          bScroll.refresh();
        }, 850);
      });
    });

    bScroll.on("enterThreshold", handleEnterThreshold);
    bScroll.on("leaveThreshold", handleLeaveThreshold);

    return () => {
      bScroll.off("pullingDown");
      bScroll.off("enterThreshold");
      bScroll.off("leaveThreshold");
    };
  }, [bScroll, handlePullDown, handleEnterThreshold, handleLeaveThreshold]);

  useEffect(() => {
    if (!bScroll) return;
    bScroll.on("scroll", onScroll);
    bScroll.on("scrollEnd", onScrollEnd);

    return () => {
      bScroll.off("scroll");
      bScroll.off("scrollEnd");
    };
  }, [bScroll, onScroll, onScrollEnd]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      console.log("refresh");
      bScroll?.refresh();
    },
    scrollTo: (x, y, time) => {
      bScroll?.scrollTo(x, y, time);
    },
    scrollToElement: (ele, time) => {
      bScroll?.scrollToElement(ele, time);
    },
  }));

  return (
    <div style={{ height: "100%", overflow: "hidden" }} ref={wrapperRef}>
      <div className="content">{props.children}</div>
    </div>
  );
});

Scroll.displayName = "Scroll";

export default Scroll;
