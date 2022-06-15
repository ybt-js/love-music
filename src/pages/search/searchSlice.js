import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/service";

export const fetchHotKeywords = createAsyncThunk(
  "search/fetchSearchHotKeywords",
  async () => {
    const response = await api.fetchHotKeywords();
    return response.data;
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    hotKeywords: [],
    searchRecords: ["薛之谦", "陈奕迅", "飘向北方"],
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
  },
});

export const { changeSearchHistory } = searchSlice.actions;

export default searchSlice.reducer;
