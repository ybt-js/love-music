import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

function SearchBox(props) {
  const { defaultKeyword = "", onChange, onSearch } = props;
  const navigate = useNavigate();
  return (
    <Wrap>
      <div
        className="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        <span className="iconfont">&#xe60a;</span>
      </div>
      <div className="search">
        <span className="iconfont">&#xe6a0;</span>
        <input
          type="text"
          className="input"
          placeholder={defaultKeyword}
          onChange={onChange}
        />
      </div>
      <div className="title" onClick={onSearch}>
        <h3>搜索</h3>
      </div>
    </Wrap>
  );
}

export default SearchBox;

const Wrap = styled.div`
  display: flex;
  height: 44px;
  justify-content: space-between;
  align-items: center;

  .back,
  .title {
    flex: 0 0 50px;
    padding: 10px 0;
    text-align: center;
  }

  .search {
    flex: 1;
    height: 35px;
    background: rgba(83, 87, 96, 0.6);
    display: flex;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    color: #fff;

    .input {
      width: 80%;
      height: 100%;
      background: transparent;
      color: #fff;
      caret-color: #cf3b3a;
    }

    .iconfont {
      text-align: center;
      flex: 0 0 30px;
    }
  }
`;
