const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssLoader = {
  loader: "postcss-loader",
  options: {
    config: {
      path: "postcss.config.js",
    },
  },
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        // 조건 걸어주기
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              "sass-loader",
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", postcssLoader, "sass-loader"],
          },
        ],
      },
      {
        test: /.js/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
  ],
  target: "node",
};
