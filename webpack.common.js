module.exports = {
  commonConfig: (mode) => ({
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(png|jpg|gif|ico|jpeg|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets/img",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  }),
};
