import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '@/service/api';

export const fetchHotSong = createAsyncThunk(
  'recommend/fetchHotSong',
  async () => {
    const response = await api.fetchHotSong();
    return response.playlist.tracks;
  },
);

export const fetchNewSong = createAsyncThunk(
  'recommend/fetchNewSong',
  async () => {
    const response = await api.fetchNewSong();
    return response.playlist.tracks;
  },
);

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState: {
    hotSong: [],
    newSong: [],
    songList: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchHotSong.fulfilled, (state, action) => {
      state.hotSong = action.payload;
    });
    builder.addCase(fetchNewSong.fulfilled, (state, action) => {
      state.newSong = action.payload;
    });
  },
});

export default recommendSlice.reducer;
