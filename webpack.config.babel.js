import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProductionBuild = process.env.NODE_ENV === "production";

const config = {
    context: __dirname + "/src",
    entry: "index.js",
    output: {
        path: __dirname + "/build",
        filename: "build.js",
        publicPath: "/"
    },
    resolve: {
        modules: ["node_modules", __dirname + "/src"],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"' + process.env.NODE_ENV + '"' // eslint-disable-line
            }
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "markup/index.template.html"
        })
    ]
};

if (isProductionBuild) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                passes: 2,
            }
        })
    );
} else {
    config.devtool = "#source-map";
}

module.exports = config;
