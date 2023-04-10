const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Manifest = require("./plugins/manifest");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  target: "web",
  entry: {
    main: "./src/main.js",
    react: "./src/react/index",
    test: "./src/js/test.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]/index.js",
  },
  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.vue$/,
        enforce: "pre",
        use: ["inject-vue"],
      },
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {},
        },
      },
      {
        test: /\.jsx|\.tsx$/,
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
        exclude: /\.module\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.module\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.png$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "main.html",
      chunks: ["main"],
      inject: "body",
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
    new CopyPlugin({
      patterns: [
        {
          from: "src/js",
          to: "./js",
          globOptions: {
            dot: true,
            gitignore: false,
          },
        },
      ],
    }),
    new Manifest(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    port: 1000,
    hot: true,
    static: {
      directory: path.join(__dirname, "/dist"),
    },
  },
};
