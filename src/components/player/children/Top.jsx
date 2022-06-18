import React from "react";
import styled from "styled-components";

function Top() {
  return (
    <StyleWrap>
      <div className="back">
        <span className="iconfont">&#xe641;</span>
      </div>
      <h2 className="song-name text-nowrap" onClick={() => console.log(1)}>
        演员
      </h2>
      <p className="artist-name">薛之谦</p>
    </StyleWrap>
  );
}

export default Top;

const StyleWrap = styled.div`
  color: #ffffff;

  .back {
    position: absolute;
    width: 50px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    top: 0;

    .iconfont {
      font-size: 20px;
    }
  }

  .song-name {
    height: 40px;
    padding: 0 50px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
  }

  .artist-name {
    text-align: center;
    font-size: 14px;
    color: hsla(0, 0%, 100%, 0.5);
  }
`;
