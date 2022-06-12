class WebStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  /**
   *
   * @param {string} key
   * @param {object} value
   * @param {number} expires 以秒为单位的过期时间
   */
  setItem(key, value, expires) {
    const data = { value };
    if (expires !== null) {
      data.expires = Date.now() + expires * 1000;
    }
    this.storage.setItem(key, JSON.stringify(data));
  }

  /**
   *
   * @param {string} key
   * @returns
   */
  getItem(key) {
    const res = this.storage.getItem(key);
    const data = JSON.parse(res);
    let value = null;
    if (data) {
      if (data.expires && Date.now() >= data.expires) {
        this.storage.removeItem(key);
      } else {
        value = data.value;
      }
    }
    return value;
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  getAll() {
    const data = {};
    Object.entries(this.storage).forEach(([key, value]) => {
      data[key] = JSON.parse(value).value;
    });
    return data;
  }

  forEach(callbackFn) {
    Object.entries(this.storage).forEach(([key, value]) => {
      callbackFn(key, JSON.parse(value).value);
    });
  }
}

export const localCache = new WebStorage(localStorage);
export const tempCache = new WebStorage(sessionStorage);
