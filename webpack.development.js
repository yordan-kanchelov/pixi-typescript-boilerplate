const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    /** @type {import('webpack').Configuration} */
    const devConfig = {
        mode: env.mode,

        devtool: "inline-source-map",

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "game.js",
            chunkFilename: "game-library.js",
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),

            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(false),
                VERSION: JSON.stringify("test-version"), // TODO Update from package.json
            }),
        ],
    };

    return devConfig;
};
