import { combineReducers } from "redux";

import recommendSlice from "@/pages/recommend/recommendSlice";
import artistSlice from "@/pages/artist/artistSlice";
import toplistSlice from "@/pages/toplist/toplistSlice";
import searchSlice from "@/pages/search/searchSlice";
import playlistSlice from "@/pages/playlist/playlistSlice";
import playerSlice from "@/components/player/playerSlice";

const rootReducer = combineReducers({
  recommend: recommendSlice,
  artist: artistSlice,
  toplist: toplistSlice,
  search: searchSlice,
  playlist: playlistSlice,
  player: playerSlice,
});

export default rootReducer;
