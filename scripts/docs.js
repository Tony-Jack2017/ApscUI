const Webpack = require('webpack');
const genWebpackConfig = require('../config/webpack.base.js');


const webpackConfig = genWebpackConfig()
const compiler = Webpack(webpackConfig,(err, stats)=>{
    if(err || stats.hasErrors()) {
        console.log(stats.hasErrors())
    }else {
        console.clear()
    }
});

const server = require('../config/webpack.devServer.js')
server(compiler).start()