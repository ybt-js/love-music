import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlaying } from './playerSlice'
import { FullScreenPlayer } from "./children";



function Player() {
  const audioRef = useRef()
  const { lyric, playlist, playMode, playing, fullScreen, currentSong } = useSelector(
    state => ({
      lyric: state.player.lyric,
      playlist: state.player.playlist,
      playMode: state.player.playMode,
      playing: state.player.playing,
      fullScreen: state.player.fullScreen,
      currentSong: state.player.currentSong,
    }),
  );

  const dispatch = useDispatch()
  useEffect(() => {
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


  return (
    <>
      {fullScreen && <FullScreenPlayer />}
      <audio ref={audioRef} />
    </>
  );
}

export default Player;


