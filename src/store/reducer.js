import { combineReducers } from "redux";

import recommendSlice from "@/pages/recommend/recommendSlice";
import artistSlice from "@/pages/artist/artistSlice";
import toplistSlice from "@/pages/toplist/toplistSlice";

const rootReducer = combineReducers({
  recommend: recommendSlice,
  artist: artistSlice,
  toplist: toplistSlice,
});

export default rootReducer;
