import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import BScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';
import PullDown from '@better-scroll/pull-down';
BScroll.use(PullUp);
BScroll.use(PullDown);

function Scroll(props) {
  const wrapper = useRef(null);
  const scroll = useRef(null);
  const {
    probeType = 0,
    pullUpLoad = false,
    PullDownRefresh = false,
    data,
  } = props;

  useEffect(() => {
    scroll.current = new BScroll(wrapper.current, {
      probeType,
      pullUpLoad,
      PullDownRefresh,
    });
    return () => {
      scroll.current.destroy();
    };
  }, [probeType, pullUpLoad, PullDownRefresh]);

  useEffect(() => {
    scroll.current && scroll.current.refresh();
  }, [data]);

  return (
    <ScrollWrap ref={wrapper}>
      <div className="content">{props.children}</div>
    </ScrollWrap>
  );
}

export default Scroll;

const ScrollWrap = styled.div`
  position: absolute;
  top: 44px;
  bottom: 55px;
  left: 0;
  right: 0;
  overflow: hidden;
`;
