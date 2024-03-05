/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const EslingPlugin = require('eslint-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
    new EslingPlugin({ extensions: 'ts' })
  ],
  devServer: {
    static: path.join(__dirname, 'src'),
    compress: true,
    port: 8080,
    hot: true,
  },
};
