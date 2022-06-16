import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/service";
import { keywordsHighlightHandle } from "@/utils";

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

const searchSlice = createSlice({
  name: "search",
  initialState: {
    hotKeywords: [],
    searchRecords: ["薛之谦", "陈奕迅", "飘向北方"],
    searchSuggest: [],
  },
  reducers: {
    changeSearchRecords: (state, action) => {
      //todo 修改历史记录
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

export const { changeSearchHistory } = searchSlice.actions;

export default searchSlice.reducer;
