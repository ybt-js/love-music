import React from "react";
import styled from "styled-components";
import { handleImageSize } from "@/utils";

function OfficialRank(props) {
  const { data, onClick } = props;
  return (
    <Wrap>
      <h2 className="title">官方榜</h2>
      {data?.map(playlist => (
        <div
          className="list-info"
          key={playlist.id}
          onClick={() => onClick(playlist)}
        >
          <div className="cover">
            <img src={handleImageSize(playlist.coverImgUrl, 200)} alt="" />
          </div>
          <ul className="top-list">
            {playlist.tracks.map(info => (
              <li className="song-info" key={info.first}>
                <span className="song-name">{info.first}</span>
                <span> - </span>
                <span className="artist-name">{info.second}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Wrap>
  );
}

export default OfficialRank;

const Wrap = styled.div`
  .title {
    color: #fff;
    font-size: 16px;
    padding: 10px 0;
  }

  .list-info {
    height: calc(90vw * 0.25);
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    background: rgba(59, 67, 76, 0.6);

    .cover {
      width: 25%;
      height: calc(90vw * 0.25);
    }

    .top-list {
      width: 60vw;
      display: flex;
      flex-direction: column;
      padding-left: 20px;

      .song-info {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .song-name {
          color: #fff;
        }
      }
    }
  }
`;
