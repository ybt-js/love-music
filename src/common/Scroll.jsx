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

function Scroll(props, ref) {
  const wrapperRef = useRef();
  const [bScroll, setBScroll] = useState(null)

  const {
    probeType = 0,
    pullUpLoad = false,
    pullDownRefresh = false,
    useTransition = false,
    pullUp,
    pullDown,
    handleScroll,
    handleScrollEnd,

  } = props;

  //初始化BetterScroll
  useEffect(() => {
    const bScroll = new BScroll(wrapperRef.current, {
      probeType,
      pullUpLoad,
      pullDownRefresh,
      useTransition
    });
    setBScroll(bScroll)

    return () => {
      bScroll.destroy();
      setBScroll(null)
    };
    // eslint-disable-next-line
  }, []);

  const handlePullUp = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp]);

  const handlePullDown = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown]);

  // 上拉加载
  useEffect(() => {
    if (!bScroll?.finishPullUp) return;

    bScroll.on("pullingUp", () => {
      handlePullUp(() => {
        console.log('上拉');
        bScroll.finishPullUp();
        bScroll.refresh();
      });
    });

    return () => {
      bScroll.off("pullingUp");
    }
  }, [bScroll, handlePullUp]);

  //下拉刷新
  useEffect(() => {
    if (!bScroll?.finishPullDown) return

    bScroll.on("pullingDown", () => {
      handlePullDown((fn) => {
        console.log('下拉');
        bScroll.finishPullDown();
        fn(false)
        bScroll.refresh();

      })
    });

    bScroll.on("enterThreshold", () => {
      //todo 显示下拉刷新
    })

    bScroll.on('leaveThreshold', () => {
      //todo 显示松手刷新
    })

    return () => {
      bScroll.off("pullingDown");
    }
  }, [bScroll, handlePullDown])

  useEffect(() => {
    if (!bScroll) return;
    bScroll.on("scroll", handleScroll);
    bScroll.on("scrollEnd", handleScrollEnd);

    return () => {
      bScroll.off("scroll");
      bScroll.off("scrollEnd");
    };
  }, [bScroll, handleScroll, handleScrollEnd]);

  useImperativeHandle(ref, () => {
    return {
      refresh: () => {
        console.log('refresh');
        bScroll?.refresh();
      },
      scrollTo: (x, y, time) => {
        bScroll?.scrollTo(x, y, time);
      },
      scrollToElement: (ele, time) => {
        bScroll?.scrollToElement(ele, time);
      },
    };
  });

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default forwardRef(Scroll);
