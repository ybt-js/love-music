import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/service";

export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async id => {
    const { playlist } = await api.fetchPlaylist(id);

    return {
      name: playlist.name,
      description: playlist.description,
      data: playlist.tracks,
      cover: playlist.coverImgUrl,
    };
  },
);

export const fetchArtistHotSong = createAsyncThunk(
  "playlist/fetchArtistHotSong",
  async id => {
    const [
      {
        data: { artist },
      },
      { songs },
    ] = await Promise.all([
      api.fetchArtistDetail(id),
      api.fetchArtistHotSong(id),
    ]);
    console.log(artist);
    return {
      name: artist.name,
      description: artist.briefDesc,
      data: songs,
      cover: artist.cover,
    };
  },
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload;
    });
    builder.addCase(fetchArtistHotSong.fulfilled, (state, action) => {
      state.playlist = action.payload;
    });
  },
});

export default playlistSlice.reducer;
