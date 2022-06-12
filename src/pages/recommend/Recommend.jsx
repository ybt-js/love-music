import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHotSong, fetchNewSong, fetchSongList } from "./recommendSlice";

import { debounce } from "@/utils";
import { Scroll, PullDownLoading } from "@/common";
import Songs from "./children/Songs";

const promise = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 800);
  });
};

const DISPLAY_COUNT = 6;
const MAX_LIMIT = 99;

function Recommend() {
  const bsRef = useRef();
  const [hotNum, setHotNum] = useState(0);
  const [newNum, setNewNum] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [succeed, setSucceed] = useState(false);
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
    setLoading(true);
    if (songList.length === MAX_LIMIT) return;
    let limit = Math.min(MAX_LIMIT, songList.length + 33);
    dispatch(fetchSongList(limit));
    finishPullUp();
    setLoading(false);
  };

  // eslint-disable-next-line
  const changeFetching = useCallback(() => {
    setFetching(false);
  }, [setFetching]);

  const refreshData = async finishPullDown => {
    setFetching(true);
    await promise();
    setHotNum(num => {
      let value = num + DISPLAY_COUNT;
      if (num + DISPLAY_COUNT > hotSong.length) {
        value = 0;
      }
      return value;
    });
    setNewNum(num => {
      let value = num + DISPLAY_COUNT;
      if (num + DISPLAY_COUNT > newNum.length) {
        value = 0;
      }
      return value;
    });
    setFetching(false);
    setSucceed(true);
    // 保证二次下拉显示的是动画
    finishPullDown(() => {
      setSucceed(false);
    });
  };

  const handleImgLoaded = useMemo(() => {
    return debounce(() => {
      bsRef.current.refresh();
    }, 300);
  }, []);

  return (
    <Scroll
      ref={bsRef}
      probeType={3}
      pullUp={loadMoreData}
      pullDown={refreshData}
      pullUpLoad
      pullDownRefresh
    >
      <PullDownLoading loading={fetching} succeed={succeed} />
      <Songs
        title="热歌推荐"
        playlist={hotSong.slice(hotNum, hotNum + DISPLAY_COUNT)}
      />
      <Songs
        title="新歌推荐"
        playlist={newSong.slice(newNum, newNum + DISPLAY_COUNT)}
      />
      <Songs
        title="精选歌单"
        playlist={songList}
        showMore={false}
        data={songList}
        onImgLoaded={handleImgLoaded}
      />
      {isLoading && (
        <p style={{ textAlign: "center", height: 30, lineHeight: "30px" }}>
          {songList.length === 99 ? "已经到底啦 ~\\(≧▽≦)/~" : "正在加载....."}
        </p>
      )}
    </Scroll>
  );
}

export default Recommend;
