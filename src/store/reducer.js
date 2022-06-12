import { combineReducers } from "redux";

import recommendSlice from "@/pages/recommend/recommendSlice";
import artistSlice from "@/pages/artist/artistSlice";

const rootReducer = combineReducers({
  recommend: recommendSlice,
  artist: artistSlice,
});

export default rootReducer;
