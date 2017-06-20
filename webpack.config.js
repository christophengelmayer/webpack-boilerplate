var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');
var SvgStore = require('webpack-svgstore-plugin');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        main: [
            './src/js/main.js',
            './src/scss/styles.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/assets/',
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },

            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1 
                            }
                        },
                        { 
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        },
                        { 
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            } 
                        }
                    ],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),

        new SvgStore({
            svgoOptions: {
                plugins: [ 
                    { removeTitle: true },
                ]
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['public'] }
            // proxy: 'http://example.dev'
        })
    ]
};

if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

