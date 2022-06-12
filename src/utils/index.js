/**
 * 设置图片大小
 * @param {string} url
 * @param {number} size
 * @returns {string}
 */
export function handleImageSize(url, size) {
  return url + `?param=${size}y${size}`;
}

/**
 * 格式化播放次数
 * @param {number} count
 * @returns {string}
 */
export function formatPlayCount(count) {
  let num = count.toString();
  if (num.length > 8) {
    num = (num / 10 ** 8).toFixed(1) + "亿";
  } else if (num.length > 5) {
    num = (num / 10 ** 4).toFixed(1) + "万";
  }
  return num;
}

/**
 * 防抖
 * @param {fun} func
 * @param {number} delay
 * @returns {fun}
 */
export function debounce(func, delay = 0) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func?.apply(this, args);
    }, delay);
  };
}

/**
 * 去中心化
 * @param {context} webpackContext
 * @param {RegExp} exclude
 * @returns
 */
export function decentralization(webpackContext, exclude = /index/) {
  const exports = {};
  webpackContext
    .keys()
    .filter(path => !exclude.test(path))
    .forEach(path => {
      const module = webpackContext(path);
      for (let key in module) {
        const name = module[key].name || module[key].displayName || key;
        exports[name] = module[key];
      }
    });

  return exports;
}

/**
 *
 * @param {Array} inputs
 * @param {()=>Promise} promiseMaker
 */
export function promiseSequence(inputs, promiseMaker) {
  inputs = [...inputs];

  function handleNextInput(outputs) {
    if (inputs.length === 0) {
      return outputs;
    } else {
      const nextInput = inputs.shift();
      return promiseMaker(nextInput)
        .then(output => outputs.concat(output))
        .then(handleNextInput);
    }
  }

  return Promise.resolve([]).then(handleNextInput);
}
