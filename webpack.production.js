const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.mode,

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "game.[hash].js",
            chunkFilename: "game-library.[contenthash].js",
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[hash].css",
            }),

            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/i,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            }),

            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                VERSION: JSON.stringify("prod-version"), // TODO Update from package.json
            }),

            new webpack.ProgressPlugin(),
        ],
    };
};
