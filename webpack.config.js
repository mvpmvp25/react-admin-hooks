const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isLocal = process.env.SERVER_TYPE == 'local';

module.exports = {
  entry: './src/index.js',
  mode: isLocal ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-[hash:8].bundle.js',
    chunkFilename: 'js/[name]-[hash:8].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      server: path.resolve(__dirname, './src/server'),
      style: path.resolve(__dirname, './src/style'),
      utils: path.resolve(__dirname, './src/utils'),
      config: path.resolve(__dirname, './src/config'),
      routes: path.resolve(__dirname, './src/routes')
    }
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    host: 'localhost',
    port: 8063,
    proxy: {
      '/api': {
        changeOrigin: true,
        // pathRewrite: { "^/api": "/" } 重写路径 匹配 /api ，然后变为''
        //target: "https://api.eatojoy.com", // 生产环境
        target: 'http://eatojoy-api.hktester.com' // 测试环境
        // target: "http://eatojoy-api.dd01.fun"
      }
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        // exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/array-move')
        ],
        loader: 'babel-loader'
      },
      // {
      // 	test: /\.css$/,
      // 	use: [
      // 		{
      // 			loader: MiniCssExtractPlugin.loader,
      // 			options: {
      // 				//publicPath: '../'
      // 				hmr: true
      // 			}
      // 		},
      // 		'css-loader'
      // 	],
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/routes'),
          path.resolve(__dirname, 'src/style')
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isLocal
              // reloadAll: true,
              // publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        // antd样式、style/main.scss不需要css module 所以另行处理
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/main.scss')
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isLocal
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader', // 同时需要安装file-loader
            options: {
              esModule: false,
              limit: 5000,
              name: 'resource/[name].[hash:8].[ext]'
              //outputPath: './'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'xxx',
      favicon: 'favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['SERVER_TYPE']),
    // new webpack.DefinePlugin({
    // 	SERVER_TYPE: JSON.stringify("prod")
    // })
    // new webpack.optimize.UglifyJsPlugin({
    // 	//sourceMap: false, // 打包时是否生成map文件
    // 	exclude: /react-native-webview-events/
    // })
    new MiniCssExtractPlugin({
      // 【bug】無法生成chunk css https://github.com/webpack-contrib/mini-css-extract-plugin/issues/147
      filename: isLocal ? 'css/[name].css' : 'css/[name]-[contenthash:8].css',
      chunkFilename: isLocal ? 'css/[id].css' : 'css/[id]-[contenthash:8].css'
    })
  ]
};
