/*
 * @Date: 2022-11-03 15:29:01
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-11 13:56:03
 * @Description: 
 */
import http from '@/utils/request.js'
import qs from 'qs'
/**
 * @description: wind获取列表数
 * @param {*} beginPubdate
 * @param {*} endPubdate
 * @return {*}
 */
export const reqWindData = (page,
  size, beginPubdate, endPubdate, value3) => {
  return http({
    method: 'get',
    url: `/external/wind-trade/`,
    params: {
      page,
      size,
      start_date: beginPubdate,
      finish_date: endPubdate,
      instrument_type: value3
    },
    paramsSerializer: params => {
      return qs.stringify(params, {
        arrayFormat: 'comma'
      })
    }
  })
}
/**
 * @description: wind数据同步
 * @param {*} date
 * @return {*}
 */
export const reqWindDate = (date) => {
  return http({
    method: 'post',
    url: `/external/wind-trade/`,
    data: {
      date
    }
  })
}
/**
 * @description: wind文件导出
 * @param {*} value3
 * @param {*} beginPubdate
 * @param {*} endPubdate
 * @return {*}
 */
export const reqWindDownload = (value3, beginPubdate, endPubdate,) => {
  return http({
    method: 'get',
    url: `/external/wind-trade/download/`,
    params: {
      instrument_type: value3,
      start_date: beginPubdate,
      finish_date: endPubdate,

    },
    paramsSerializer: params => {
      return qs.stringify(params, {
        arrayFormat: 'comma'
      })
    },
    header: {
      headers: { 'Content-Type': 'application/x-download' }
    },
    responseType: 'blob'
  })
}