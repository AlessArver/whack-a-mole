const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "/public")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "awesome-typescript-loader", exclude: "/node_modules/" },
            { test: /\.(gif|png|jpe?g|svg|xml)$/i, use: "file-loader" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
//# sourceMappingURL=webpack.config.js.map