/*
 * @Date: 2022-09-09 16:19:04
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-04 10:27:35
 * @Description: 期货账户凭证页面
 */
import http from '@/utils/request.js'
import qs from 'qs'
/**
 * @description: 期货账户凭证文件上传
 * @param {*} data
 * @return {*}
 */
export const reqGts = (data) => {
  return http({
    method: 'post',
    url: `/pnlrecord/journal/futures/upload/`,
    headers: {
      "Content-type": "multipart/form-data"
    },
    data
  })
}
/**
 * @description: 期货账户凭证日期筛选
 * @param {*} beginPubdate
 * @param {*} endPubdate
 * @return {*}
 */

export const reqdownload = (page,
  size, futures_account_code, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/pnlrecord/journal/futures/download/`,
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
 * @description: 期货账户凭证日期文件导出凭证
 * @param {*} beginPubdate
 * @param {*} endPubdate
 * @return {*}
 */
export const reqfutures = (gg, beginPubdate, endPubdate) => {
  return http({
    method: 'post',
    url: `/pnlrecord/journal/futures/download/`,
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
/**
 * @description: 科目辅助余额表get列表
 * @return {*}
 */
export const reqfinancialsupport = (page,
  size, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/nc/subaccount_balance/`,
    params: {
      page,
      size,
      start_date: beginPubdate,
      finish_date: endPubdate
    }
  })
}
/**
 * @description: 科目辅助余额表导入
 * @return {*}
 */
export const reqimportdata = (data) => {
  return http({
    method: 'post',
    url: `/nc/subaccount_balance/`,
    data,
  })
}

export const reqdialogList = () => {
  return http({
    method: 'get',
    url: `/nc/subaccount_balance/compare/`,
  })
}


export const reqdialogSelect = () => {
  return http({
    method: 'get',
    url: `/nc/subaccount_balance/compare/`,
  })
}


export const reqdialogupload = (latest_date, selectvalue, latest_data_copy, selectvalue2) => {
  return http({
    method: 'post',
    url: `/nc/subaccount_balance/compare/`,
    data: {
      source_date: latest_date,
      compare_date: selectvalue,
      source_data_copy: latest_data_copy,
      compare_data_copy: selectvalue2
    }
  })
}

