import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/service/api";

export const fetchHotSong = createAsyncThunk(
  "recommend/fetchHotSong",
  async () => {
    const response = await api.fetchHotSong();
    return response.playlist.tracks;
  }
);

export const fetchNewSong = createAsyncThunk(
  "recommend/fetchNewSong",
  async () => {
    const response = await api.fetchNewSong();
    return response.playlist.tracks;
  }
);

export const fetchSongList = createAsyncThunk(
  "recommend/fetchSongList",
  async (limit) => {
    const response = await api.fetchRecommendPlaylist(limit);
    return response.result;
  }
);

export const fetchMoreSongList = createAsyncThunk(
  "recommend/fetchMoreSongList",
  async (limit) => {}
);

export const recommendSlice = createSlice({
  name: "recommend",
  initialState: {
    hotSong: [],
    newSong: [],
    songList: [],
  },
  reducers: {
    changeSongList(state, action) {
      state.songList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotSong.fulfilled, (state, action) => {
      state.hotSong = action.payload;
    });
    builder.addCase(fetchNewSong.fulfilled, (state, action) => {
      state.newSong = action.payload;
    });
    builder.addCase(fetchSongList.fulfilled, (state, action) => {
      state.songList = action.payload;
    });
  },
});

export const { changeSongList } = recommendSlice.actions;

export default recommendSlice.reducer;
