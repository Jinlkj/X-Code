const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",// 基本路径
  outputDir: "dist",// 输出文件目录
  assetsDir: "static",//设置放置打包生成的静态资源 (js、css、img、fonts) 的目录。
  indexPath: 'index.html'//用于设定打包生成的 index.html 文件的存储位置
})
