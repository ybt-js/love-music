import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { CircleProgress } from '@/components'
import { changeFullScreen } from '../playerSlice'

const imgUrl =
  "http://p3.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg";
function NavPlayer() {
  const { currentTime, duration, playing } = useSelector(state => ({
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    playing: state.player.playing
  }))
  const percent = currentTime / duration
  const dispatch = useDispatch()
  return (
    <StyleWrap onClick={() => dispatch(changeFullScreen(true))}>
      <div className="player-box">
        <div className="cover" >
          <img src={imgUrl} alt="" className={playing ? '' : 'paused'} />
        </div>
        <div className="progress" >
          <CircleProgress size="48" percent={percent} />
        </div>
      </div >
    </StyleWrap>
  )
}

export default NavPlayer

const StyleWrap = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .player-box {
      flex: 1;
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;

      .cover {
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%) scale(0.9);
        width: 50px;
        height: 50px;
        background: var(--tab-bg-color);
        border: 6px solid var(--tab-bg-color);
        border-radius: 50%;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          animation: rotate 10s linear infinite;
        }
        .paused{
          animation-play-state: paused;
        }
      }
    }

    .progress {
      height: 50px;
      transform-origin: 0 0;
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

`;
