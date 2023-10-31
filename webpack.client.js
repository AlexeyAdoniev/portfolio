// webpack.server.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { commonConfig } = require("./webpack.common");

module.exports = (env, argv) => {
  console.log(argv);
  const watchMode = argv.liveReload || false;
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/client/index.html",
      }),
    ],
    entry: "./src/client/index.js",
    output: {
      filename: watchMode
        ? "assets/[name].[hash].js"
        : "assets/[name].[chunkhash].js",
      path: path.resolve(__dirname, "build"),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "build"),
      },
      compress: true,
      port: 8080,
    },
    ...commonConfig(argv.mode),
  };
};
