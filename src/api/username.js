/*
 * @Date: 2022-11-01 11:13:23
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-09 09:21:03
 * @Description: 
 */
import http from '@/utils/request.js'
/**
 * @description: 添加用户搜索
 * @param {*} searchName
 * @return {*}
 */
export const requserName = (page,
  size, searchName) => {
  return http({
    method: 'get',
    url: `/api/system/usermanage/`,
    params: {
      page,
      size,
      name: searchName
    }
  })
}

export const reqdeluserName = (id) => {
  return http({
    method: 'delete',
    url: `/api/system/usermanage/${id}`,
  })
}

/**
 * @description: 添加select下拉角色
 * @param {*} searchName
 * @return {*}
 */
export const reqSelectrole = () => {
  return http({
    method: 'get',
    url: `/api/system/role/`,
  })
}
/**
 * @description: 添加select下拉部门
 * @param {*} 
 * @return {*}
 */
export const reqSelectdept = () => {
  return http({
    method: 'get',
    url: `/api/system/dept/`,
  })
}
/**
 * @description: 添加确定按钮
 * @param {*} 
 * @return {*}
 */
export const reqAddform = (data) => {
  return http({
    method: 'post',
    url: `/api/system/usermanage/`,
    data
  })
}
/**
 * @description: 修改
 * @param {*} 
 * @return {*}
 */

export const reqEdit = (id, data) => {
  return http({
    method: 'put',
    url: `/api/system/usermanage/${id}/`,
    data
  })
}
/* 普通用户 获取 */
export const requserNames = (page,
  size, searchName) => {
  return http({
    method: 'get',
    url: `/api/usermanage/usermanage/`,
    params: {
      page,
      size,
      name: searchName
    }
  })
}
//* 普通用户删除 */
export const reqdeluserNames = (id) => {
  return http({
    method: 'delete',
    url: `/api/usermanage/usermanage/${id}`,
  })
}



//普通用户添加
export const reqAddforms = (data) => {
  return http({
    method: 'post',
    url: `/api/system/usermanage/`,
    data
  })
}
//普通用户修改状态
export const reqEditActive = (id, is_active) => {
  return http({
    method: 'patch',
    url: `/api/usermanage/usermanage/${id}/`,
    data: {
      is_active,
    }
  })
}

export const reqEditActives = (id, is_active) => {
  return http({
    method: 'put',
    url: `/api/usermanage/usermanage/activeuser/${id}/`,
    data: {
      is_active,
    }
  })
}