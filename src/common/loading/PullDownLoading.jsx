import React from "react";
import styled from "styled-components";

function PullDownLoading(props) {
  const list = Array(5).fill(1);
  const animateEle = (
    <div className="animate">
      {list.map((_, index) => (
        <div
          className={"bar" + (props.loading ? " loading" : "")}
          key={index}
        ></div>
      ))}
    </div>
  );
  const messageEle = <div className="message">数据已刷新</div>;

  return (
    <Wrap>
      <div className="content">{props.succeed ? messageEle : animateEle}</div>
    </Wrap>
  );
}

export default PullDownLoading;

const Wrap = styled.div`
  @keyframes bar-1 {
    0% {
      transform: scale(1, 0.6);
    }
    25% {
      transform: scale(1, 0.4);
    }
    50% {
      transform: scale(1, 0.2);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 0.6);
    }
  }

  @keyframes bar-2 {
    0% {
      transform: scale(1, 0.8);
    }
    25% {
      transform: scale(1, 0.6);
    }
    50% {
      transform: scale(1, 0.4);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 0.8);
    }
  }

  @keyframes bar-3 {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 0.8);
    }
    50% {
      transform: scale(1, 0.2);
    }
    75% {
      transform: scale(1, 0.8);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes bar-4 {
    0% {
      transform: scale(1, 0.8);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 0.4);
    }
    75% {
      transform: scale(1, 0.6);
    }
    100% {
      transform: scale(1, 0.8);
    }
  }

  @keyframes bar-5 {
    0% {
      transform: scale(1, 0.6);
    }
    25% {
      transform: scale(1, 0.8);
    }
    50% {
      transform: scale(1, 1);
    }
    75% {
      transform: scale(1, 0.4);
    }
    100% {
      transform: scale(1, 0.6);
    }
  }

  position: absolute;
  width: 100%;
  transform: translate3d(0, -100%, 0);
  text-align: center;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .bar {
      display: inline-block;
      width: 3px;
      height: 20px;
      background: #fff;
      border-radius: 5px;
      margin: 0 1.5px;
      color: #fff;

      &:nth-child(1),
      &:nth-child(5) {
        transform: scale(1, 0.6);
      }

      &:nth-child(2),
      &:nth-child(4) {
        transform: scale(1, 0.8);
      }
    }
    .loading {
      &:nth-child(1) {
        animation: bar-1 0.8s linear infinite;
        transform: scale(1, 0.6);
      }

      &:nth-child(2) {
        animation: bar-2 0.8s linear infinite;
        transform: scale(1, 0.8);
      }

      &:nth-child(3) {
        animation: bar-3 0.8s linear infinite;
      }

      &:nth-child(4) {
        animation: bar-4 0.8s linear infinite;
        transform: scale(1, 0.8);
      }

      &:nth-child(5) {
        animation: bar-5 0.8s linear infinite;
        transform: scale(1, 0.6);
      }
    }
  }
`;
