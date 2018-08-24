// 使用严格模式
'use strict'


console.log("--#################### build.js ####################")
console.log('1、使用严格模式编译！')

// 引入check-versions.js文件
require('./check-versions')()
console.log('2、引入版本检查脚本')

// 引入必要的模块
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
console.log('3、引入必要的核心模块：ora、rimraf、path、chalk、webpack')

const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
console.log('4、引入配置：config、webpack.prod.conf')

var connect = require('connect');
var serveStatic = require('serve-static')

console.log('5、使用ora参数：【' + 'building for ' + process.env.env_config + ' environment...】')
const spinner = ora('building for ' + process.env.env_config + ' environment...')
spinner.start()

console.log('6、删除 ../dist/static 目录')
// 删除 ../dist/static目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  // 开始打包
  console.log('7、开始打包 webpack， 使用配置webpackConfig')
  console.log(chalk.cyan('8、正在打包 ..............................'))
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' Build complete.\n'))
    console.log(chalk.yellow(
      ' Tip: built files are meant to be served over an HTTP server.\n' +
      ' Opening index.html over file:// won\'t work.\n'
    ))

    if (process.env.npm_config_preview) {
      const port = 9526
      const host = "http://localhost:" + port
      const basePath = config.build.assetsPublicPath
      const app = connect()

      app.use(basePath, serveStatic('./dist', {
        'index': ['index.html', '/']
      }))

      app.listen(port, function () {
        console.log(chalk.green(`> Listening at  http://localhost:${port}${basePath}`))
      });
    }
  })
})
