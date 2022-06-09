import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchHotSong,
  fetchNewSong,
  fetchSongList,
  changeSongList,
} from "./recommendSlice";

import api from "@/service/api";
import { debounce } from '@/utils'
import Scroll from "common/Scroll";
import Songs from "./children/Songs";
import PullDownLoading from "common/PullDownLoading";

const promise = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 800)
  })
}

function Recommend() {
  const bsRef = useRef();
  const [isLoading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
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
    setLoading(true)
    if (songList.length === 99) return;
    let limit = Math.min(99, songList.length + 33);
    // dispatch(fetchSongList(limit));
    const response = await api.fetchRecommendPlaylist(limit)
    dispatch(changeSongList(response.result))
    finishPullUp();
    setLoading(false)
  };

  const succeed = useCallback(() => {
    setFetching(false)
  }, [setFetching])

  const refreshData = async (finishPullDown) => {
    console.log("startPullDown");
    setFetching(true)
    //todo 刷新歌单
    await promise()
    finishPullDown(succeed);
  };

  const handleLoaded = useMemo(() => {
    return debounce(() => {
      bsRef.current.refresh()
    }, 300)
  }, [])

  return (
    <Scroll
      ref={bsRef}
      probeType={3}
      pullUp={loadMoreData}
      pullDown={refreshData}
      pullUpLoad
      pullDownRefresh
    >
      <PullDownLoading loading={fetching} />
      <Songs title="热歌推荐" playlist={hotSong} />
      <Songs title="新歌推荐" playlist={newSong} />
      <Songs
        title="精选歌单"
        playlist={songList}
        showMore={false}
        count={songList.length}
        data={songList}
        onLoaded={handleLoaded}
      />
      {
        isLoading && <p style={{ textAlign: "center", height: 30, lineHeight: '30px' }}>{
          songList.length === 99 ? '已经到底啦 ~\\(≧▽≦)/~' : '正在加载.....'
        }</p>
      }
    </Scroll>
  );
}

export default Recommend;
