import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { fetchHotKeywords } from "./searchSlice";

import { SearchBox, SearchHot, SearchHistory, SearchSuggest } from "./children";

function Search() {
  const { hotKeywords, searchRecords } = useSelector(state => ({
    hotKeywords: state.search.hotKeywords,
    searchRecords: state.search.searchRecords,
  }));

  console.log(hotKeywords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotKeywords());
  }, []);

  return (
    <Wrap>
      <SearchBox
        defaultKeyword={"薛之谦"}
        onChange={() => {
          console.log("change");
        }}
        onSearch={() => {
          console.log("搜索");
        }}
      />
      <div className="main">
        {searchRecords.length !== 0 && (
          <SearchHistory records={searchRecords} />
        )}
        <SearchHot hotKeywords={hotKeywords} />
        <SearchSuggest />
      </div>
    </Wrap>
  );
}

export default Search;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  background: url(${require("@/assets/img/bg.jpg")});
  background-size: 100% 100%;
  overflow: hidden;

  .main {
    padding: 0 5%;
    overflow: auto;
  }
`;
