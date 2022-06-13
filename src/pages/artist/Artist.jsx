import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistList } from "./artistSlice";

import { Scroll, SideNav } from "@/common";
import ArtistItem from "./children/ArtistItem";
import TopTitle from "./children/TopTitle";

const sideNavData = ["热"];
for (let i = 65; i <= "Z".charCodeAt(); i++) {
  sideNavData.push(String.fromCharCode(i));
}

const params = [{ initial: -1, limit: 10 }];
for (let i = 1; i < sideNavData.length; i++) {
  params.push({ initial: sideNavData[i], limit: 10 });
}

const TOP_TITLE_HEIGHT = 30;

function Artist() {
  const bsRef = useRef();
  const artistsRef = useRef();
  const heightsRef = useRef([0]);
  const [curIdx, setCurIdx] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const artistList = useSelector(state => state.artist.artistList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtistList(params));
  }, [dispatch]);

  useEffect(() => {
    const eleList = artistsRef.current.children;
    const heights = heightsRef.current;
    for (let i = 0; i < eleList.length; i++) {
      heights.push(heights[i] + eleList[i].clientHeight);
    }
  }, []);

  const scrollToElement = index => {
    let ele = artistsRef.current.children[index];
    bsRef.current.scrollToElement(ele, 0);
  };

  const navTouchStart = index => {
    setCurIdx(index);
    scrollToElement(index);
  };

  const navTouchMove = index => {
    setCurIdx(index);
    scrollToElement(index);
  };

  const onScroll = ({ y }) => {
    setShowTitle(y <= 0);

    // 向下滚动时
    if (y > 0) {
      setCurIdx(0);
      return;
    }
    // 正常滚动
    let heights = heightsRef.current;
    for (let i = 0; i < heights.length; i++) {
      let top = heights[i];
      let bottom = heights[i + 1];
      if (-y >= top && -y < bottom) {
        setCurIdx(i);
        setOffsetY(() => {
          let val = bottom + y;
          if (val > 0 && val < TOP_TITLE_HEIGHT) {
            return TOP_TITLE_HEIGHT - val;
          }
          return 0;
        });
        return;
      }
    }

    // 到底后继续向上滚动时
    if (-y >= heights[heights.length - 2]) {
      setCurIdx(heights.length - 2);
    }
  };

  const artistItemClick = artist => {
    // todo 跳转到该歌手的歌曲列表
  };

  return (
    <Fragment>
      {showTitle && (
        <TopTitle
          offsetY={-offsetY}
          title={curIdx === 0 ? "热门" : sideNavData[curIdx]}
        />
      )}
      <Scroll ref={bsRef} probeType={3} onScroll={onScroll}>
        <div className="artists" ref={artistsRef}>
          {sideNavData.map((item, index) => (
            <ArtistItem
              key={item}
              title={index === 0 ? "热门" : item}
              minHeight={730}
              data={artistList[index]?.artists}
              onClick={artistItemClick}
            />
          ))}
        </div>
      </Scroll>
      <SideNav
        data={sideNavData}
        curIdx={curIdx}
        navTouchStart={navTouchStart}
        navTouchMove={navTouchMove}
      />
    </Fragment>
  );
}

export default Artist;
