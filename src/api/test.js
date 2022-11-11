/*
 * @Date: 2022-10-25 13:35:51
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-25 13:40:18
 * @Description: 
 */
import http from '@/utils/request.js'
export const reqtest = () => {
  return http({
    method: 'get',
    url: `/finance2redoc/`,
  })
}