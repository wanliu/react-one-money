
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
  __ONE_MONEY_ID__        : JSON.stringify(process.env.ONE_MONEY || 28), // 活动ID
  __QR_CODE__             : JSON.stringify(process.env.QRCODE || true), // 是否显示二维码
  __HOME_IMG__            : JSON.stringify(process.env.HOMEIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/69ead15951e2096e29f1a57d16255d96.jpg'), // 首页图片
  __LIST_IMG__            : JSON.stringify(process.env.LISTIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/4b878ea97ce8d43d97eed22965ec6a73.jpg'),  // 列表图片
  __DEFAULT_AVATAR__      : JSON.stringify(process.env.DEFAULTAVATAR || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/1/default_avatar.gif!avatar'),
  __SIGNUP_URL__          : JSON.stringify(process.env.SIGNURL || 'http://m.wanliu.biz/authorize/weixin'),
  __API__                 : JSON.stringify(process.env.APIURL || '/api/promotions/one_money'),
  __ENV__                 : JSON.stringify('PRODUCTION'),
  __WINNERS_NUM__         : JSON.stringify(process.env.WINNERS || 50),
  __INTRODUCTION_LINK__   : JSON.stringify(process.env.INTRODUCTIONLINK || 'https://wap.koudaitong.com/v2/showcase/mpnews?alias=5nr3d4tc&spm=m1461292357652104565180197.scan.1449810565'),
  __INTRODUCTION_POSTER__ : JSON.stringify(process.env.INTRODUCTIONPOSTER || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/0c549461633e696a8841886a888b6a93.jpg'),
  __TIMESTAMP__           : JSON.stringify(process.env.TICK || new Date().getTime()),
  __GIFT_ITEM_LINK__       : JSON.stringify(process.env.GIFTITEMLINK || 'http://test.wanliu.biz/html/%E8%80%92%E9%98%B3%E8%A1%97%E4%B8%8A/gift-item/?itemId='),
  __SHOW_INTRODUCE__      : JSON.stringify(process.env.SHOWINTRODUCE || false),
};

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/main.js'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: './',
    filename: 'bundle_[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/, loader: 'babel-loader'
      },
      {
        test: /\.styl$/, include: path.resolve(__dirname, 'app'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader'),
      },
      {
        test: /\.json$/, include: path.resolve(__dirname, 'app'),
        loaders: ['json']
      },
    ]
  },
  postcss: function postcss() {
    return [autoprefixer, precss];
  },
  plugins: [
    new ExtractTextPlugin('[name]_[hash].css'),
    new webpack.DefinePlugin(config),
    new webpack.optimize.DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    }),
    new CleanWebpackPlugin(['build'], {
      verbose: true,
      dry: false
    })
    // new CopyWebpackPlugin([
    //   { from: './app/index.html', to: 'index.html' },
    // ])
  ]
};
