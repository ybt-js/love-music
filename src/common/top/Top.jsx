import React from "react";
import styled from "styled-components";

function Top() {
  return (
    <Header>
      <div className="content">
        <div className="top-title">
          <h1>Love Music</h1>
        </div>
        <div className="search">
          <span className="iconfont">&#xe6a0;</span>
        </div>
      </div>
    </Header>
  );
}

export default Top;

const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 44px;
  line-height: 44px;
  text-align: center;
  // background: var(--main-bg-color);
  z-index: 10;
  .content {
    height: 100%;
    .top-title {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .img-box {
        width: 25px;
      }
      h1 {
        font-size: 16px;
        color: var(--theme-color);
      }
    }
    .search {
      position: absolute;
      top: 0;
      right: 0;
      height: 44px;
      width: 40px;
      .iconfont {
        color: #fff;
        font-size: 22px;
      }
    }
  }
`;
