const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

console.log(process.env["NODE_ENV"]);

const rules = (process.env["NODE_ENV"] === "dev-auto-reload")
    ? []
    : [{test: path.resolve(__dirname, 'node_modules/webpack-dev-server/client'), loader: "null-loader"}]

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: rules
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src/webpage'),
        compress: true,
        port: 3001,
        headers: { "Access-Control-Allow-Origin": "*" },
        historyApiFallback: {
            disableDotRule: true
        }
    },
    plugins: [
        
    ]
});
