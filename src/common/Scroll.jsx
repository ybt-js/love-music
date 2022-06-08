import {
  useEffect,
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import { debounce } from "@/utils";

BScroll.use(PullUp);
BScroll.use(PullDown);

function Scroll(props, ref) {
  let wrapper = null;
  const scroll = useRef();

  const {
    probeType = 0,
    pullUpLoad = false,
    PullDownRefresh = false,
    pullUp,
    pullDown,
    handleScroll,
    handleScrollEnd,
  } = props;

  useEffect(() => {
    scroll.current = new BScroll(wrapper, {
      probeType,
      pullUpLoad,
      PullDownRefresh,
    });

    return () => {
      scroll.current?.destroy();
    };
    // eslint-disable-next-line
  }, [probeType, pullUpLoad, PullDownRefresh]);

  const handlePullUp = useCallback(() => {
    const debouncePullUp = debounce(pullUp, 300);
    debouncePullUp(() => {
      const bs = scroll.current;
      if (!bs) return;
      bs.finishPullUp();
      bs.refresh();
    });
  }, [pullUp]);

  const handlePullDown = useCallback(() => {
    const debouncePullDown = debounce(pullDown, 300);
    debouncePullDown(() => {
      const bs = scroll.current;
      if (!bs) return;
      bs.finishPullDown();
      bs.refresh();
    });
  }, [pullDown]);

  useEffect(() => {
    const bs = scroll.current;
    if (!bs) return;
    bs.finishPullUp && bs.off("pullingUp", handlePullUp);
    // bs.pullingDown && bs.off("pullingDown", handlePullDown);

    bs.finishPullUp && bs.once("pullingUp", handlePullUp);
    // bs.pullingDown && bs.on("pullingDown", handlePullDown);
  }, [handlePullUp]);

  useEffect(() => {
    const bs = scroll.current;
    if (!bs) return;
    bs.on("scroll", handleScroll);
    bs.on("scrollEnd", handleScrollEnd);

    return () => {
      bs.off("scroll", handleScroll);
      bs.off("scrollEnd", handleScrollEnd);
    };
  }, [handleScroll, handleScrollEnd]);

  useImperativeHandle(ref, () => {
    const bs = scroll.current;
    return {
      refresh: () => {
        bs?.refresh();
      },
      finishPullUp: () => {
        console.log("finishPullUp");
        bs?.finishPullUp();
      },
      finishPullDown: () => {
        bs?.finishPullDown();
      },
      scrollTo: (x, y, time) => {
        bs?.scrollTo(x, y, time);
      },
      scrollToElement: (ele, time) => {
        bs?.scrollToElement(ele, time);
      },
    };
  });

  return (
    <div className="wrapper" ref={el => (wrapper = el)}>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default forwardRef(Scroll);
