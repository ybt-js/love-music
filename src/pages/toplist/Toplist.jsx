import { useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchToplist } from "./toplistSlice";

import { debounce } from "@/utils";

import { Scroll } from "@/common";
import OfficialRank from "./children/OfficialRank";
import HandpickRank from "./children/HandpickRank";

function Toplist() {
  const bsRef = useRef();
  const toplist = useSelector(state => state.toplist.toplist);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchToplist());
  }, [dispatch]);

  const officialData = useMemo(() => toplist.slice(0, 4), [toplist]);
  const handpickData = useMemo(() => toplist.slice(5), [toplist]);
  const handleImgLoaded = useMemo(
    () => debounce(() => bsRef.current.refresh(), 300),
    [],
  );

  // eslint-disable-next-line
  const handleClick = playlist => {
    //todo 跳转到歌单列表
    console.log(playlist);
  };
  return (
    <Scroll ref={bsRef} style={{ padding: "0 5%" }}>
      <OfficialRank data={officialData} onClick={handleClick} />
      <HandpickRank
        data={handpickData}
        onImgLoaded={handleImgLoaded}
        onClick={handleClick}
      />
    </Scroll>
  );
}

export default Toplist;
