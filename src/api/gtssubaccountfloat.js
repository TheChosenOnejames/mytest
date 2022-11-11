/*
 * @Date: 2022-10-20 15:45:01
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-26 09:34:10
 * @Description: 
 */
import http from '@/utils/request.js'
/**
 * @description: 
 * @return {*}
 */
export const reqgtssubaccountfloat = (page,
  size, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/pnlrecord/GTS/upload/floating/`,
    params: {
      page,
      size,
      start_date: beginPubdate,
      finish_date: endPubdate
    }
  })
}


export const reqgtssubaccountfloatUpload = (data) => {
  return http({
    method: 'post',
    url: `/pnlrecord/GTS/upload/floating/`,
    headers: {
      "Content-type": "multipart/form-data"
    },
    data
  })
}