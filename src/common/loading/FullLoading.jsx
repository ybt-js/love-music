import React from "react";
import styled from "styled-components";
function FullLoading() {
  return (
    <Wrap>
      <div className="content">
        <div className="load">
          {[1, 2, 3].map((item, index) => (
            <div className="bar" key={index}></div>
          ))}
        </div>
        <div className="text">
          <h3>正在加载...</h3>
        </div>
      </div>
    </Wrap>
  );
}

export default FullLoading;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  .content {
    width: 100%;
    margin: 20% auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .bar {
      display: inline-block;
      width: 3px;
      height: 20px;
      background: #fff;
      border-radius: 5px;
      margin: 0 2px;
      color: #fff;

      &:nth-child(1) {
        animation: loading-1 0.8s linear infinite;
      }

      &:nth-child(2) {
        animation: loading-2 0.8s linear infinite;
      }

      &:nth-child(3) {
        animation: loading-1 0.8s linear infinite;
      }
    }

    .text {
      padding-left: 5px;

      h3 {
        color: #fff;
      }
    }
  }
`;
