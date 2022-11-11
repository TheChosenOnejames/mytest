/*
 * @Date: 2022-09-28 15:27:33
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-09-28 16:06:06
 * @Description: 
 */
import http from '@/utils/request.js'
export const reqbanupload = (data) => {
  return http({
    method: 'post',
    url: `http://10.66.128.87:8000/bank/nc_upload/`,
    headers: {
      "Content-type": "multipart/form-data"
    },
    data
  })
}