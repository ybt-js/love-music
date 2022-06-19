import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeCurrentTime, changeDuration, changePlaying, } from './playerSlice'
import { FullScreenPlayer } from "./children";
import styled from "styled-components";

import { debounce, } from '@/utils'

function Player() {
  const audioRef = useRef()
  const { lyric, playlist, playMode, playing, fullScreen, currentSong, duration, } = useSelector(
    state => ({
      lyric: state.player.lyric,
      playlist: state.player.playlist,
      playMode: state.player.playMode,
      playing: state.player.playing,
      fullScreen: state.player.fullScreen,
      currentSong: state.player.currentSong,
      duration: state.player.duration,
    }),
  );

  const dispatch = useDispatch()
  useEffect(() => {
    if (!currentSong.url) return
    audioRef.current.src = currentSong.url
    playMusic()
  }, [currentSong])



  const playMusic = () => {
    audioRef.current
      .play()
      .then(() => {
        dispatch(changePlaying(true))
      })
      .catch(() => {
        dispatch(changePlaying(false))
      });
  };

  const lyricScroll = () => {

  }

  const handleTimeUpdate = useCallback((e) => {
    const { currentTime } = e.target
    dispatch(changeCurrentTime(currentTime))
    if (duration < 0) {
      dispatch(changeDuration(e.target.duration))
    }
    lyricScroll(currentTime)
  }, [])

  const handleEnded = (e) => {

  }

  const hide = {
    transform: 'translate3d(0,100%,0)',
    opacity: 0
    // display: "none"
  }
  const show = {
    transform: 'translate3d(0,0,0)',
    opacity: 1
    // display: 'block',
  }

  return (
    <StyleWrap>
      <FullScreenPlayer style={fullScreen ? show : hide} />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
    </StyleWrap>
  );
}

export default Player;

const StyleWrap = styled.div`




`
