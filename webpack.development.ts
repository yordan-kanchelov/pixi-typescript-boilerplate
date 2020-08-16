import * as webpack from "webpack";
import * as path from "path";

import ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = (env: { mode: "development" | "production" }) => {
    /** @type {import('webpack').Configuration} */
    const devConfig = {
        mode: env.mode,

        devtool: "cheap-module-eval-source-map",

        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        fix: true,
                    },
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                    },
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "game.js",
            chunkFilename: "game-library.js",
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: "./src/**/*.{ts,tsx,js,jsx}",
                },
            }),

            new ForkTsCheckerNotifierWebpackPlugin({
                skipSuccessful: true,
            }),

            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),

            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(false),
                VERSION: JSON.stringify("3.0.0"), // TODO Update from package.json
            }),
        ],
    };

    return devConfig;
};
