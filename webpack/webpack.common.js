const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
    entry: {
        "/js/root_for_chat_component": path.join(
            srcDir,
            "root_for_chat_component.tsx"
        ),
        "/js/popup": path.join(srcDir, "popup.tsx"),
        "/js/options": path.join(srcDir, "options.tsx"),
        "/js/background": path.join(srcDir, "background.ts"),
        "/js/content_script": path.join(srcDir, "content_script.tsx"),
        "/css/app": path.join(srcDir, "/assets/scss/config/default/app.scss"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== "background";
            },
        },
    },
    node: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer(), cssnano()],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(gif|svg|jpg|jpeg|png|mp3)$/i,
                use: ["file-loader"],
            },
            // {
            //     test: /\.(mp3|gif)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //         },
            //     ],
            // },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        //alias: { 'react': path.resolve(__dirname), './node_modules', 'react' }
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./**",
                    to: path.join(__dirname, "../dist"),
                    context: "public",
                },
            ],
            options: {},
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        // new webpack.ProvidePlugin({
        //     react: "react",
        // }),
    ],

    // externals: {
    //     "react-native": true,
    // },
};
