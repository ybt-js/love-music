import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/service";

export const fetchSongUrl = createAsyncThunk(
  "player/fetchSongUrl",
  async id => {
    const response = await api.fetchSongUrl(id);
    return response.data[0];
  },
);

export const fetchLyric = createAsyncThunk("player/fetchLyric", async id => {
  const response = await api.fetchLyric(id);
  console.log(response);
});

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    fullScreen: false,
    miniPlayer: true,
    playing: false,
    playlist: [],
    playMode: 0,
    currentIndex: -1,
    currentSong: {},
    recentPlaylist: [],
    lyric: [],
    currentTime: 0,
    duration: -1,
  },
  reducers: {
    changeFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    changeMiniPlayer: (state, action) => {
      state.miniPlayer = action.payload;
    },
    changePlaying: (state, action) => {
      state.playing = action.payload;
    },
    changePlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    changeCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    changeDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSongUrl.fulfilled, (state, action) => {
      state.currentSong = action.payload;
    });
    builder.addCase(fetchLyric.fulfilled, (state, action) => {
      state.lyric = action.payload;
    });
  },
});

export const {
  changePlaying,
  changeFullScreen,
  changeMiniPlayer,
  changePlaylist,
  changeCurrentTime,
  changeDuration,
} = playerSlice.actions;

export default playerSlice.reducer;
