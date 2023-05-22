const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/pages/index.js",
    neuralNetwork: "./src/pages/neural-network.js",
    gallery: "./src/pages/gallery-page.js",
    confrontation: "./src/pages/confrontation.js",
    conclusion: "./src/pages/conclusion.js",
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:20].js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,

    open: true,
    watchFiles: ["src/**/*.html"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/neural-network.html",
      inject: true,
      chunks: ["neuralNetwork"],
      filename: "neural-network.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/gallery-page.html",
      inject: true,
      chunks: ["gallery"],
      filename: "gallery-page.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/confrontation.html",
      inject: true,
      chunks: ["confrontation"],
      filename: "confrontation.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/conclusion.html",
      inject: true,
      chunks: ["conclusion"],
      filename: "conclusion.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "favicon.ico", to: "favicon.ico" }],
    }),
  ],
};
