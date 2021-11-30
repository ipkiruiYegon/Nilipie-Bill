const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

require("dotenv").config();
const { PORT: port, NODE_ENV: mode } = process.env;

module.exports = {
  plugins: [new Dotenv(), new webpack.HotModuleReplacementPlugin()],
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    open: true,
    port: port,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css)$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpeg|gif|ico|icon)$/i,
        loader: "file-loader",
      },
    ],
  },
};
