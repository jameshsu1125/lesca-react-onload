const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = './template/template.meta.js';
const Meta = require(template);

module.exports = {
  entry: path.join(__dirname, 'src/docs'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|m?jsx?|)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'img/[path][name].[ext]', context: 'src/docs' },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...Meta,
      template: 'template/template.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    port: 8000,
    open: true,
  },
};
