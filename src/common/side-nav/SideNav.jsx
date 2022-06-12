import { useState } from "react";
import styled from "styled-components";

const NAV_ITEM_HEIGHT = 16;

function SideNav(props) {
  const { data, navTouchStart, navTouchMove, navTouchEnd } = props;
  const [curIdx, setCurIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [startPageY, setStartPageY] = useState(0);

  const handleTouchStart = e => {
    e.stopPropagation();
    const startIdx = Number(e.target.getAttribute("data-index"));
    setCurIdx(startIdx);
    setEndIdx(startIdx);
    setShowTip(true);
    setStartPageY(e.touches[0].pageY);
    navTouchStart(startIdx);
  };

  const handleTouchMove = e => {
    e.stopPropagation();
    const delta = e.touches[0].pageY - startPageY;
    let endIdx = curIdx + Math.round(delta / NAV_ITEM_HEIGHT);

    if (endIdx < 0) {
      endIdx = 0;
    } else if (endIdx > data.length - 1) {
      endIdx = data.length - 1;
    }
    setEndIdx(endIdx);
    navTouchMove(endIdx);
  };

  const handleTouchEnd = e => {
    e.stopPropagation();
    setShowTip(false);
    navTouchEnd?.();
  };
  return (
    <Wrap>
      <ul
        className="side-bar"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {data.map((item, index) => (
          <li className="side-bar-item" key={item} data-index={index}>
            {endIdx === index && showTip && (
              <div className="tip-box">
                <span className="tip-text">{item}</span>
              </div>
            )}
            {item}
          </li>
        ))}
      </ul>
    </Wrap>
  );
}

export default SideNav;

const Wrap = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  padding-right: 5px;
  z-index: 100;

  .side-bar {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 10px 0;
  }

  .side-bar-item {
    position: relative;
    padding: 0 5px;
    line-height: 16px;

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

  .current {
    color: var(--theme-color);
  }
`;
