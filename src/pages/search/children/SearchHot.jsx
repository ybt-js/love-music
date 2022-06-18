import React from "react";
import styled from "styled-components";

function SearchHot(props) {
  const { hotKeywords, triggerSearch } = props;
  return (
    <StyleWrap>
      <h2 className="title">热门搜索</h2>
      <div className="hot-keywords">
        {hotKeywords?.map((info, index) => (
          <div
            className="keywords-info"
            key={index}
            onClick={() => triggerSearch(info.searchWord)}
          >
            <span className="order">{index + 1}</span>
            <span className="text text-nowrap">{info.searchWord}</span>
            {info.iconUrl && (
              <div
                className="icon"
                style={{ background: `url(${info.iconUrl})` }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </StyleWrap>
  );
}

export default SearchHot;

const StyleWrap = styled.div`
  .title {
    font-size: 16px;
    padding: 6px 0;
  }

  .hot-keywords {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    border-radius: 6px;
    background: rgba(59, 67, 76, 0.6);

    .keywords-info {
      display: flex;
      align-items: center;
      flex: 0 0 45vw;
      max-width: 45vw;
      padding: 6px 5px 6px 15px;
      box-sizing: border-box;

      .order {
        padding-right: 10px;
      }

      .text {
        color: #fff;
      }

      .icon {
        display: inline-block;
        width: 28px;
        min-height: 20px;
        margin-left: 5px;
        background-repeat: no-repeat !important;
        background-size: auto 14px !important;
        background-position: center !important;
      }
    }
  }
`;
