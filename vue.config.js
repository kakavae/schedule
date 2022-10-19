const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // pages: {
  //   index: {
  //     // 入口文件
  //     entry: 'src/peiqi.js'
  //   }
  // },
  // 在保存的时候不要lint代码
  lintOnSave: false,
  // 配置代理服务器的位置，当前的服务器请求不到的静态资源就通过代理服务器到下面指定的服务器去请求
  // 这里配置的服务器就是开发环境下资源所在的服务器
  // 本质：axios向当前代理服务器请求资源，代理服务器和网页资源在一个服务器(协议，域名，端口号都一致)下所以不存在跨域问题，在代理服务器请求不到的资源就会通过服务器之间http通信的方式(服务器之间通信也没有跨域问题)去指定的服务器请求资源，请求到之后返回到代理服务器，再返回到ajax请求所在的资源位置，解决跨域问题
  // 缺点：会请求静态资源，然后再向指定的服务器请求资源
  // 缺点2：暂时只能向一个服务器做代理
  /*   devServer: {
    proxy: 'http://localhost:5000'
  } */
  // 方式二，根据请求的开头，匹配不同的请求路径
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/car': {
        target: 'http://localhost:5001',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/car': '' }
      }
    }
  }
})
