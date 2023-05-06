const Webpack = require('webpack');
const genWebpackConfig = require('../config/webpack.base.js');
const commanLineArgs = require('minimist')(process.argv.slice(2))


var curFrame ;
function getFrame(args) {
    if (process.argv.slice(2).length == 0) {
       return 'react' 
    }
    const frames = ['react', 'vue', 'vue2']
    for(var i = 0; i < frames.length; i++) {
        if(args[frames[i]]) {
            return frames[i]
        }else {
            if(i > frames.length) {
                return null
            }
        }
    }
}
curFrame = getFrame(commanLineArgs)

const webpackConfig = genWebpackConfig()
const compiler = Webpack(webpackConfig);

const server = require('../config/webpack.devServer.js')
server(compiler).start()