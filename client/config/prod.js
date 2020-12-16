/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-12-15 17:21:22
 * @LastEditTime: 2020-12-15 17:42:31
 * @FilePath: /huaJi/config/prod.js
 */
/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
