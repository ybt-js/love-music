import request from "./request";

/**
 * 获取热歌
 * @returns
 */
export function fetchHotSong() {
  return fetchPlaylist(3778678);
}

/**
 * 获取新歌
 * @returns
 */
export function fetchNewSong() {
  return fetchPlaylist(3779629);
}

/**
 * 获取精选歌单
 * @param {number} limit
 * @returns
 */
export function fetchRecommendPlaylist(limit = 30) {
  return request.get("/personalized", { limit, timestamp: Date.now() });
}

/**
 * 获取歌手列表 https://neteasecloudmusicapi.vercel.app/#/?id=歌手分类列表
 * @param {string} initial
 * @param {number} limit
 * @returns
 */
export function fetchArtistList({ initial, limit = 5, ...reset }) {
  return request.get("/artist/list", {
    type: -1,
    area: 7,
    limit: limit,
    initial: initial,
    ...reset,
  });
}

/**
 * 获取歌手热门歌曲
 * @param {number} id
 * @returns
 */
export function fetchArtistHotSong(id) {
  return request.get("/artist/top/song", { id });
}

/**
 * 获取歌手详情
 * @param {number} id
 * @returns
 */
export function fetchArtistDetail(id) {
  return request.get("/artist/detail", { id });
}

/**
 * 获取排行榜
 * @returns
 */
export function fetchTopList() {
  return request.get("/toplist/detail");
}

/**
 * 获取歌曲url
 * @param {number} id
 * @returns
 */
export function fetchSongUrl(id) {
  return request.get("/song/url", { id });
}

/**
 * 获取歌词
 * @param {number} id
 * @returns
 */
export function fetchLyric(id) {
  return request.get("/lyric", { id });
}

/**
 * 获取歌曲详情
 * @param {Array} ids
 * @returns
 */
export function fetchSongDetail(ids) {
  return request.get("/song/detail", { ids });
}

/**
 * 获取唱片
 * @param {number} id
 * @returns
 */
export function fetchAlbum(id) {
  return request.get("/album", { id });
}

/**
 * 获取播放列表
 * @param {number} id
 * @returns
 */
export function fetchPlaylist(id) {
  return request.get("playlist/detail", { id });
}

/**
 * 获取验证码
 * @param {number} phone
 * @returns
 */
export function fetchCaptcha(phone) {
  return request.get("/captcha/sent", { phone });
}

/**
 * 验证码登录
 * @param {number} phone
 * @param {number} captcha
 * @returns
 */
export function referCaptchaLogin(phone, captcha) {
  return request.post("/login/cellphone", { phone, captcha });
}

/**
 * 通过密码登录
 * @param {number} phone
 * @param {string} password
 * @returns
 */
export function referPasswordLogin(phone, password) {
  return request.post("/login/cellphone", { phone, password });
}

/**
 * 获取登录状态
 * @returns
 */
export function fetchLoginStatus() {
  return request.get("/login/status", { timestamp: Date.now() });
}

/**
 * 退出登录
 * @returns
 */
export function fetchLogout() {
  return request.post("/logout", { timestamp: Date.now() });
}

/**
 * 获取用户歌单
 * @param {number} uid
 * @returns
 */
export function fetchUserPlaylist(uid) {
  return request.get("/user/playlist", { uid });
}

/**
 * 获取用户喜欢的音乐列表
 * @param {number} uid
 * @returns
 */
export function fetchLikeIds(uid) {
  return request.get("/likelist", { uid });
}

/**
 * 获取用户等级
 * @returns
 */
export function fetchUserLevel() {
  return request.get("/user/level");
}

/**
 * 获取搜索框默认关键字
 * @returns
 */
export function fetchDefaultKey() {
  return request.get("/search/default");
}

/**
 * 获取搜索建议
 * @param {string} keywords
 * @returns
 */
export function fetchSearchSuggest(keywords) {
  return request.get("/search/suggest", {
    keywords: keywords,
    type: "mobile",
  });
}

/**
 * 获取热搜关键字
 * @returns
 */
export function fetchHotKeywords() {
  return request.get("/search/hot/detail");
}

/**
 * 获取搜索结果
 * @param {string} keywords
 * @param {*} options
 * @returns
 */
export function fetchSearchResult(keywords, options) {
  return request.get("/cloudsearch", {
    keywords,
    ...options,
  });
}
