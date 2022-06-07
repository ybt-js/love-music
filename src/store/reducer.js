import { combineReducers } from 'redux';

import RecommendSlice from '@/pages/recommend/recommendSlice';

const rootReducer = combineReducers({
  recommend: RecommendSlice,
});

export default rootReducer;
