const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Manifest = require("./plugins/manifest");
module.exports = {
  target: "web",
  entry: {
    main: "./src/main.js",
    react: "./src/react/index",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]/index.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.jsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.png$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "main.html",
      chunks: ["main"],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "react/react.html",
      chunks: ["react"],
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src/html",
          to: "./html",
          globOptions: {
            dot: true,
            gitignore: false,
          },
        },
      ],
    }),
    new Manifest(),
  ],
  devServer: {
    port: 1000,
    hot: true,
    static: {
      directory: path.join(__dirname, "/dist"),
    },
  },
};
