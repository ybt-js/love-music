module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://120.24.7.120:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  webpack: {
    alias: {
      "@": "./src",
    },
  },
};
