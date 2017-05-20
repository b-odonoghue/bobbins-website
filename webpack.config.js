module.exports = {
    entry: ['./lib/public/js/index.tsx'],
    output: {
        filename: './dist/public/js/bundle.js'
    },
    exclude: [],
    devtool: "source-map",
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ],
        rules: [
            // {
                // test: /\.json$/,
                // use: 'json-loader'
            // }
        ]
    },
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    }
};