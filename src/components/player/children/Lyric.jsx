import React from "react";
import styled from "styled-components";
import { Scroll } from "@/common";

function Lyric() {
  return (
    <StyleWrap>
      <div className="top-mask"></div>
      <Scroll>
        <ul className="lyric-list">
          {Array(30)
            .fill(1)
            .map((_, index) => (
              <li className="lyric-item" key={index}>
                <p className="text">{"该配合你演出的我演视而不见"}</p>
              </li>
            ))}
        </ul>
      </Scroll>
      <div className="bottom-mask"></div>
    </StyleWrap>
  );
}

export default Lyric;

const StyleWrap = styled.div`
  position: absolute;
  width: 100%;
  top: 65px;
  bottom: 180px;
  white-space: nowrap;

  .lyric-list {
    width: 80%;
    padding: 0 10%;
    text-align: center;
  }

  .lyric-item {
    padding: 8px 0;
    line-height: 20px;
    font-size: 14px;
    color: hsla(0, 0%, 100%, 0.5);

    .text {
      color: hsla(0, 0%, 100%, 0.5);
      font-size: 14px;
      white-space: pre-wrap;
    }

    .text-active {
      color: #fff;
    }
  }

  .top-mask,
  .bottom-mask {
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
  }

  .top-mask {
    top: 0;
  }
  .bottom-mask {
    bottom: 0;
  }
`;
