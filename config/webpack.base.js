const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ApisWebpackPlugin = require("./plugins/apis-webpack-plugin")

function genWebpackConfig(mode) {
    return {
        mode: mode || 'development',
        entry: path.resolve(__dirname, '../docs/index.tsx'),
        // entry: path.resolve(__dirname, '../packages/@apis/react/index.tsx'),
        output: {
            path: path.resolve(__dirname, '../dist/docs'),
            // path: path.resolve(__dirname, '../dist/@apis/react'),
            filename: 'main.js',
        },
        watch: true,
        resolve: {
            extensions: ['.js', '.json', '.jsx', '.tsx', '.vue']
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|tsx)$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.less$/i,
                    use: ['style-loader', 'css-loader', 'less-loader']
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(jpg|png|gif|jpeg|svg)$/,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: './docs/public/index.html'
            }),
            new ApisWebpackPlugin()
        ],
        stats: {
            // preset: 'errors-only',
            preset: 'none',
            logging: 'info'
        }
    }
}

module.exports = genWebpackConfig