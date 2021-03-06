const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve('./src/app/App-Main.tsx')
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].bundle.map",
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader", 
                        options: { transpileOnly: true }
                    },
                    "source-map-loader"
                ]
            },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
            { test: /\.glsl$/, loader: 'raw-loader'}
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "lib": path.resolve(__dirname, '../src/lib/')
        }
    },
    plugins: [

        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/webpage/index.html'),
            hash: true,
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env['NODE_ENV'])
            }
        }),
        new ForkTsCheckerWebpackPlugin()
    ],


};
