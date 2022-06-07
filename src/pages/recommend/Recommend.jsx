import React from 'react';
import Scroll from '../../common/Scroll';
import api from '../../service/api';

function Recommend() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    api.fetchHotSong().then(res => {
      setData(res.playlist.tracks);
    });
  }, []);
  return (
    <div>
      <Scroll>
        <div>
          {data.map(item => (
            <h3 key={item.id}>{item.name}</h3>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

export default Recommend;
