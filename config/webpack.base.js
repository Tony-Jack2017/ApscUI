const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

function genWebpackConfig(mode) {
    return {
        mode: mode || 'development',
        entry: path.resolve(__dirname, '../packages/docs/index.tsx'),
        output: {
            path: path.resolve(__dirname, '../dist/docs'),
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
                template: './packages/docs/public/index.html'
            })
        ],
        optimization: {

        }
    }
}

module.exports = genWebpackConfig