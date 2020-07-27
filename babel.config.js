module.exports = function (api) {
    api.cache(false);
    const presets = [
        // ["@babel/preset-typescript"],
        [
            "@babel/preset-env",
            {
                corejs: { version: 3 },
                useBuiltIns: "usage",

                // Commented out in favour of package.json config -
                // "browserslist": "> 0.25%, not dead",
                // targets: {
                //     edge: "17",
                //     firefox: "60",
                //     chrome: "67",
                //     safari: "11.1",
                //     ie: "11",
                // },
            },
        ],
    ];
    const plugins = [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        ["@babel/plugin-proposal-class-properties"],
        ["@babel/transform-runtime"],
        ["@babel/plugin-transform-modules-commonjs"],
    ];
    return {
        presets,
        plugins,
    };
};
