import * as path from "path";
import * as webpack from "webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

module.exports = (env: { mode: "development" | "production" }) => {
    return {
        mode: env.mode,

        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        emitError: true,
                        emitWarning: true,
                        failOnError: true,
                        failOnWarning: true,
                    },
                },
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
                VERSION: JSON.stringify("3.0.0"), // TODO Update from package.json
            }),

            new webpack.ProgressPlugin(),
        ],

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        mangle: true,
                        toplevel: true,
                        keep_classnames: false,
                        keep_fnames: true,
                    },
                }),
            ],
        },
    };
};
