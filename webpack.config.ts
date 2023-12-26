/* eslint-disable */

const path = require("path");

const merge = require("webpack-merge").merge;

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env: { mode: "development" | "production" }) => {
    const config = {
        entry: "./src/index.ts",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        plugins: [
            new HtmlWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: "assets/**",

                        // if there are nested subdirectories , keep the hierarchy
                        to({ absoluteFilename }: { absoluteFilename: string }) {
                            const assetsPath = path.resolve(__dirname, "assets");

                            if (!absoluteFilename) {
                                throw Error();
                            }

                            const endPath = absoluteFilename.slice(assetsPath.length);

                            return Promise.resolve(`assets/${endPath}`);
                        },
                    },
                ],
            }),
        ],
    };
    const isDev = env.mode === "development";
    const webpackConfigFile = isDev ? "webpack.dev.ts" : "webpack.prod.ts";
    const envConfig = require(path.resolve(__dirname, webpackConfigFile))();

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};
