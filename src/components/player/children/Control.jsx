import React from "react";
import styled from "styled-components";

function Control() {
  return (
    <StyleWrap>
      <div className="mode">
        <span className="iconfont">&#xe856;</span>
        {/* <span className="iconfont" >&#xe612;</span>
            <span className="iconfont" >&#xe6a1;</span> */}
      </div>
      <div className="prev">
        <span className="iconfont">&#xe603;</span>
      </div>

      <div className="play">
        <span className="iconfont">&#xe674;</span>
        {/* <span className="iconfont" >&#xea8d;</span> */}
      </div>

      <div className="next">
        <span className="iconfont">&#xe602;</span>
      </div>
      <div className="list">
        <span className="iconfont">&#xe614;</span>
      </div>
    </StyleWrap>
  );
}

export default Control;

const StyleWrap = styled.div`
  display: flex;
  position: absolute;
  bottom: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;

  .mode,
  .play,
  .prev,
  .next,
  .list {
    flex: 1;
    text-align: center;
  }

  .play {
    flex: 0 0 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 50%;
    background: hsla(0, 0%, 100%, 0.1);
    margin: 0 20px;
  }

  .iconfont {
    font-size: 25px;
  }
`;
