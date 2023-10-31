// webpack.server.js
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { commonConfig } = require("./webpack.common");

module.exports = (env, argv) => {
  return {
    target: "node",
    mode: "development",
    externals: [nodeExternals()],
    entry: "./src/server/index.js",
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "build"),
    },
    ...commonConfig(argv.mode),
  };
};
