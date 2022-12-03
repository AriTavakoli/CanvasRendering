const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/components/layouts'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    }
  },

  mode: 'development',

  entry: {
    index: './src/index.js',

  },

  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/index.html'
    }),
  //  new BundleAnalyzerPlugin(),

    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    })

  ],




  devtool: 'inline-source-map',

  devServer: {
    static: './dist',
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};