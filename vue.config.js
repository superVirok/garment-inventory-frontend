const { defineConfig } = require('@vue/cli-service')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{

        $: 'jquery',

        jquery: 'jquery',

        jQuery: 'jquery',

        'window.jQuery': 'jquery'

    }])

  },
  // configureWebpack:  {
  //   resolve: {
  //     fallback: {
  //       fs: false,
  //       crypto: require.resolve("crypto-browserify")
  //     }
  //   },
  //   plugins: [new NodePolyfillPlugin()],
  // },

  devServer: {
    port: 8081, // 此处修改你想要的端口号
    // proxy:"http://localhost:8080"
    proxy: {
      '/cloth': {
        target: 'http://localhost:8080',
				pathRewrite:{'^/cloth':'/'},
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },
      // '/demo': {
      //   target: 'http://localhost:8081',
			// 	pathRewrite:{'^/demo':''},
      //   ws: true, //用于支持websocket
      //   changeOrigin: true //用于控制请求头中的host值
      // }
    }
  }
})
