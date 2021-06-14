const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssStractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin'); 
const MinifyPlugin = require('babel-minify-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
 
module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    resolve : {
        extensions: ['.ts', 'js', '.json']
    },
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
    },
    output: {
        filename: '[contenthash].main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                //use: {
                //    loader: 'babel-loader',
                //    options: {
                //      presets: ['@babel/preset-env'],
                //      plugins: [
                //          ["@babel/plugin-proposal-class-properties"],
                //          ["@babel/plugin-transform-async-to-generator"],
                //          ["@babel/plugin-transform-runtime"],
                //          ["@babel/plugin-proposal-private-methods"],
                //          ["@babel/plugin-proposal-private-property-in-object"]
                //        ]
                //    }
                //  }
            },
            {
               test:/\.css$/,
               exclude: /styles\.css$/,
               use: [
                   'style-loader',
                   'css-loader'
               ]
            },
            {
                test:/styles\.css$/,
                use: [
                     MiniCssStractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: true
                },
            },
            {
                test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssStractPlugin({
            filename: '[contenthash].[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin([{
            from: 'src/assets', to: 'assets/'
        }]),
        new MinifyPlugin(

        ),
        new CleanWebpackPlugin(

        )
    ]
 
    
}
 