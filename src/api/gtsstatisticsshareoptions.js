/*
 * @Date: 2022-10-26 16:39:42
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-04 10:27:20
 * @Description: 
 */
import http from '@/utils/request.js'
import qs from 'qs'
export const reqgtsstatisticsshareoptionsUpload = (data) => {
  return http({
    method: 'post',
    url: `/pnlrecord/journal/options/upload/`,
    headers: {
      "Content-type": "multipart/form-data"
    },
    data
  })
}
/**
 * @description: 期货账户凭证(期权)计算接口
 * @param {*} beginPubdate
 * @param {*} endPubdate
 * @return {*}
 */
export const reqgtsstatisticsshareoptionsDate = (beginPubdate, endPubdate) => {
  return http({
    method: 'post',
    url: `/pnlrecord/journal/options/calculate/`,
    data: {
      start_date: beginPubdate,
      finish_date: endPubdate
    }
  })
}

export const reqgtsstatisticsshareoptions = (page,
  size, futures_account_code, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/pnlrecord/journal/options/download/`,
    params: {
      page,
      size,
      futures_account_code,
      start_date: beginPubdate,
      finish_date: endPubdate
    },
    paramsSerializer: params => {
      return qs.stringify(params, {
        arrayFormat: 'comma'
      })
    }
  })
}
/**
 * @description: 导出凭证
 * @return {*}
 */
export const reqfuturesList = (gg, beginPubdate, endPubdate) => {
  return http({
    method: 'post',
    url: `/pnlrecord/journal/options/download/`,
    withCredentials: false,
    data: {
      futures_account_code: gg,
      start_date: beginPubdate,
      finish_date: endPubdate
    },
    responseType: 'blob',
    crossOrigin: true
  })
}




