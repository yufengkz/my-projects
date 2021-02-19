'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const host = '0.0.0.0' // 设为0.0.0.0时主机支持被访问
const port = 1408 // dev port

module.exports = {
  // process.env.BASE_URL即publicPath。在@vue/cli-service/lib/util/resolveClientEnv.js中配置
  // 可以用绝对路径（/）和相对路径（''或'./'）
  publicPath: '/', // 若部署时在非根路径，需单独设置。如 /my-app/
  outputDir: 'manage', // 打包存放目录
  assetsDir: 'static', // 静态资源目录
  indexPath: 'index.html', // 默认值，打包生成后输出的index.html地址
  filenameHashing: true, // 默认值，文件名哈希。控制缓存
  // pages: {}, // 多页应用时配置

  // 通过 eslint-loader 在保存时触发校验。 error报错并编译失败，true编译警告，false关闭
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,

  runtimeCompiler: false, // 是否使用包含运行时编译器的Vue核心的构建
  transpileDependencies: [], // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  productionSourceMap: false, // 生产环境 sourceMap
  crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
  integrity: false, // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)

  // webpack的直接配置，类型为键值对象时会合并配置，类型为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: config => {
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      })
    )
  },

  // webpack 链式配置，用于对webpack进行更细粒度的修改
  // https://cli.vuejs.org/guide/webpack.html#chaining-advanced
  // 下方chainWebpack拷贝自vue-element-admin的配置
  chainWebpack(config) {
    config.resolve.alias.set('@', resolve('src'))

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: process.env.NODE_ENV !== 'development',

    // 是否构建sourceMap，false 将提高构建速度
    sourceMap: process.env.NODE_ENV === 'development',

    // css预设器配置项
    loaderOptions: {
      sass: {
        // 引入全局变量
        data: '@import "@/styles/variables.scss";'
      },
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    host, // 设为0.0.0.0时主机支持被访问
    port, // 端口
    open: true, // 启动后打开浏览器
    proxy: {
      // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
      '/api/ifpc': {
        // target: 'http://10.145.5.25:30015/', // 订单贷开发服务器 登录账号 18600793025 / aa123123
        target: 'http://10.145.5.25:32366/', // 订单贷测试服务器 登录账号 18600793025 / aa123123
        pathRewrite: {
          '^/api/ifpc': '/ifpc'
        }
      },
      '/mock-api/api/mock/markdown': {
        target: 'http://10.10.20.143:3000', // 订单贷测试服务器 登录账号 18600793025 / aa123123
        pathRewrite: {
          '^/mock-api/api/mock/markdown': '/markdown'
        }
      }
    },
    // Provides the ability to execute custom middleware after all other middleware internally within the server.
    before: require('./mock/mock-server.js'),
    // 浏览器显示报错（配合eslint使用）
    overlay: {
      warnings: true,
      errors: true
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
}
