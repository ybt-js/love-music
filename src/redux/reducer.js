import { combineReducers } from "redux";

import recommendSlice from "./slice/recommend";
import artistSlice from "./slice/artist";
import toplistSlice from "./slice/toplist";
import searchSlice from "./slice/search";
import playlistSlice from "./slice/playlist";
import playerSlice from "./slice/player";

const rootReducer = combineReducers({
  recommend: recommendSlice,
  artist: artistSlice,
  toplist: toplistSlice,
  search: searchSlice,
  playlist: playlistSlice,
  player: playerSlice,
});

export default rootReducer;
