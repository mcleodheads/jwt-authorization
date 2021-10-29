const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {path: path.join(__dirname, "build"), filename: "index.bundle.js"},
    devtool: 'inline-source-map',
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".js", ".jsx", ".css"],
        alias: {
            style: path.resolve(__dirname, 'src', 'assets', 'styles')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(s*)css$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        })
    ],
};