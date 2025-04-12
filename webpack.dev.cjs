const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

module.exports = () => {
    const devConfig = {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            open: true,
            client: {
                overlay: {
                    warnings: false,
                    errors: true,
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/, // include .js files
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
            new ESLintPlugin({
                emitError: true,
                emitWarning: true,
                failOnError: false,
                failOnWarning: false,
            }),
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "-d"),
            }),
        ],
    };

    return devConfig;
};
