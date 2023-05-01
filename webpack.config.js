const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "./src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },

  devtool: "inline-source-map",

  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 5000,
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: "asset/resource",
        filename: [name][ext],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "freaking toDo",
    }),
    new MiniCssExtractPlugin(),
  ],
};
