import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentTime } from '../player/playerSlice'
import styled from "styled-components";



function Progress() {
  const barRef = useRef()
  const btnRef = useRef()
  const passRef = useRef()
  const [touching, setTouching] = useState(false)
  const [startPageX, setStartPageX] = useState(0)
  const [passWidth, setPassWidth] = useState(0)
  const [offsetWidth, setOffsetWidth] = useState(0)
  const { currentTime, duration, currentSong } = useSelector(state => ({
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    currentSong: state.player.currentSong,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    const percent = currentTime / duration
    if (percent >= 0 && !touching) {
      const offsetWidth = Math.abs(totalWidth() * percent)
      setOffsetWidth(offsetWidth)
    }
  }, [currentTime]);


  const totalWidth = () => {
    return barRef.current.clientWidth - 15
  }

  const barClick = (e) => {
    const { left } = e.currentTarget.getBoundingClientRect()
    setOffsetWidth(e.pageX - left)
  }

  const btnTouchStart = (e) => {
    setTouching(true)
    setStartPageX(e.targetTouches[0].pageX)
    setPassWidth(passRef.current.clientWidth)
    console.log(startPageX);
    console.log(passWidth);
  }
  const btnTouchMove = (e) => {

    const curPageX = e.targetTouches[0].pageX
    const deltaPageX = curPageX - startPageX
    const offsetWidth = Math.min(
      totalWidth(),
      Math.max(0, deltaPageX + passWidth))
    console.log(offsetWidth);
    setOffsetWidth(offsetWidth)
  }
  const btnTouchEnd = () => {
    setTouching(false)
    if (!currentSong.url) return

    const percent = passWidth / totalWidth()
    dispatch(changeCurrentTime(percent * duration))
  }

  return (
    <StyleWrap >
      <div ref={barRef} className="bar" onClick={barClick}>
        <div
          ref={btnRef}
          className={"btn" + (touching ? ' big' : '')}
          style={{ left: offsetWidth }}
          onTouchStart={btnTouchStart}
          onTouchMove={btnTouchMove}
          onTouchEnd={btnTouchEnd}>
        </div>
        <div ref={passRef} className="pass" style={{ width: offsetWidth + 7 }}></div>
      </div>
      <div className="time">
        <span className="start">{"00:00"}</span>
        <span className="end">{"03:34"}</span>
      </div>
    </StyleWrap>
  );
}

export default Progress;

const StyleWrap = styled.div`
  position: absolute;
  bottom: 120px;
  width: 80%;
  padding: 0 10%;
  color: #fff;

  .bar {
    position: relative;
    height: 2px;
    background-color: hsla(0, 0%, 100%, 0.5);
    border-radius: 5px;

    .btn {
      position: absolute;
      left: 0;
      top: 50%;
      width: 15px;
      height: 15px;
      background-color: #fff;
      border-radius: 50%;
      box-sizing: border-box;
      transform: translateY(-50%);
    }

    .big{
      width: 15px;
      height: 15px;
    }

    .pass {
      width: 0;
      height: 3px;
      border-radius: 5px;
      background-color: #fff;
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
`;
