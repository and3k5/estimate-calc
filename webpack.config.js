const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            "vue-style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: true
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            'vue-style-loader',
                            'css-loader'
                        ]
                    }
                ],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "Estimate Calc",
            template: "./src/web/index.ejs"
        })
    ]
}