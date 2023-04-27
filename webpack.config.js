const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Manifest = require("./plugins/manifest");
const TerserPlugin = require("terser-webpack-plugin");
const px2vw = require("postcss-px-to-viewport");
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
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    px2vw({
                      viewportWidth: 750, // 视窗的宽度，对应设计稿的宽度
                      // viewportHeight: 1334, // 视窗的高度，对应设计稿的高度
                      unitPrecision: 3, // 指定单位转换后的保留小数位数
                      viewportUnit: "vw", // 转换成的视口单位，建议使用vw
                      selectorBlackList: [".ignore", ".hairlines"], // 需要忽略的样式选择器，保留px单位
                      minPixelValue: 1, // 不小于1px的不转换为视窗单位
                      mediaQuery: false, // 允许在媒体查询中转换px
                    }),
                  ];
                },
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: function () {
          //         return [
          //           px2vw({
          //             viewportWidth: 750, // 视窗的宽度，对应设计稿的宽度
          //             // viewportHeight: 1334, // 视窗的高度，对应设计稿的高度
          //             unitPrecision: 3, // 指定单位转换后的保留小数位数
          //             viewportUnit: "vw", // 转换成的视口单位，建议使用vw
          //             selectorBlackList: [".ignore", ".hairlines"], // 需要忽略的样式选择器，保留px单位
          //             minPixelValue: 1, // 不小于1px的不转换为视窗单位
          //             mediaQuery: false, // 允许在媒体查询中转换px
          //           }),
          //         ];
          //       },
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "less-loader" },
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: function () {
          //         return [
          //           px2vw({
          //             viewportWidth: 750, // 视窗的宽度，对应设计稿的宽度
          //             // viewportHeight: 1334, // 视窗的高度，对应设计稿的高度
          //             unitPrecision: 3, // 指定单位转换后的保留小数位数
          //             viewportUnit: "vw", // 转换成的视口单位，建议使用vw
          //             selectorBlackList: [".ignore", ".hairlines"], // 需要忽略的样式选择器，保留px单位
          //             minPixelValue: 1, // 不小于1px的不转换为视窗单位
          //             mediaQuery: false, // 允许在媒体查询中转换px
          //           }),
          //         ];
          //       },
          //     },
          //   },
          // },
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
