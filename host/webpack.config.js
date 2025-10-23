const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
            name: 'host',
            remotes: {
              vite_provider: 'vite_provider@http://localhost:5173/assets/mf-manifest.json',
            },
            shared: {
              react: {
                singleton: true,
              },
              'react-dom': {
                singleton: true,
              },
            },
      }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  mode: "development",
  target: "web",
};