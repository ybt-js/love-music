import qs from 'qs';

const isProd = process.env.NODE_ENV === 'production';
const BASE_URL = isProd ? 'http://120.24.7.120' : '/api';

class Request {
  async _request(url, data, options) {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    url = BASE_URL + url;
    if (config.method === 'GET') {
      if (data) {
        url += `?${qs.stringify(data)}`;
      }
    } else if (config.method === 'POST') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  }

  get(url, data, options) {
    return this._request(url, data, options);
  }

  post(url, data, options) {
    return this._request(url, data, { ...options, method: 'POST' });
  }
}

export default new Request();
