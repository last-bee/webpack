# webpack
## webpack entry output
## webpack.config.js  Configuration file for webpack
+ base structure (module.export)
  +  entry:{} 
  +  output:{}  
  +  module:{} //模块 
  +  plugins:[]//插件 
  +  devServer:{}//配置服务  
## webpack的文件配置分析
* 主要对开发环境与生产环境以及打包相关的文件进行分析 
* pageage.json中的script字段
``` javascript
   "scripts": {
      "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "build": "node build/build.js"
  },
```
* dev为开发环境
* build 为生产环境

***
### 生产环境与开发环境的区别
* 开发环境(development)和生产环境(production)的构建目标差异很大。  
* 在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。 
* 而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。  
* 由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。
***
### build文件分析
+ build/webpack.dev.conf.js （dev执行的js）
  + 引入相关的插件  
  + 生成处理各种样式规则
  + 配置开发环境
  


### webpack src/....
```
const path = require('path')
### webpack src/....
```
const path = require('path')
const glob = require('glob')
const uglify = require('uglifyjs-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCssPlugin = require('purifycss-webpack')
var website = {
  publicPath:'http://192.168.10.191:1314/'
}

module.exports = {
  devtool:'source-map',
  entry:{
    entry: './src/entry.js',
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
    publicPath:website.publicPath
  },
  module: {
    rules:[
      {
        test:/\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader:"css-loader",
            options:{importLoaders: 1}
          }, {
            loader: 'postcss-loader'
        }]
        })
      },{
        test:/\.(png|jpg|gif)/,
        use:[{
          loader:'url-loader',
          options:{
            limit:10000,
            outputPath:'images/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test:/\.less$/,
        use:extractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader:"css-loader"
          },{
            loader:"less-loader"
          }, {
            loader: 'postcss-loader'
          }
        ]
        })
      },{
        test:/\.(js|jsx)$/,
        use:{
          loader:'babel-loader'
        },
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    //new uglify(),
    new htmlplugin({
      minify:{
        removeAttributeQuotes:true,
      },
      hash:true,//引用js缓存 
      template:'./src/index.html'
    }),
    new extractTextPlugin('css/index.css'),
    new PurifyCssPlugin({
      paths:glob.sync(path.join(__dirname,'src/*.html'))
    })
  ],
  devServer:{
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.10.191',
    compress: true,
    port: 1314
  }
}
```
