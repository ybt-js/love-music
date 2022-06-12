import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArtistList } from './artistSlice'

import { Scroll, SideNav } from "@/common";
import ArtistItem from './children/ArtistItem';
import TopTitle from './children/TopTitle';

const sideNavData = ["热"];
for (let i = 65; i <= "Z".charCodeAt(); i++) {
  sideNavData.push(String.fromCharCode(i));
}

const params = [{ initial: -1, limit: 10 }]
for (let i = 1; i < sideNavData.length; i++) {
  params.push({ initial: sideNavData[i], limit: 8 })
}

function Artist() {
  const artistList = useSelector(state => state.artist.artistList)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArtistList(params))
  }, [dispatch])

  const navTouchStart = index => {
    console.log("navTouchStart:", index);
  };

  const navTouchMove = index => {
    console.log("navTouchMove:", index);
  };

  return (
    <Fragment>
      <Scroll>
        <TopTitle />
        {
          sideNavData.map((item, index) => (
            <ArtistItem
              key={item}
              title={item}
              minHeight={index === 0 ? 730 : 590}
              data={artistList[index]?.artists} />
          ))
        }
      </Scroll>
      <SideNav
        data={sideNavData}
        navTouchStart={navTouchStart}
        navTouchMove={navTouchMove}
      />
    </Fragment>
  );
}

export default Artist;



