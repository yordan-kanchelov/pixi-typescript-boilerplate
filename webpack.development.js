/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");

const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

module.exports = (env) => {
    const devConfig = {
        mode: env.mode,

        devtool: "inline-source-map",

        devServer: {
            open: true,
        },

        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),

            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "dev"),
            }),
        ],
    };

    return devConfig;
};
