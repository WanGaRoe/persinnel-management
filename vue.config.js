module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.105:8061',
        // target: 'http://192.168.1.243:10081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/WisdomPark/v2'
        }
      }
    }
  }
}
