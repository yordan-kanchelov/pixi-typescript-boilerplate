const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

module.exports = () => {
    return {
        mode: "production",

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/, // include .js files
                    use: [
                        {
                            loader: "babel-loader",
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx|ts|tsx)$/, // include .js files
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "game.[contenthash].js",
        },

        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),

            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "-r"),
            }),

            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
                emitError: true,
                emitWarning: true,
                failOnError: true,
                failOnWarning: true,
            }),

            new webpack.ProgressPlugin(),
        ],
    };
};
