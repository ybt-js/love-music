import React from 'react'
import styled from 'styled-components'
import { handleImageSize } from '@/utils'

function ArtistItem(props) {
  const { title, data, minHeight } = props
  return (
    <Wrap minHeight={minHeight}>
      <h3 className="title">
        <span>{title}</span>
      </h3>
      <ul className="artists">
        {
          data?.map((artist) => (
            <li className='artist' key={artist.id}>
              <div className="artist-img">
                <img src={handleImageSize(artist.picUrl, 100)} alt="" loading='lazy' />
              </div>
              <div className="name">
                <span>{artist.name}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </Wrap>
  )
}

export default ArtistItem

const Wrap = styled.div`
  min-height: ${(props) => props.minHeight}px;

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

  .artist{
    display: flex;
    align-items: center;

    .artist-img {
      flex: 0 0 50px;
      padding: 10px 20px;

      img {
        height: 50px;
        border-radius: 50%;
      }
    }
  }

`
