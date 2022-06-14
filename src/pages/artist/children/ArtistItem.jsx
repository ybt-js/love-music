import React from "react";
import styled from "styled-components";
import { handleImageSize } from "@/utils";

function ArtistItem(props) {
  const { title, data, minHeight, onClick } = props;

  const handleClick = e => {
    const index = e.target.getAttribute("data-index");
    const artist = data[index];
    onClick(artist);
  };

  return (
    <Wrap minHeight={minHeight}>
      <h3 className="title">
        <span>{title}</span>
      </h3>
      <ul className="artist-list" onClick={handleClick}>
        {data?.map((artist, index) => (
          <li className="artist" key={artist.id} data-index={index}>
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
    </Wrap>
  );
}

export default ArtistItem;

const Wrap = styled.div`
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
