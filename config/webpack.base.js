const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {ProgressPlugin} = require("webpack")
let progressPlugin = new ProgressPlugin({
  activeModules: true,         // 默认false，显示活动模块计数和一个活动模块正在进行消息。
  entries: true,  			 // 默认true，显示正在进行的条目计数消息。
  modules: false,              // 默认true，显示正在进行的模块计数消息。
  modulesCount: 5000,          // 默认5000，开始时的最小模块数。PS:modules启用属性时生效。
  profile: false,         	 // 默认false，告诉ProgressPlugin为进度步骤收集配置文件数据。
  dependencies: false,         // 默认true，显示正在进行的依赖项计数消息。
  dependenciesCount: 10000,    // 默认10000，开始时的最小依赖项计数。PS:dependencies启用属性时生效。
})

function genWebpackConfig(mode) {
  return {
    mode: mode || 'development',
    entry: path.resolve(__dirname, '../docs/index.tsx'),
    // entry: path.resolve(__dirname, '../packages/@apsc/react/index.tsx'),
    output: {
      path: path.resolve(__dirname, '../dist/docs'),
      // path: path.resolve(__dirname, '../dist/@apsc/react'),
      filename: 'main.js',
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.tsx', '.ts', '.vue']
    },
    // watch: true,
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|ts)$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/i,
          use: ['style-loader', 'css-loader', {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          }]
        },
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|png|gif|jpeg|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './docs/public/index.html'
      }),
      // new ApisWebpackPlugin(),
      progressPlugin
    ],
    stats: {
      // preset: 'errors-only',
      preset: 'none',
      logging: 'info'
    }
  }
}

module.exports = genWebpackConfig