import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/service";

export const fetchToplist = createAsyncThunk(
  "toplist/fetchToplist",
  async () => {
    const response = await api.fetchTopList();
    return response.list;
  },
);

const toplistSlice = createSlice({
  name: "toplist",
  initialState: {
    toplist: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchToplist.fulfilled, (state, action) => {
      state.toplist = action.payload;
    });
  },
});

export default toplistSlice.reducer;
