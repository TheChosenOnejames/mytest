/*
 * @Date: 2022-11-15 10:08:05
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-16 15:15:02
 * @Description: 
 */
/**
 * @description: 系统菜单管理获取菜单列表数据
 * @return {*}
 */
import http from '@/utils/request.js'
export const reqMenuList = (name) => {
  return http({
    method: 'get',
    url: `/api/system/menu/`,
    params: {
      name,
    }
  })
}
/**
 * @description: 系统管理菜单管理删除
 * @return {*}
 */

export const reqDelMenuList = (id) => {
  return http({
    method: 'delete',
    url: `/api/system/menu/${id}`,
  })
}
/**
 * @description: 系统管理下拉获取树形结构数据
 * @return {*}
 */
export const reqMenutreeList = () => {
  return http({
    method: 'get',
    url: `/api/system/menu_tree/`,
  })
}

/**
 * @description:系统管理添加菜单
 * @param {*} data
 * @return {*}
 */
export const reqAddMenutList = (data) => {
  return http({
    method: 'post',
    url: `/api/system/menu/`,
    data
  })
}


export const reqEditMenutList = (id, data) => {
  return http({
    method: 'put',
    url: `/api/system/menu/${id}/`,
    data
  })
}