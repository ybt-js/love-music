import React from "react";
import styled from "styled-components";
import { handleImageSize, handlePlayCount } from "@/utils";

function Songs(props) {
  const { title, playlist, showMore = true, count = 6, onLoaded } = props;
  return (
    <SongsWrap>
      <div className="top-title">
        <h2 name="title">{title}</h2>
        {showMore && (
          <div
            className="more"
            onClick={() => {
              //todo 跳转到歌单列表
            }}
          >
            <span>更多</span>
            <span className="iconfont">&#xe600;</span>
          </div>
        )}
      </div>
      <div className="song-list">
        {playlist.slice(0, count).map(song => (
          <div
            className="list-item"
            key={song.id}
            onClick={() => {
              //todo 跳转到歌单列表 or 播放歌曲
            }}
          >
            {song.playCount && (
              <div className="play-count">
                <span className="iconfont">&#xe604;</span>
                <span className="count">{handlePlayCount(song.playCount)}</span>
              </div>
            )}
            <div className="img-box">
              <img
                src={handleImageSize(song.al?.picUrl || song.picUrl, 200)}
                onLoad={() => { onLoaded?.() }}
                alt=""
                loading='lazy'
              />
            </div>
            <p className="name">{song.name}</p>
          </div>
        ))}
      </div>
    </SongsWrap>
  );
}

export default Songs;

const SongsWrap = styled.div`
  min-height: 310px;
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

    .play-count {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #fff;
      font-size: 12px;
      font-style: normal;
      border-radius: 12px;
      padding: 0 8px;
      background-color: rgba(0, 0, 0, 0.3);

      .iconfont {
        padding-right: 2px;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

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

      .name {
        color: #fff;
        font-size: 12px;
        padding: 5px 0 10px 0;
      }
    }
  }
`;
