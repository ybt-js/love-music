import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { dispatch, getState } from "../store";
import api from "@/service";
import handleLyric from "@/utils/handleLyric";
import { localCache } from "@/utils/storage";

const getDefaultSongUrl = id =>
  `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

const changeCurrentSongAction = createAction("player/changeCurrentSong");

export const changeRecentPlaylistAction = createAction(
  "player/changeRecentPlaylist",
  song => {
    let recentPlaylist = localCache.getItem("recentPlaylist");
    if (recentPlaylist) {
      // 新添加的音乐排在最前面,不超过100首
      const filtered = recentPlaylist
        .filter(item => item.id !== song.id)
        .filter((_, index) => index < 99);
      filtered.unshift(song);
      localCache.setItem("recentPlaylist", filtered);
      return { payload: filtered };
    } else {
      localCache.setItem("recentPlaylist", [song]);
    }
  },
);

export const changeCurrentIndex = createAsyncThunk(
  "player/changeCurrentIndex",
  async index => {
    const { playlist } = getState().player;
    if (index > playlist.length - 1) {
      index = 0;
    }
    if (index < 0) {
      index = playlist.length - 1;
    }

    const song = Object.assign({}, playlist[index]);
    //获取音乐url和歌词,并添加到currentSong
    try {
      const [urlRes, lyricRes] = await Promise.all([
        api.fetchSongUrl(song.id),
        api.fetchLyric(song.id),
      ]);
      if (!song.url) {
        song.url = urlRes.data[0].url || getDefaultSongUrl(song.id);
        song.lyric = handleLyric(lyricRes.lrc.lyric);
      }
      dispatch(changeCurrentSongAction(song));
      dispatch(changeRecentPlaylistAction(song));
    } catch (err) {
      console.log(err);
    }
    return index;
  },
);

export const switchSongAction = createAction(
  "player/switchSongAction",
  index => {
    const { playlist, playMode, currentIndex } = getState().player;
    if (index) {
      dispatch(changeCurrentIndex(currentIndex + index));
    } else {
      if (playMode === 0) {
        dispatch(changeCurrentIndex(currentIndex + 1));
      } else if (playMode === 1) {
        dispatch(changeCurrentTime(0));
      } else {
        const playlistLen = playlist.length;
        if (playlistLen === 1) {
          dispatch(changeCurrentTime(0));
          return;
        }
        let random;
        do {
          random = Math.floor(Math.random() * playlistLen);
        } while (random === changeCurrentIndex);
        dispatch(changeCurrentIndex(random));
      }
    }
    return { payload: null };
  },
);

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
    duration: 0,
    percent: 0,
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
    changePlayMode: (state, action) => {
      state.playMode = action.payload;
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
    changePercent: (state, action) => {
      state.percent = action.payload;
    },
    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(changeCurrentIndex.fulfilled, (state, action) => {
      state.currentIndex = action.payload;
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
  changePercent,
  changePlayMode,
} = playerSlice.actions;

export default playerSlice.reducer;
