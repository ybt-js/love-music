import React from 'react';
import styled from 'styled-components';
import { handleImageSize } from '@/utils'

function Songs(props) {
  const { title, playlist } = props;
  //todo 下拉刷新展示的歌曲
  return (
    <SongsWrap>
      <div className="top-title">
        <h2 name="title">{title}</h2>
        <div className="more">
          <span>更多</span>
          <span className="iconfont">&#xe600;</span>
        </div>
      </div>
      <div className="song-list">
        {playlist.slice(0, 6).map(song => (
          <div className="list-item" key={song.id}>
            <div className="img-box">
              <img src={handleImageSize(song.al.picUrl, 200)} alt="" />
            </div>
            <h3>{song.name}</h3>
          </div>
        ))}
      </div>
    </SongsWrap>
  );
}

export default Songs;

const SongsWrap = styled.div`
  padding: 0 5%;
  margin-bottom: 10px;
  // text-align: center;
  .top-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;

    h2 {
      color: #fff;
      font-size: 16px;
    }

    .more {
      width: 50px;
      text-align: right;
      font-size: 12px;
      color: #fff;

      .iconfont {
        font-size: 12px;
      }
    }
  }

  .song-list {
    width: 90vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .list-item {
      width: 30%;
      text-align: left;
      position: relative;

      .img-box {
        width: 100%;
        min-height: calc(90vw * 0.3);

        img {
          width: 100%;
          border-radius: 6px;
        }
      }

      h3 {
        color: #fff;
        font-size: 12px;
        padding: 5px 0 10px 0;
      }
    }
  }
`;
