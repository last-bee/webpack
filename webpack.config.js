const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var website = {
    publicPath:"http://192.168.10.163:1314/"
}
console.log( encodeURIComponent(process.env.type) );
module.exports = {
    entry:{
        entry:'./src/entry.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:5000,
                        outputPath:'images/..'
                    }
                }]
            },{
                test:/\.(htm|html$)/i,
                use:['html-withimg-loader']
            },{
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    use:[{
                        loader:'css-loader'
                    },{
                        loader:"less-loader"
                    }],
                    fallback:"style-loader"
                })
            }
        ]
    },
    plugins:[
        //new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes:true 
            },
            hash:true,
            template:'./src/index.html'
        }),
        new ExtractTextPlugin("css/index.css")
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.10.163',
        compress:true,
        port:1314
    }
}