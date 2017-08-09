module.exports = {
    entry: './src/frontend/scripts/index.js',
    output: {
        path: __dirname,
        filename: './src/frontend/public/bundle.js',
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
                    presets: ['es2015', 'react'],
                },
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader',
            },
        ],
},
};
