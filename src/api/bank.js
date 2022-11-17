/*
 * @Date: 2022-06-28 14:12:40
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-14 17:34:31
 * @Description: 
 */
/**
 * @description: 
 * @return {*page, size, addbank, beginPubdate, endPubdate}
 */
import http from '@/utils/request.js'
import qs from 'qs'
export const reqBanfilter = (page, size, addbank, beginPubdate, endPubdate) => {
  return http({
    method: 'get',
    url: `/bank/`,
    params: {
      page,
      size,
      bank_abbr_code__in: addbank,
      start_date: beginPubdate,
      finish_date: endPubdate
    },
    paramsSerializer: params => {
      return qs.stringify(params, {
        arrayFormat: 'comma'
      })
    }
    /*     data: {
          bank_abbr_code__in: addbank,
        } */
  })
}
/**
 * @description: 
 * @return {*}
 */

export const reqBandata = (selectvalue, selectvalue2) => {
  return http({
    method: 'post',
    url: `/bank/`,
    data: {
      nc_date: selectvalue,
      nc_data_copy: selectvalue2
    }
  })
}



/**
 * @description: 期货
 * @param {*addvariety} 
 * @param {*beginPubdate} 
 * @param {*endPubdate} 
 * @return {*addvariety, beginPubdate, endPubdate}
 */
export const reqProfitandloss = (addvariety, beginPubdate, endPubdate) => {
  return http({
    method: 'post',
    url: `/pnlrecord/AMM/futures/`,
    params: {
      start_date: beginPubdate,
      finish_date: endPubdate
    },
    data: {
      selection: addvariety,
    }
  })
}
/**
 * @description: 期权
 * @param {*} addvarietyList
 * @param {*} beginPubdate
 * @param {*} endPubdate
 * @return {*}
 */
export const reqOptions = (addvarietyList, beginPubdate, endPubdate) => {
  return http({
    method: 'post',
    url: `/pnlrecord/AMM/options/`,
    params: {
      start_date: beginPubdate,
      finish_date: endPubdate
    },
    data: {
      selection: addvarietyList,
    }
  })
}
export const reqbankaccount = (beginPubdate, endPubdate, beginPubdates, endPubdates, beginPubdatess, endPubdatess, searchaccount_layer, searchopening_bank, searchopening_bank_branch, searchbank_account_number, searchinter_bank_account_number, searchaccount_category, searchfund_category, searchcurrency, searchaccount_purpose, searchinterest_rate_category, searchinterest_rate, searchbank_fees, searchbank_transfer_limit, searchcontact_person, searchcontact_details, searchcontact_address, searchintra_account_contact_person, searchukey_serial_number, searchukey_holder, searchother_info, page,
  size) => {
  return http({
    method: 'get',
    url: `/bank/account-management/bank-account/`,
    params: {
      start_date: beginPubdate,
      finish_date: endPubdate,
      close_start_date: beginPubdates,
      close_finish_date: endPubdates,
      maturity_start_date: beginPubdatess,
      maturity_finish_date: endPubdatess,
      account_layer: searchaccount_layer,
      opening_bank: searchopening_bank,
      opening_bank_branch: searchopening_bank_branch,
      bank_account_number: searchbank_account_number,
      inter_bank_account_number: searchinter_bank_account_number,
      account_category: searchaccount_category,
      fund_category: searchfund_category,
      currency: searchcurrency,
      account_purpose: searchaccount_purpose,
      interest_rate_category: searchinterest_rate_category,
      interest_rate: searchinterest_rate,
      bank_fees: searchbank_fees,
      bank_transfer_limit: searchbank_transfer_limit,
      contact_person: searchcontact_person,
      contact_details: searchcontact_details,
      contact_address: searchcontact_address,
      intra_account_contact_person: searchintra_account_contact_person,
      ukey_serial_number: searchukey_serial_number,
      ukey_holder: searchukey_holder,
      other_info: searchother_info,
      page,
      size,
    },
    paramsSerializer: params => {
      return qs.stringify(params, {
        arrayFormat: 'comma'
      })
    }
  })
}
/**
 * @description: 添加
 * @return {*}
 */
export const reqbankaccountadd = (
  data) => {
  return http({
    method: 'post',
    url: `/bank/account-management/bank-account/`,
    data
  })
}
/**
 * @description: 修改
 * @return {*}
 */
export const reqbankaccountedit = (id
) => {
  return http({
    method: 'get',
    url: `/bank/account-management/bank-account/${id}`,
  })
}
/**
 * @description: 修改确认
 * @return {*}
 */
export const reqbankaccounteditsure = (id, data
) => {
  return http({
    method: 'put',
    url: `/bank/account-management/bank-account/${id}`,
    data
  })
}
/**
 * @description: 删除
 * @return {*}
 */
export const reqbankaccountdel = (id
) => {
  return http({
    method: 'delete',
    url: `/bank/account-management/bank-account/${id}`,
  })
}
/**
 * @description: 授信获取数据
 * @return {*}
 */
export const reqbankfacilities = (page,
  size, company_name_val, bank_main_name_val, bank_branch_val, currency_val) => {
  return http({
    method: 'get',
    url: `/bank/credit-management/credit-facilities/`,
    params: {
      page,
      size,
      company_name: company_name_val,
      bank_main_name: bank_main_name_val,
      bank_branch: bank_branch_val,
      currency: currency_val,
    },
    paramsSerializer: params => {
      return qs.stringify(params, {
        arrayFormat: 'comma'
      })
    }
  })
}

export const reqdelbankfacilities = (id) => {
  return http({
    method: 'delete',
    url: `/bank/credit-management/credit-facilities/${id}`
  })
}
export const reqeditbankfacilities = (id, data) => {
  return http({
    method: 'put',
    url: `/bank/credit-management/credit-facilities/${id}`,
    data
  })
}
export const reqaddbankfacilities = (data) => {
  return http({
    method: 'post',
    url: `/bank/credit-management/credit-facilities/`,
    data
  })
}


export const reqbalance = (check_month) => {
  return http({
    method: 'get',
    url: `/bank/balance-check/`,
    params: {
      check_month
    }
  })
}