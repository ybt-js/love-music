import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchHotSong,
  fetchNewSong,
  fetchSongList,
  changeSongList,
} from "./recommendSlice";

import api from "@/service/api";

import Scroll from "common/Scroll";
import Songs from "./children/Songs";
import { debounce } from "@/utils";

function Recommend() {
  const bsRef = useRef();
  const { hotSong, newSong, songList } = useSelector(state => ({
    hotSong: state.recommend.hotSong,
    newSong: state.recommend.newSong,
    songList: state.recommend.songList,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotSong());
    dispatch(fetchNewSong());
    dispatch(fetchSongList(33));
  }, [dispatch]);

  const loadMoreData = async finishPullUp => {
    console.log("startPullUp");
    if (songList.length === 99) return;
    let limit = Math.min(99, songList.length + 33);
    dispatch(fetchSongList(limit));
    finishPullUp();
  };

  const refreshData = finishPullDown => {
    console.log("startPullDown");

    finishPullDown();
  };

  return (
    <Scroll
      ref={bsRef}
      pullUpLoad
      PullDownRefresh
      probeType={3}
      pullUp={loadMoreData}
      pullDown={refreshData}
    >
      <Songs title="热歌推荐" playlist={hotSong} />
      <Songs title="新歌推荐" playlist={newSong} />
      <Songs
        title="精选歌单"
        playlist={songList}
        showMore={false}
        count={songList.length}
        data={songList}
      />
    </Scroll>
  );
}

export default Recommend;
