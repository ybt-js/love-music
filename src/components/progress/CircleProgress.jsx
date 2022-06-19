import React from 'react'
import styled from 'styled-components'

function CircleProgress(props) {
  const { size, percent } = props
  // percent为NaN时
  const value = percent !== percent ? 0 : percent
  const dashOffset = (1 - value) * 314
  return (
    <StyleWrap>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="inner" r="50" cx="50" cy="50"></circle>
        <circle
          className="outer"
          r="50"
          cx="50"
          cy="50"
          strokeDashoffset={dashOffset}
        ></circle>
      </svg >
    </StyleWrap>
  )
}

export default CircleProgress

const StyleWrap = styled.div`
  position: relative;
  height: 100%;

  circle {
    fill: transparent;
    stroke-width: 8px;
    transform-origin: center;

    &.inner {
      transform: scale(0.9);
      stroke-dasharray: 314;
      stroke: #999;
      opacity: 0.7;
    }

    &.outer {
      transform: scale(0.9) rotate(-90deg);
      stroke:var(--theme-color);
      stroke-dasharray: 314;
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
