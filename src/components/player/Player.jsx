import { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePercent, changeDuration, changePlaying, switchSongAction, changePlayMode } from '@/redux/slice'
import { FullScreenPlayer, MiniPlayer } from "./children";
import styled from "styled-components";


function Player() {
  const audioRef = useRef()
  const [currTime, setCurrTime] = useState(0)
  const { fullScreen, currentSong, currentTime, duration, playing, playMode } = useSelector(
    state => (state.player)
  );

  const dispatch = useDispatch()

  const playMusic = useCallback(async () => {
    try {
      await audioRef.current.play()
      const totalTime = audioRef.current.duration
      if (duration !== totalTime) {
        dispatch(changeDuration(totalTime))
      }
      dispatch(changePlaying(true))
    } catch (err) {
      dispatch(changePlaying(false))
    }
  }, [dispatch, duration])

  useEffect(() => {
    if (!audioRef.current.src) return
    audioRef.current.currentTime = currentTime
    if (!playing) playMusic()
  }, [currentTime, playMusic])

  useEffect(() => {
    if (!currentSong.url) return
    audioRef.current.src = currentSong.url
    playMusic()
  }, [currentSong, playMusic])

  useEffect(() => {
    if (!audioRef.current.src) return
    if (playing) {
      playMusic()
    } else {
      audioRef.current.pause()
    }
  }, [playing, playMusic])

  const switchSong = (index) => {
    if (!audioRef.current.src) return
    dispatch(switchSongAction(index))
  }
  const switchPlayMode = () => {
    const mode = (playMode + 1) % 3
    dispatch(changePlayMode(mode))
  }

  const handleTimeUpdate = useCallback((e) => {
    const { currentTime, duration } = e.target
    dispatch(changePercent(currentTime / duration))
    setCurrTime(currentTime)
  }, [dispatch])


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
      {
        true
          ? <FullScreenPlayer
            style={fullScreen ? show : hide}
            currTime={currTime}
            switchSong={switchSong}
            switchPlayMode={switchPlayMode} />
          : <MiniPlayer switchSong={switchSong} />
      }
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => switchSong()} />
    </StyleWrap>
  );
}

export default Player;

const StyleWrap = styled.div`




`
