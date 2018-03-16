const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')//css引入js中
const htmlPlugin= require('html-webpack-plugin');//进行html压缩
module.exports = {
    entry:{
        main:'./src/main.js',
        entry:'./src/entry.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            }
        ]
    },
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        })
    ],
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的ip
        host:'localhost',
        //服务端是否开启
        compress:true,
        //端口号
        port:3030
    }
}