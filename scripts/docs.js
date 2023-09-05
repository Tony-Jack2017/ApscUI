const Webpack = require('webpack');
const genWebpackConfig = require('../config/webpack.base.js');
const commonLineArgs = require('minimist')(process.argv.slice(2))

console.log('🚚 🔵')

var curFrame;
function getFrame(args) {
    if (process.argv.slice(2).length === 0) {
        return 'react'
    }
    const frames = ['react', 'vue', 'vue2']
    console.log()
    for (var i = 0; i < frames.length; i++) {
        if (args[frames[i]]) {
            return frames[i]
        } else {
            if (i > frames.length) {
                return null
            }
        }
    }
}
curFrame = getFrame(commonLineArgs)

const webpackConfig = genWebpackConfig()
const compiler = Webpack(webpackConfig);

// compiler.run((err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.log("errors:")
//         console.log(stats.errors)
//         console.log(err)
//     }

//     compiler.close((closeErr) => {
//         console.log(closeErr)
//     });
// });

const server = require('../config/webpack.devServer.js')
server(compiler).start()