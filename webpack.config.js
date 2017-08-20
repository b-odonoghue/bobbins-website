const path = require("path");

module.exports = {
    entry: ['./lib/public/js/index.tsx'],
    output: {
        filename: './dist/public/js/bundle.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [
                    /lib\/tests/,
                    /lib\/test-portal\/elasticsearch/,
                    /lib\/test-portal\/server/
                ],
                loader: "ts-loader"
            },
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            }
        ]
    }
};