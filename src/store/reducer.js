import { combineReducers } from "redux";

import recommendSlice from "@/pages/recommend/recommendSlice";
import artistSlice from "@/pages/artist/artistSlice";
import toplistSlice from "@/pages/toplist/toplistSlice";
import searchSlice from "@/pages/search/searchSlice";

const rootReducer = combineReducers({
  recommend: recommendSlice,
  artist: artistSlice,
  toplist: toplistSlice,
  search: searchSlice,
});

export default rootReducer;
