/*
 * @Date: 2022-11-08 15:51:48
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-10 09:02:08
 * @Description: 
 */
import http from '@/utils/request.js'
/**
 * @description: 系统管理获取列表
 * @param {*} name
 * @param {*} page
 * @param {*} size
 * @return {*}
 */
export const reqregulator = (name, page, size) => {
  return http({
    method: 'get',
    url: `/api/system/dept/`,
    params: {
      name,
      page,
      size,
    }
  })
}

/**
 * @description: 系统管理状态修改
 * @param {*} id
 * @param {*} status
 * @return {*}
 */
export const reqregulatorStatus = (id, status) => {
  return http({
    method: 'patch',
    url: `/api/system/dept/${id}/`,
    data: {
      status
    }
  })
}


export const reqregulatordel = (id) => {
  return http({
    method: 'delete',
    url: `/api/system/dept/${id}/`,
  })
}


export const reqregulatorEdit = (id, data) => {
  return http({
    method: 'put',
    url: `/api/system/dept/${id}/`,
    data
  })
}

export const reqregulatortree = () => {
  return http({
    method: 'get',
    url: `/api/system/dept_tree/`,
  })
}


export const reqregulatorAdd = (data) => {
  return http({
    method: 'post',
    url: `/api/system/dept/`,
    data
  })
}