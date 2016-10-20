const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  __ENV__                 : JSON.stringify('DEV'),
  __ONE_MONEY_ID__        : JSON.stringify(process.env.ONE_MONEY || 3), // 活动ID
  __QR_CODE__             : JSON.stringify(process.env.QRCODE || true), // 是否显示二维码
  // __HOME_IMG__            : JSON.stringify(process.env.HOMEIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/69ead15951e2096e29f1a57d16255d96.jpg'), // 首页图片
  __HOME_IMG__            : JSON.stringify(process.env.HOMEIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/ade983ee7db7041e5e7237b9c71ef0d7.jpg'), // 首页图片
  // __LIST_IMG__            : JSON.stringify(process.env.LISTIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/4b878ea97ce8d43d97eed22965ec6a73.jpg'),  // 列表图片
  __LIST_IMG__            : JSON.stringify(process.env.LISTIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/8611fe3864cae4024c05ef7fe2daef87.jpg'),  // 列表图片
  __DEFAULT_AVATAR__      : JSON.stringify(process.env.DEFAULTAVATAR || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/1/default_avatar.gif!avatar'),
  __SIGNUP_URL__          : JSON.stringify(process.env.SIGNURL || 'http://0.0.0.0:8080/users/sign_in'),
  __API__                 : JSON.stringify(process.env.APIURL || '/api/promotions/one_money'),
  __WINNERS_NUM__         : JSON.stringify(process.env.WINNERS || 50),
  __INTRODUCTION_LINK__   : JSON.stringify(process.env.INTRODUCTIONLINK || 'https://wap.koudaitong.com/v2/showcase/mpnews?alias=5nr3d4tc&spm=m1461292357652104565180197.scan.1449810565'),
  __INTRODUCTION_POSTER__ : JSON.stringify(process.env.INTRODUCTIONPOSTER || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/0c549461633e696a8841886a888b6a93.jpg'),
  __TIMESTAMP__           : JSON.stringify(process.env.TICK || new Date().getTime()),
  __GIFT_ITEM_LINK__      : JSON.stringify(process.env.GIFTITEMLINK || 'http://m.wanliu.biz/html/%E8%80%92%E9%98%B3%E8%A1%97%E4%B8%8A/gift-item/?itemId='),
  __SHOW_INTRODUCE__      : JSON.stringify(process.env.SHOWINTRODUCE || false),
  __COUPON_IMG_URL__       : JSON.stringify(process.env.COUPONIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/198/d0d4ae728d40d1660e428f0eb84e0d10.png'),
};

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8080,
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        secure: false,
        bypass: function bypass(req) {
          if (req.url.indexOf('/one_money/index.html') > -1) {
            return './index.html';
          }
        },
      }
    }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/one_money',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, include: path.resolve(__dirname, 'app'), loaders: ['style', 'css', 'postcss']},
      {test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel'},
      {test: /\.styl$/, include: path.resolve(__dirname, 'app'), loaders: ['style', 'css', 'postcss', 'stylus']},
      {test: /\.json$/, include: path.resolve(__dirname, 'app'), loaders: ['json']},
    ]
  },
  postcss: function postcss() {
    return [autoprefixer, precss];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    }),
    new webpack.DefinePlugin(config),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://0.0.0.0:8080/one_money/index.html' })
  ]
};
