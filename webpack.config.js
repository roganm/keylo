var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/frontend/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'src/frontend/public'),
        filename: 'bundle.js',
        publicPath: ''
    },
    devServer: {
        inline: true,
        contentBase: './src/frontend/public',
        port: 4000
    },
    module: {
        loaders: [
            {
                test: /\.svg$/, loader: 'svg-loader',
            },
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['latest', 'stage-0', 'react'],
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader',
            },
        ],
},
};
