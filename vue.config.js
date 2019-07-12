module.exports = {
  baseUrl:'/firm-app/',
  devServer: {
    port: 8090,
    proxy: {
      "/api": {
        secure: false,
        //target: 'http://192.168.1.144:8010',//'http://47.105.80.157:80',//设置你调用的接口域名和端口号 别忘了加http
        target: "http://192.168.1.126:8100",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
        cookiePathRewrite: "/"
      }
    }
  }
};
