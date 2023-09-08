const PLUGIN_NAME = 'apis-webpack-plugin';
const chalk = require('chalk')
module.exports = class MyWebpackPlugin {
  apply(compiler) {
    // you can access Logger from compiler
    const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
    logger.log('log from compiler');
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      // you can also access Logger from compilation
      const logger = compilation.getLogger(PLUGIN_NAME);
      logger.info('log from compilation')
    });
  }
}