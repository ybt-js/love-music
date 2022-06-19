import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Top, Album, Lyric, Control } from "../children";
import { Progress } from '@/components'
const imgUrl =
  "http://p3.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg";

function Player(props) {

  return (
    <StyleWrap {...props}>
      <Top />
      {/* <Album /> */}
      <Lyric />
      <Progress />
      <Control />
      <div className="player-bg">
        <img src={imgUrl} alt="" />
      </div>
    </StyleWrap>
  );
}

export default Player;

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
