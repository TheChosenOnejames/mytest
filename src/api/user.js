/*
 * @Date: 2022-06-13 08:56:40
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-04 14:11:40
 * @Description: 
 */

// 这个文件内, 存放的是所有用户相关的请求
import http from '@/utils/request.js'
/*
 * axios({
 *   method: 请求方式,
 *   url: 请求地址,
 *   data: 请求体中的参数,  post/patch/put
 *   params: 拼接在地址栏的参数,  get/delete
 *   headers: 请求头 (token令牌)
 * })
*/

// 一旦封装好了, 将来一旦接口路径发生变化, 也只需要修改这个模块中的代码即可
/**
 * 用户登录请求
 */
export const reqUserLogin = (username, password) => {
  return http({
    method: 'post',
    url: 'api/token/',
    data: {
      username, password
    }
  })
}

// 文档注释 jsDoc, /** + 回车
/**
 * 请求用户信息
 */
export const reqGetUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    // 配置请求头, 在请求头中, 需要传递token参数(令牌) => 用于身份认证
    headers: {
      // Authorization: '登录后, 后台给你派发的token值'
      // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQwOTgyMjgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EAylcXmSdQt1VmrU6pDQm0X02OK_irP0GBaJ5m2Bj4c'
      Authorization: `Bearer ${userInfo.token}`
    }
  })
}
/**
 * @description: 首页待办获取数据
 * @return {*page, size}
 */
export const reqgetList = (page, size, task_content, beginPubdate,
  endPubdate) => {
  return http({
    method: 'get',
    url: `/api/task/`,
    params: {
      page,
      size,
      task_content,
      task_create_time: beginPubdate,
      task_finish_time: endPubdate
    }
  })
}
/**
 * @description: 首页待办删除
 * @return {*id}
 */
export const reqDelBacklog = (id) => {
  return http({
    method: 'delete',
    url: `/api/task/${id}`,
  })
}

/**
 * @description: 首页待办
 * @return {*id}
 */
export const reqEditDiaBacklog = (id) => {
  return http({
    method: 'get',
    url: `/api/task/${id}/`,
  })
}

/**
 * @description: 首页待办修改按钮
 * @return {*id}
 */
export const reqEditlog = (id, data) => {
  return http({
    method: 'put',
    url: `/api/task/${id}/`,
    data
  })
}
/**
 * @description: 首页待办修改按钮
 * @return {*id}
 */
export const reqEditBacklog = (id, task_status) => {
  return http({
    method: 'put',
    url: `/api/task/${id}/`,
    data: {
      task_status
    }
  })
}
/**
 * @description: 添加待办
 * @return {*data}
 */
export const reqAddUser = (data) => {
  return http({
    method: 'post',
    url: `/api/task/`,
    data
  })
}


