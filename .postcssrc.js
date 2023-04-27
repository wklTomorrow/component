module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750,  // 设计稿的宽度
      minPixelValue: 1,    // 最小像素值
    },
    // ... 其他插件
  }
}