const lyricReg = /\[(\d{2}):(\d{2})\.(\d{2,})\]/;

function handleLyric(lyricStr) {
  const lyricArr = lyricStr.split("\n");
  let result = [];
  lyricArr.forEach((item) => {
    const res = lyricReg.exec(item);
    if (res) {
      const minute = res[1] * 60 * 1000;
      const second = res[2] * 1000;
      const millisecond = res[3].length === 2 ? res[3] * 10 : res[3] * 1;
      const time = minute + second + millisecond;
      const text = item.replace(lyricReg, "").trim();
      if (text) {
        result.push({
          time,
          text,
        });
      }
    }
  });
  return result;
}
export default handleLyric;
