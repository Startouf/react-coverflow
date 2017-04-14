const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

module.exports = {
  entry: {
    'react-coverflow': glob.sync(path.join(__dirname, './src/*.js'))
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-coverflow',
  },
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass!postcss'
      }
    ]
  },
  plugins: plugins,
  postcss: function() {
    return [precss, autoprefixer];
  }
};
