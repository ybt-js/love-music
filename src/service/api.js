import request from "./request";

const api = {
  //热歌
  fetchHotSong() {
    return request.get("/playlist/detail", { id: 3778678 });
  },

  //新歌
  fetchNewSong() {
    return request.get("/playlist/detail", { id: 3779629 });
  },

  //精选
  fetchRecommendPlaylist(limit = 30) {
    return request.get("/personalized", { limit, timestamp: Date.now() });
  },

  //歌手列表
  fetchSingerList(initial, limit = 5) {
    return request.get("/artist/list", {
      type: -1,
      area: 7,
      limit: limit,
      initial: initial,
    });
  },

  //歌手热门歌曲
  fetchSingerHotSong(id) {
    return request.get("/artist/top/song", { id });
  },

  //排行榜
  fetchTopList() {
    return request.get("/toplist/detail");
  },

  //歌曲播放链接
  fetchSongUrl(id) {
    return request.get("/song/url", { id });
  },

  //歌词
  fetchLyric(id) {
    return request.get("/lyric", { id });
  },

  //获取歌曲详情
  fetchSongDetail(ids) {
    return request.get("/song/detail", { ids });
  },

  //专辑内容
  fetchAlbum(id) {
    return request.get("/album", { id });
  },

  //歌曲列表
  fetchSongList(id) {
    return request.get("playlist/detail", { id });
  },

  //获取验证码
  fetchCaptcha(phone) {
    return request.get("/captcha/sent", { phone });
  },

  //验证码登录
  referCaptchaLogin(phone, captcha) {
    return request.post("/login/cellphone", { phone, captcha });
  },

  //密码登录
  referPasswordLogin(phone, password) {
    return request.post("/login/cellphone", { phone, password });
  },

  //获取登录状态
  fetchLoginStatus() {
    return request.get("/login/status", { timestamp: Date.now() });
  },

  //退出登录
  fetchLogout() {
    return request.post("/logout", { timestamp: Date.now() });
  },

  //用户歌单
  fetchUserPlaylist(uid) {
    return request.get("/user/playlist", { uid });
  },

  //用户喜欢音乐的id列表
  fetchLikeIds(uid) {
    return request.get("/likelist", { uid });
  },

  //获取用户等级
  fetchUserLevel() {
    return request.get("/user/level");
  },

  //默认搜索关键字
  fetchDefaultKey() {
    return request.get("/search/default");
  },

  //搜索建议
  fetchSearchSuggest(keywords) {
    return request.get("/search/suggest", {
      keywords: keywords,
      type: "mobile",
    });
  },

  //热搜关键字
  fetchHotKeys() {
    return request.get("/search/hot/detail");
  },

  //搜索结果
  fetchSearchResult(keywords, options) {
    return request.get("/cloudsearch", {
      keywords,
      ...options,
    });
  },
};

export default api;
