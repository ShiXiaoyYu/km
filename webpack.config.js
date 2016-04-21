/**
 * Created by Administrator on 2016/2/24.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH =path.resolve(ROOT_PATH,'build');
module .exports = {
    entry:APP_PATH,
    output:{
        path:BUILD_PATH,
        filename:'bundle.js'
    },
    plugins:[
        new HtmlwebpackPlugin({
            title:'hello word app'
        })
    ],
    module:{
        loaders:
            [{
                test:/\.css$/,
                loader: "style-loader!css-loader",
                include:APP_PATH
            }
            ,{
                test:/\.jsx?$/,
                loader:'babel',
                includes:APP_PATH,
                query:{
                    presets:['es2015','react','stage-0']
                }

            },{
                test:/\.scss$/,
                loaders:['style','css','sass']
            }
            ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'eval-source-map',
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true
    /*  ,
        proxy: {
            '/api/!*': {
                target: 'http://z005.kmtongji.com',
                secure: false
            }
        }*/
    }
};


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var reduxSrc = path.join(__dirname, '..', '..', 'src');
var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules');
var fs = require('fs');
if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
    // Resolve Redux to source
    module.exports.resolve = { alias: { 'redux': reduxSrc } };
    // Our root .babelrc needs this flag for CommonJS output
    process.env.BABEL_ENV = 'commonjs';
    // Compile Redux from source
    module.exports.module.loaders.push({
        test: /\.js$/,
        loaders: [ 'babel' ],
        include: reduxSrc
    })
}


