import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const NAV_ITEM_HEIGHT = 16;

function SideNav(props) {
  const navRef = useRef();
  const { data, curIdx, navTouchStart, navTouchMove, navTouchEnd } = props;
  const [startIdx, setStartIdx] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [startPageY, setStartPageY] = useState(0);

  useEffect(() => {
    const navEle = navRef.current;
    navEle.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      navEle.removeEventListener("touchmove", handleTouchMove);
    };
    // eslint-disable-next-line
  }, [startPageY]);

  const handleTouchStart = e => {
    e.stopPropagation();
    const startIdx = Number(e.target.getAttribute("data-index"));
    setStartIdx(startIdx);
    setShowTip(true);
    setStartPageY(e.touches[0].pageY);
    navTouchStart(startIdx);
  };

  const handleTouchMove = e => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.touches[0].pageY - startPageY;
    let endIdx = startIdx + Math.round(delta / NAV_ITEM_HEIGHT);

    if (endIdx < 0) {
      endIdx = 0;
    } else if (endIdx > data.length - 1) {
      endIdx = data.length - 1;
    }
    navTouchMove(endIdx);
    // eslint-disable-next-line
  };

  const handleTouchEnd = e => {
    e.stopPropagation();
    setShowTip(false);
    navTouchEnd?.();
  };
  return (
    <StyleWrap
      ref={navRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ul className="side-bar">
        {data.map((item, index) => (
          <li
            className={"side-bar-item" + (curIdx === index ? " cur" : "")}
            key={item}
            data-index={index}
          >
            {curIdx === index && showTip && (
              <div className="tip-box">
                <span className="tip-text">{item}</span>
              </div>
            )}
            {item}
          </li>
        ))}
      </ul>
    </StyleWrap>
  );
}

export default SideNav;

const StyleWrap = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  padding: 0 5px;
  z-index: 100;

  .side-bar {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .side-bar-item {
    position: relative;
    padding: 0 5px;
    line-height: 16px;

    &:first-child {
      padding-top: 10px;
    }

    &:last-child {
      padding-bottom: 10px;
    }

    .tip-box {
      width: 40px;
      height: 40px;
      position: absolute;
      left: -50px;
      top: 50%;
      border-radius: 50% 0 50% 50%;
      transform: rotate(45deg);
      transform-origin: top right;
      background: rgba(0, 0, 0, 0.3);
      line-height: 40px;
      text-align: center;
    }
    .tip-text {
      display: inline-block;
      transform-origin: center;
      transform: rotate(-45deg);
      color: var(--theme-color);
    }
  }

  .cur {
    color: var(--theme-color);
  }
`;
