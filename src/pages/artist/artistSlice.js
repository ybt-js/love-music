import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/service";
import { promiseSequence } from "@/utils";
import { localCache } from "@/utils/storage";

export const fetchArtistList = createAsyncThunk(
  "artist/fetchArtist",
  async params => {
    const artistList = localCache.getItem("artist");
    if (artistList) return artistList;
    const response = await promiseSequence(params, api.fetchArtistList);
    localCache.setItem("artist", response);
    return response;
  },
);

const artistSlice = createSlice({
  name: "artist",
  initialState: {
    artistList: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArtistList.fulfilled, (state, action) => {
      state.artistList = action.payload;
    });
  },
});

export default artistSlice.reducer;
