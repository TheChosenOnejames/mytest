/*
 * @Date: 2022-10-20 14:26:42
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-25 17:13:11
 * @Description: 
 */
import http from '@/utils/request.js'
/**
 * @description: 
 * @return {*}
 */
export const reqgtssubaccountcloseout = (page,
  size, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/pnlrecord/GTS/upload/settlement/`,
    params: {
      page,
      size,
      start_date: beginPubdate,
      finish_date: endPubdate
    }
  })
}
export const reqgtssubaccountcloseoutupload = (data) => {
  return http({
    method: 'post',
    url: `/pnlrecord/GTS/upload/settlement/`,
    headers: {
      "Content-type": "multipart/form-data"
    },
    data
  })
}