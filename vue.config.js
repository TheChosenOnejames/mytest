/*
 * @Date: 2022-06-08 10:05:56
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-07-21 10:33:56
 * @Description:
 */
module.exports = {
  lintOnSave: false,
  devServer: {
    // 端口号
    // 配置是否自动启动浏览器
    open: true,
    https: false,
    /*     proxy: {
          // 代理
          "/task/": {
            target: "http://10.66.128.87:8000/", //要代理访问的路径
            changeOrigin: true,
            pathRewrite: {
              "^/task/": ""
            }
          },
          "/bank/": {
            target: "http://10.66.128.87:8000/", //要代理访问的路径
            changeOrigin: true,
            pathRewrite: {
              "^/bank/": ""
            }
          },
          "/pnlrecord/AMM/futures/": {
            target: "http://10.66.128.87:8000/", //要代理访问的路径
            changeOrigin: true,
            pathRewrite: {
              "^/pnlrecord/AMM/futures/": ""
            }
          },
                "/pnlrecord/AMM/options/": {
                  target: "http://10.66.128.87:8000/", //要代理访问的路径
                  changeOrigin: true,
                  pathRewrite: {
                    "^/pnlrecord/AMM/options/": ""
                  }
                }, 
        } */
  }
};
