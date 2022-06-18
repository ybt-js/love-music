import React from "react";
import styled from "styled-components";

function Progress() {
  return (
    <StyleWrap>
      <div className="bar">
        <div className="btn"></div>
        <div className="pass"></div>
      </div>
      <div className="time">
        <span className="start">{"00:00"}</span>
        <span className="end">{"03:34"}</span>
      </div>
    </StyleWrap>
  );
}

export default Progress;

const StyleWrap = styled.div`
  position: absolute;
  bottom: 120px;
  width: 80%;
  padding: 0 10%;
  color: #fff;

  .bar {
    position: relative;
    height: 2px;
    background-color: hsla(0, 0%, 100%, 0.5);
    border-radius: 5px;

    .btn {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      background-color: #fff;
      border-radius: 50%;
    }

    .pass {
      width: 0;
      height: 3px;
      border-radius: 5px;
      background-color: var(--theme-color);
    }
  }

  .time {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 14px;
    .start {
      text-align: left;
    }
    .end {
      text-align: right;
    }
  }
`;
