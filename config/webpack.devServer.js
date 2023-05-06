const path = require("path")
const WebpackDevServer = require('webpack-dev-server')

const devServerOptions = { 
    static:{
        directory: path.join(__dirname, "../packages/docs/public"),
    },
    open: false,
    client: {
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
        console.log('server is staring >>>>', port);
    },
}

const server = (compiler) => {
    return new WebpackDevServer(devServerOptions, compiler);
}


module.exports = server