import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    fullScreen: false,
    miniPlayer: true,
    playing: false,
    playlist: [],
    playMode: 0,
    currentIndex: -1,
    currentSong: {},
    recentPlaylist: [],
  },
  reducers: {
    changeFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    changeMiniPlayer: (state, action) => {
      state.miniPlayer = action.payload;
    },
    changeMiniPlayer: (state, action) => {
      state.playing = action.payload;
    },
    changePlaylist: (state, action) => {
      state.playlist = action.payload;
    },
  },
});
