var webpack = require('webpack');
var path = require('path');

module.exports = function (env) {
    return {
        entry: {
            'main': './demo/main.ts'
        },

        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules']
        },

        module: {
            exprContextCritical: false,
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
            ]
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['main']
            })
        ],

        devtool: 'source-map',

        output: {
            filename: '[name].js',
            path: path.resolve('./dist')
        },

        devServer: {
            port: 3760,
            contentBase: "demo",
            historyApiFallback: true
        }
    };
}