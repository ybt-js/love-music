export function handleImageSize(url, size) {
  return url + `?param=${size}y${size}`;
}

export function handlePlayCount(count) {
  let num = count.toString();
  if (num.length > 8) {
    num = (num / 10 ** 8).toFixed(1) + "亿";
  } else if (num.length > 5) {
    num = (num / 10 ** 4).toFixed(1) + "万";
  }
  return num;
}

export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
