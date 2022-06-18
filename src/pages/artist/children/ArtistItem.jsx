import React from "react";
import styled from "styled-components";
import { handleImageSize } from "@/utils";

function ArtistItem(props) {
  const { title, data, minHeight, onClick } = props;
  return (
    <StyleWrap minHeight={minHeight}>
      <h3 className="title">
        <span>{title}</span>
      </h3>
      <ul className="artist-list">
        {data?.map((artist, index) => (
          <li
            className="artist"
            key={artist.id}
            onClick={() => onClick(artist)}
          >
            <div className="artist-img">
              <img
                src={handleImageSize(artist.picUrl, 100)}
                alt=""
                loading="lazy"
              />
            </div>
            <div className="artist-name">
              <span>{artist.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </StyleWrap>
  );
}

export default ArtistItem;

const StyleWrap = styled.div`
  min-height: ${props => props.minHeight}px;

  .title {
    position: sticky;
    top: 0;
    left: 0;
    height: 30px;
    line-height: 30px;
    background: var(--artist-title-color);

    span {
      color: #fff;
      padding: 0 20px;
    }
  }

  .artist {
    display: flex;
    align-items: center;
    height: 70px;

    .artist-img {
      flex: 0 0 50px;
      padding: 0 15px;

      img {
        height: 50px;
        border-radius: 50%;
      }
    }
  }
`;
