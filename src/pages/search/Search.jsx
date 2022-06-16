import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { fetchHotKeywords, fetchSearchSuggest } from "./searchSlice";

import { SearchBox, SearchHot, SearchHistory, SearchSuggest } from "./children";
import { debounce } from "@/utils";

function Search() {
  const [keywords, setKeywords] = useState("");
  const { hotKeywords, searchRecords, searchSuggest } = useSelector(state => ({
    hotKeywords: state.search.hotKeywords,
    searchRecords: state.search.searchRecords,
    searchSuggest: state.search.searchSuggest,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotKeywords());
  }, [dispatch]);

  const debounceDispatch = debounce(dispatch, 300);
  const handleChange = useCallback(value => {
    setKeywords(value);
    if (value === "" || !value.trim()) return;
    debounceDispatch(fetchSearchSuggest(value));
    // eslint-disable-next-line
  }, []);

  const handleSearch = value => {
    console.log(value);
  };

  const showRecords = searchRecords.length !== 0;
  const showSuggest = keywords.trim();

  return (
    <Wrap>
      <SearchBox
        keywords={keywords}
        defaultKeyword={"薛之谦"}
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <div className="main">
        {showSuggest ? (
          <SearchSuggest suggests={searchSuggest} />
        ) : (
          <>
            {showRecords && <SearchHistory records={searchRecords} />}
            <SearchHot hotKeywords={hotKeywords} />
          </>
        )}
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
