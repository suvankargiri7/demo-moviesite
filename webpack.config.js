const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const isProd = process.env.NODE_ENV === "production";
console.log("is env production", isProd);
const currentPath = path.join(__dirname);
const basePath = currentPath + "/environment/";
// We're concatenating the environment name to our filename to specify the correct env file!
const envPath = basePath + "." + (isProd ? "env" : "env.development");
const fileEnv = dotenv.config({ path: envPath }).parsed;

// reduce it to a nice object, the same as before (but with the variables from the file)
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});

// Set the path parameter in the dotenv config

const config = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    filename: "[name]-[chunkhash]-bundle.js",
    chunkFilename: "[name]-[chunkhash]-chunk.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream",
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|woff|woff2|png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  stats: {
    usedExports: true,
    providedExports: true,
    env: true,
  },
};

if (isProd) {
  config.optimization = {
    minimize: true,
  };
} else {
  config.devServer = {
    port: 9000,
    open: true,
    hot: false,
    compress: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: "./src/static",
    },
  };
}

module.exports = config;
