import React from "react";
import styled from "styled-components";
const imgUrl =
  "http://p4.music.126.net/wi0TxANW_8wWYOwuGJZI6g==/109951166733993476.jpg";
function Album() {
  return (
    <StyleWrap className="album">
      <div className="cover">
        <img src={imgUrl} alt="" className={""} />
      </div>
      <div className="cur-lyric">
        <p className="text">{"该配合你演出的我演视而不见"}</p>
      </div>
    </StyleWrap>
  );
}

export default Album;

const StyleWrap = styled.div`
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
`;
