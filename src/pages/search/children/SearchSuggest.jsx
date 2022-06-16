import React from "react";
import styled from "styled-components";

function SearchSuggest(props) {
  const { suggests } = props;
  //todo 搜索建议为空时添加提示
  return (
    <Wrap>
      <ul>
        {suggests?.map(item => (
          <li className="suggest-item" key={item.keyword}>
            <span className="iconfont">&#xe6a0;</span>
            <p className="match">
              <span className="start">{item.start}</span>
              <span className="highlight">{item.highlight}</span>
              <span className="last">{item.last}</span>
            </p>
          </li>
        ))}
      </ul>
    </Wrap>
  );
}

export default SearchSuggest;

const Wrap = styled.div`
  padding-top: 20px;

  .suggest-item {
    padding: 10px 0;
    font-size: 14px;
    display: flex;

    .iconfont {
      padding-right: 10px;
    }

    .highlight {
      color: var(--theme-color);
    }
  }
`;
