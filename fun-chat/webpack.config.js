const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: 'ts' }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'dist/img') }],
  }),

],
module: {
  rules: [
    {
      test: /\.(jpg|png|svg|jpeg|gif)$/,
      type: 'asset/resource',
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.ts$/i,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
 },
};