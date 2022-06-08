const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

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
      "@": resolve("src"),
      pages: resolve("src/pages"),
      components: resolve("src/components"),
      common: resolve("src/common"),
    },
  },
};
