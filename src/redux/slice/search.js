import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/service";
import { keywordsHighlightHandle } from "@/utils";
import { localCache } from "@/utils/storage";

export const fetchHotKeywords = createAsyncThunk(
  "search/fetchSearchHotKeywords",
  async () => {
    const response = await api.fetchHotKeywords();
    return response.data;
  },
);

export const fetchSearchSuggest = createAsyncThunk(
  "search/fetchSearchSuggest",
  async keywords => {
    const response = await api.fetchSearchSuggest(keywords);
    console.log(response);
    return keywordsHighlightHandle(keywords, response.result.allMatch);
  },
);

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async keywords => {
    //todo 获取搜索结果
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    hotKeywords: [],
    searchRecords: [],
    searchSuggest: [],
  },
  reducers: {
    fetchSearchRecords: (state, action) => {
      const records = localCache.getItem("searchRecords");
      state.searchRecords = records || [];
    },
    addSearchRecords: (state, action) => {
      const keywords = action.payload;
      const filtered = state.searchRecords.filter(
        (item, index) => item !== keywords && index < 11,
      );
      const records = [keywords, ...filtered];
      state.searchRecords = records;
      localCache.setItem("searchRecords", records);
    },
    deleteSearchRecords: (state, action) => {
      const keywords = action.payload;
      const records = state.searchRecords.filter(
        (item, index) => item !== keywords && index < 11,
      );
      state.searchRecords = records;
      localCache.setItem("searchRecords", records);
    },
    clearSearchRecords: (state, action) => {
      state.searchRecords = [];
      localCache.removeItem("searchRecords");
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchHotKeywords.fulfilled, (state, action) => {
      state.hotKeywords = action.payload;
    });
    builder.addCase(fetchSearchSuggest.fulfilled, (state, action) => {
      state.searchSuggest = action.payload;
    });
  },
});

export const {
  fetchSearchRecords,
  addSearchRecords,
  deleteSearchRecords,
  clearSearchRecords,
} = searchSlice.actions;

export default searchSlice.reducer;
