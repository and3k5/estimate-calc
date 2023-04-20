const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function (env) {
    const configuration = /** @type {import("webpack").Configuration} */({
        entry: {
            app: {
                import: "./src/web",
            },
            calc: {
                import: "./src/lib",
                filename: "calc.js",
                library: {
                    name: "calc",
                    type: "commonjs2",
                }
            },
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            // alias: {
            //     vue: '@vue/compat'
            // }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        // compilerOptions: {
                        //     compatConfig: {
                        //         MODE: 2
                        //     }
                        // },
                    }
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
                // {
                //     test: /\.scss$/,
                //     use: [
                //       'vue-style-loader',
                //       'css-loader',
                //       'sass-loader'
                //     ]
                // },
                {
                    test: /\.(css|s(a|c)ss)$/i,
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
                                },
                                'sass-loader'
                            ]
                        },
                        {
                            use: [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ]
                        }
                    ],
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            clean: true,
        },
        optimization: {
            minimize: true
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                title: "Estimate Calc",
                template: "./src/web/index.ejs",
                inject: false,

                templateParameters: async (compilation, assets, assetTags, options) => {
                    return {
                        script: assets.js[0],
                    }
                }
            })
        ]
    });
    return configuration;
}

module.exports.createTestConfiguration = function () {
    return {
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
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