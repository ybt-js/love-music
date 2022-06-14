import React from "react";
import styled from "styled-components";
import { handleImageSize } from "@/utils";

function HandpickRank(props) {
  const { data, onClick, onImgLoaded } = props;
  return (
    <Wrap>
      <h2 className="title">精选榜</h2>
      <div className="choiceness-list">
        {data?.map((playlist, index) => (
          <div
            className="list-info"
            key={playlist.id}
            onClick={() => onClick(playlist)}
          >
            <div className="cover">
              <img
                src={handleImageSize(playlist.coverImgUrl, 200)}
                alt=""
                loading="lazy"
                onLoad={onImgLoaded}
              />
            </div>
            <p className="name">{playlist.name}</p>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export default HandpickRank;

const Wrap = styled.div`
  .title {
    color: #fff;
    font-size: 16px;
    padding-bottom: 10px;
  }

  .choiceness-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .list-info {
      width: 30%;
      padding: 5px 0;

      .cover {
        width: 100%;
        height: calc(90vw * 0.3);

        img {
          border-radius: 5%;
        }
      }

      .name {
        font-size: 12px;
        color: #fff;
        padding: 5px 0;
      }
    }
  }
`;
