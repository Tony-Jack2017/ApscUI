const path = require("path")
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const devServerOptions = {
    static:{
        directory: path.join(__dirname, "../packages/docs/public"),
    },
    open: false,
    client: {
        progress: true,
        overlay: {
            errors: true,
            warnings: false
        },
    },
    compress: true,
    onListening: function (devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        console.clear()
        const port = devServer.server.address().port;
        console.log(chalk.bgHex('#B7EAB6').black('Successfully') + 'server is staring :', port);
    },
}
const server = (compiler) => {
    return new WebpackDevServer(devServerOptions, compiler);
}


module.exports = server