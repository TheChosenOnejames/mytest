/*
 * @Date: 2022-06-08 08:55:57
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-11 09:44:33
 * @Description: 
 */
// 这个模块, 对于axios进行二次封装, 可以方便的进行自定义axios
import axios from 'axios'
import Vue from 'vue';
import ElementUI from 'element-ui';
// 创建自定义的axios实例, 方便自定义配置 (为了得到一个你的axios)
const http = axios.create({
  baseURL: 'http://10.66.128.87:8000/', // 基础地址
  // baseURL: 'http://172.16.1.89:8000/',
  timeout: 80000, // 配置请求等待延时
  /*   headers: {
      "Content-type": "multipart/form-data"
    }, */
})
http.defaults.headers = {
  'Content-Type': 'application/json;'
}
// http request 拦截器 添加一个请求拦截器
/* http.interceptors.request.use((config) => {
  // config 是 axios 配置对象

  if (localStorage.token) {
    config.headers.Authorization = 'jwt ' + localStorage.token.replace(/\"/g, "");
    console.log(localStorage.token, 'rtr');
  }
  return config;
}, (error) => {
  // 请求出错
  return Promise.reject(error);
}); */
// http response 拦截器 添加一个响应拦截器
/* http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('对响应数据做点什么')
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log(ElementUI)
  //Message 消息提示
  //Notification 通知
  ElementUI.Message({
    title: '警告',
    message: '服务器异常',
    type: 'warning'
  });
  //MessageBox 弹框
  return Promise.reject(error);
}); */
export default http
