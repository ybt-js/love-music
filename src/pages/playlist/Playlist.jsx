import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchPlaylist, fetchArtistHotSong } from "@/redux/slice";
import { Scroll } from "@/components";
import { handleArtistName, handleImageSize } from "@/utils";

function Playlist() {
  const playlist = useSelector(state => state.playlist.playlist);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state.type === "artist") {
      dispatch(fetchArtistHotSong(id));
    } else {
      dispatch(fetchPlaylist(id));
    }
  }, [location, dispatch, id]);

  return (
    <StyleWrap cover={location.state.cover}>
      <div className="top-title">
        <div className="back" onClick={() => navigate(-1)}>
          <span className="iconfont">&#xe60a;</span>
          <span>歌单</span>
        </div>
      </div>
      <div className="mask-bg">
        <img src={handleImageSize(location.state.cover, 200)} alt="" />
      </div>
      <div className="detail">
        <div className="info">
          <div className="cover">
            <img src={handleImageSize(location.state.cover, 200)} alt="" />
          </div>
          <div className="text">
            <h2 className="name">{playlist.name}</h2>
            <p className="description">{playlist.description}</p>
          </div>
        </div>
      </div>
      <Scroll style={{ height: "70vh", background: "rgba(59, 67, 76, 0.6)" }}>
        <ul className="playlist">
          {playlist.data?.map((info, index) => (
            <li className="item" key={info.id}>
              <div className="order">{index + 1}</div>
              <div className="song-info">
                <h2 className="song-name">{info.name}</h2>
                <p className="artist">{handleArtistName(info.ar)}</p>
              </div>
            </li>
          ))}
          {/* <div className="floor"></div> */}
        </ul>
      </Scroll>
    </StyleWrap>
  );
}

export default Playlist;

const StyleWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: url(${require("@/assets/img/bg.jpg")});
  background-size: 100% 100%;

  .top-title {
    position: absolute;
    top: 0;
    width: 100%;
    height: 40px;
    z-index: 10;

    .back {
      width: 20%;
      line-height: 40px;
      color: #000;

      span {
        padding: 0 5px;
        font-size: 16px;
      }
    }
  }

  .mask-bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30vh;
    background-image: url(${props => props.cover});
    background-position: center;
    background-size: 100%;
    overflow: hidden;
    z-index: -99;

    img {
      filter: blur(5px);
      transform: translateY(-20%);
    }
  }

  .detail {
    width: 100%;
    height: 30vh;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0 5%;

    .info {
      width: 100%;
      display: flex;

      .cover {
        flex: 0 0 25%;
        min-height: calc(100vw * 0.25);

        img {
          border-radius: 6px;
          height: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 60%;
        padding-left: 5%;

        .name {
          font-weight: 700;
          font-size: 16px;
          color: #000;
        }

        .description {
          width: 100%;
          color: var(--tab-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .playlist {
    width: 100%;
    padding-top: 5px;
    overflow: hidden;

    .item {
      display: flex;
      align-items: center;

      .order {
        flex: 0 0 40px;
        color: #fff;
        text-align: center;
      }
    }
    .song-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0;

      .song-name {
        font-size: 14px;
        color: #fff;
      }
    }

    .floor {
      width: 100%;
      height: 55px;
    }
  }
`;
