import { useRef, useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlaying, changeFullScreen, changeCurrentTime } from '@/redux/slice'
import styled from "styled-components";
import { Progress, Scroll } from '@/components'
import { formatPlayTime, handleArtistName, throttle } from '@/utils'
const imgUrl =
  "http://p3.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg";

function FullScreenPlayer(props) {
  const { currTime, switchSong, switchPlayMode } = props
  const scrollRef = useRef()
  const lyricRef = useRef()
  const [currIdx, setCurrIdx] = useState(-1)
  const [touching, setTouching] = useState(false)
  const [showLyric, setShowLyric] = useState(false)
  const { playing, playMode, percent, duration, currentSong } = useSelector(state => state.player)

  const dispatch = useDispatch()
  useEffect(() => {
    scrollRef.current.refresh()
  }, [currentSong])

  useEffect(() => {
    const { lyric } = currentSong
    if (!lyric || touching || !showLyric) return
    let i = 0
    for (; i < lyric.length; i++) {
      if (currTime * 1000 < lyric[i].time) {
        i = i === 0 ? 0 : i - 1;
        break
      }
    }
    setCurrIdx(i)
    if (i > 5) {
      const ele = lyricRef.current.children[i - 5]
      scrollRef.current.scrollToElement(ele, 500)
    } else {
      scrollRef.current.scrollTo(0, 0, 500);
    }
  }, [currTime])

  const displayAlbumOrLyric = useMemo(() =>
    throttle(() => {
      setShowLyric((value) => !value)
    }, 1000)
    , [])

  const hidePlayer = () => {
    dispatch(changeFullScreen(false))
  }

  const changeProgress = (percent) => {
    const currentTime = percent * duration
    dispatch(changeCurrentTime(currentTime))
  }

  const PlayModeIcon = () => {
    if (playMode === 0) return <span className="iconfont order">&#xe856;</span>
    if (playMode === 1) return <span className="iconfont single" >&#xe612;</span>
    return <span className="iconfont random" >&#xe6a1;</span>
  }

  return (
    <StyleWrap {...props}>
      {/* 顶部歌名 */}
      <div className="player-top">
        <div className="back" onClick={hidePlayer}>
          <span className="iconfont">&#xe641;</span>
        </div>
        <h2 className="song-name text-nowrap">
          {currentSong.name}
        </h2>
        <p className="artist-name">{handleArtistName(currentSong.ar)}</p>
      </div>
      <div className="middle" onClick={displayAlbumOrLyric}>
        {/* 唱片 */}
        <div className={"album" + (showLyric ? ' hide' : "")}>
          <div className="cover">
            <img src={imgUrl} alt="" className="" />
          </div>
          <div className="cur-lyric">
            <p className="text">{"该配合你演出的我演视而不见"}</p>
          </div>
        </div>
        {/* 歌词 */}
        <div
          className={"lyric" + (showLyric ? '' : " hide")}
          onTouchStart={() => setTouching(true)}
          onTouchEnd={() => setTimeout(setTouching, 500, false)}>
          <Scroll ref={scrollRef}>
            <ul className="lyric-list" ref={lyricRef}>
              {currentSong.lyric?.map((item, index) => (
                <li className="lyric-item" key={index}>
                  <p className={"text " + (currIdx === index ? 'text-active' : '')}>{item.text}</p>
                </li>
              ))}
            </ul>
          </Scroll>
        </div>
      </div>

      <Progress percent={percent} onClick={changeProgress} onFinish={changeProgress} >
        <div className="time">
          <span className="start">{formatPlayTime(currTime)}</span>
          <span className="end">{formatPlayTime(duration)}</span>
        </div>
      </Progress>

      {/* 控制按钮 */}
      <div className="control">
        <div className="mode" onClick={switchPlayMode}>
          <PlayModeIcon />
        </div>
        <div className="prev" onClick={() => switchSong(-1)} >
          <span className="iconfont">&#xe603;</span>
        </div>
        <div className="play" onClick={() => dispatch(changePlaying(!playing))}>
          {
            playing ?
              (<span className="iconfont">&#xe674;</span>) :
              (<span className="iconfont" >&#xea8d;</span>)
          }
        </div>
        <div className="next" onClick={() => { switchSong(1) }}>
          <span className="iconfont">&#xe602;</span>
        </div>
        <div className="list">
          <span className="iconfont">&#xe614;</span>
        </div>
      </div>
      {/* 模糊背景 */}
      <div className="player-bg">
        <img src={imgUrl} alt="" />
      </div>
    </StyleWrap>
  );
}

export default FullScreenPlayer;

const StyleWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  color: #ffffff;
  background-color: #222;
  transition: all 0.3s;

  .player-top{
    color: #ffffff;

    .back {
      position: absolute;
      width: 50px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      top: 0;

      .iconfont {
        font-size: 20px;
      }
    }

    .song-name {
      height: 40px;
      padding: 0 50px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
    }

    .artist-name {
      text-align: center;
      font-size: 14px;
      color: #eee;
    }
  }

  .middle{
    position: absolute;
    width: 100%;
    top: 80px;
    bottom: 180px;
  }

  .hide{
    display: none;
  }

  .album{
    width: 80%;
    padding: 10%;
    overflow: hidden;

    img {
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid hsla(0, 0%, 100%, 0.1);
    }

    .playing {
      animation: rotate 15s linear infinite;
    }

    .cur-lyric {
      margin-top: 30px;
      text-align: center;
    }

    .text {
      padding: 10px 0;
      line-height: 20px;
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.5);
    }
  }

  .lyric{
    width: 100%;
    white-space: nowrap;

    .lyric-list {
      width: 80%;
      padding: 0 10%;
      text-align: center;
    }

    .lyric-item {
      padding: 8px 0;
      line-height: 20px;
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.5);

      .text {
        color: hsla(0, 0%, 100%, 0.5);
        font-size: 14px;
        white-space: pre-wrap;
        transition: all 0.5s;
      }

      .text-active {
        color: #fff;
        font-size: 16px;
      }
    }
  }

  .time {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 14px;
    .start {
      text-align: left;
    }
    .end {
      text-align: right;
    }
  }

  .control{
    display: flex;
    position: absolute;
    bottom: 40px;
    width: 100%;
    justify-content: center;
    align-items: center;

    .mode,
    .play,
    .prev,
    .next,
    .list {
      flex: 1;
      text-align: center;
    }

    .play {
      flex: 0 0 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      background: hsla(0, 0%, 100%, 0.1);
      margin: 0 20px;
    }

    .iconfont {
      font-size: 25px;
    }
  }

  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);

    img {
      height: 100vh;
    }
  }
`;
