import { useRef, useState, useEffect } from "react";
import styled from "styled-components";


function Progress(props) {
  const { onClick, onChange, onFinish, percent } = props
  const btnRef = useRef()
  const passRef = useRef()
  const progressRef = useRef()
  const [touching, setTouching] = useState(false)
  const [startPageX, setStartPageX] = useState(0)
  const [passWidth, setPassWidth] = useState(0)
  const [offsetWidth, setOffsetWidth] = useState(0)



  useEffect(() => {
    if (percent >= 0 && !touching) {
      const totalWidth = getTotalWidth()
      const offsetWidth = Math.abs(totalWidth * percent)
      setOffsetWidth(offsetWidth)
    }
    // eslint-disable-next-line
  }, [percent]);


  const getTotalWidth = () => {
    return progressRef.current.clientWidth - btnRef.current.clientWidth
  }

  const getPercent = (offsetValue) => {
    const totalWidth = getTotalWidth()
    const percent = Math.max(Math.min(offsetValue / totalWidth, 1), 0)
    return percent
  }

  const barClick = (e) => {
    const { left } = e.currentTarget.getBoundingClientRect()
    const offsetValue = e.pageX - left
    const percent = getPercent(offsetValue)
    setOffsetWidth(offsetValue)
    onClick?.(percent)
  }

  const btnTouchStart = (e) => {
    setTouching(true)
    setStartPageX(e.targetTouches[0].pageX)
    setPassWidth(passRef.current.clientWidth)
  }

  const btnTouchMove = (e) => {
    const totalWidth = getTotalWidth()
    const curPageX = e.targetTouches[0].pageX
    const deltaPageX = curPageX - startPageX
    const offsetValue = Math.min(
      totalWidth,
      Math.max(0, deltaPageX + passWidth))
    const percent = getPercent(offsetValue)
    setOffsetWidth(offsetValue)
    onChange?.(percent)
  }

  const btnTouchEnd = () => {
    setTouching(false)
    const percent = getPercent(offsetWidth)
    console.log(percent);
    onFinish?.(percent)
  }

  return (
    <StyleWrap >
      <div ref={progressRef} className="bar" onClick={barClick}>
        <div
          ref={btnRef}
          className="btn"
          style={{ left: offsetWidth }}
          onTouchStart={btnTouchStart}
          onTouchMove={btnTouchMove}
          onTouchEnd={btnTouchEnd}>
        </div>
        <div ref={passRef} className="pass" style={{ width: offsetWidth + 3 }}></div>
      </div>
      {props.children}
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

    .pass {
      width: 0;
      height: 3px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
`;
