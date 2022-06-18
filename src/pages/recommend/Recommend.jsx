import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHotSong, fetchNewSong, fetchSongList } from "./recommendSlice";
import { fetchSongUrl } from '@/components/player/playerSlice'

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotSong());
    dispatch(fetchNewSong());
    dispatch(fetchSongList(33));
  }, [dispatch]);

  const hotSongSlice = useMemo(
    () => hotSong.tracks?.slice(hotNum, hotNum + DISPLAY_COUNT),
    [hotSong, hotNum],
  );
  const newSongSlice = useMemo(
    () => newSong.tracks?.slice(newNum, newNum + DISPLAY_COUNT),
    [newSong, newNum],
  );
  const handleImgLoaded = useMemo(
    () => debounce(() => bsRef.current?.refresh(), 300),
    [],
  );

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
      if (num + DISPLAY_COUNT > hotSong.tracks.length) {
        value = 0;
      }
      return value;
    });
    setNewNum(num => {
      let value = num + DISPLAY_COUNT;
      if (num + DISPLAY_COUNT > newSong.tracks.length) {
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

  const playMusic = song => {
    // todo 播放音乐
    dispatch(fetchSongUrl(song.id))
  };

  const jumpToPlaylist = song => {
    navigate(`/playlist/${song.id}`, {
      state: {
        type: "song",
        cover: song.picUrl || song.coverImgUrl,
      },
    });
  };

  return (
    <Scroll
      ref={bsRef}
      probeType={3}
      onPullUp={loadMoreData}
      onPullDown={refreshData}
      pullUpLoad
      pullDownRefresh
      style={{ padding: "0 5%" }}
    >
      <PullDownLoading loading={fetching} succeed={succeed} />
      <Songs
        title="热歌推荐"
        playlist={hotSongSlice}
        clickSong={playMusic}
        clickMore={() => jumpToPlaylist(hotSong)}
      />
      <Songs
        title="新歌推荐"
        playlist={newSongSlice}
        clickSong={playMusic}
        clickMore={() => jumpToPlaylist(newSong)}
      />
      <Songs
        title="精选歌单"
        playlist={songList}
        showMore={false}
        data={songList}
        onImgLoaded={handleImgLoaded}
        clickSong={jumpToPlaylist}
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
