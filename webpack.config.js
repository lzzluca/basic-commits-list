const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    // see https://ui.dev/react-router-cannot-get-url-refresh
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, 
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      // see https://blog.jakoblind.no/css-modules-webpack/
      // module css
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      // global css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.js', '.ts', '.tsx'],
  },
  devServer: {
    // see https://ui.dev/react-router-cannot-get-url-refresh
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "eval-source-map",
};
