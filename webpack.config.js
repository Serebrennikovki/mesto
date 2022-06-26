const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: './src/pages/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.[contenthash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
    }),
        new MiniCssExtractPlugin(
            {filename: 'main.[contenthash].css',}
    )],
    devServer: {
        static:{
            directory: path.join(__dirname, 'dist'),
        },
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use:  'babel-loader',            
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,
                        { loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            },
                        },
                     'postcss-loader',
            ],
            },{
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',   
                generator: {
                    filename: 'images/[name][ext]'
                  }  
            },
        ]
    },
    //devtool: 'source-map'
};