import React from 'react';
import Scroll from 'common/Scroll';
// import api from '../../service/api';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchHotSong,
  fetchNewSong,
} from './recommendSlice';

import Songs from './children/Songs';

function Recommend() {
  const { hotSong, newSong } = useSelector(state => ({
    hotSong: state.recommend.hotSong,
    newSong: state.recommend.newSong,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchHotSong());
    dispatch(fetchNewSong());
  }, [dispatch]);

  return (
    <div>
      <Scroll>
        <Songs title="热歌推荐" playlist={hotSong} />
        <Songs title="新歌推荐" playlist={newSong} />
      </Scroll>
    </div>
  );
}

export default Recommend;
