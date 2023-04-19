const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function (env) {
    const webApp = {
        entry: "./src",
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    loader: "ts-loader"
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
    };
    const lib = {
        entry: "./src/lib",
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
            ]
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'calc.js',
            library: {
                name: "calc",
                type: "commonjs2",
            },
        },
        optimization: {
            minimize: true
        },
    };
    return [webApp, lib];
}

module.exports.createTestConfiguration = function () {
    return {
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
            ]
        }
    };
}