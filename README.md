# webpack
## webpack entry output
## webpack.config.js  Configuration file for webpack
+ base structure (module.export)
  +  entry:{} 
  +  output:{}  
  +  module:{} //模块  
  +  plugins:[]//插件  
  +  devServer:{}//配置服务  
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
