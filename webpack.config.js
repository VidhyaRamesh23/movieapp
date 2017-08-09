const HtmlPlugin = require('html-webpack-plugin')
module.exports = {

    entry: './client',

    output: {
        filename: 'bundle.js',
        path: 'dist'
    },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader",
            include: [/flexboxgrid/, /react-select/]
        }]
    },

    plugins: [
        new HtmlPlugin({
            template: 'public/index.html'
        })
    ]
}