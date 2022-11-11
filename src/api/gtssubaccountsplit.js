/*
 * @Date: 2022-10-26 10:05:37
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-26 15:38:42
 * @Description: 
 */
import http from '@/utils/request.js'
export const reqgtssubaccountSplit = (page,
  size, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/pnlrecord/GTS/subaccount-data/`,
    params: {
      page,
      size,
      start_date: beginPubdate,
      finish_date: endPubdate
    }
  })
}
export const reqgtssubaccountSplitdate = (beginPubdate, endPubdate) => {
  return http({
    method: 'post',
    url: `/pnlrecord/GTS/subaccount-data/`,
    data: {
      start_date: beginPubdate,
      finish_date: endPubdate
    }
  })
}
export const reqgtssubaccountexport = (beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/pnlrecord/GTS/subaccount-data/download/`,
    params: {
      start_date: beginPubdate,
      finish_date: endPubdate
    },
    header: {
      headers: { 'Content-Type': 'application/x-download' }
    },
    responseType: 'blob'
  })
}