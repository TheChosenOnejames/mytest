<!--
 * @Date: 2022-07-27 10:48:48
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 14:46:04
 * @Description: 
-->
<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>银行</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/bank' }"
          >银行核对</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/bankfacilities' }"
          >银行授信</el-breadcrumb-item
        >
        <el-breadcrumb-item>银行账户</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="top-box">
        <h1 style="font-size:25px">银行账户清单</h1>
      </div>
      <div class="table-box" style="padding-top:35px">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加</el-button
        >
        <el-button
          style="margin-right:10px ;margin-bottom:15px"
          slot="append"
          @click="getbankaccount"
          type="success"
          >搜索</el-button
        >
        <!--显示隐藏列 -->
        <el-popover width="80" trigger="click">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="cities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in columnHeaders"
              :label="item.title"
              :key="item.title"
            ></el-checkbox>
          </el-checkbox-group>

          <i
            slot="reference"
            type="info"
            @click="dialogVisible = true"
            class="el-icon-menu icon-box"
          ></i>

          <!--           <el-button slot="reference" type="info" @click="dialogVisible = true"
            >显隐列</el-button
          > -->
        </el-popover>
        <!-- 表头搜索 -->
        <el-table
          height="700"
          ref="dataTabless"
          id="table"
          :header-cell-style="{ 'text-align': 'center' }"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :data="bankaccountlist"
          border
          style="width: 100%"
        >
          <el-table-column
            v-if="columnHeaders[0].isShow"
            sortable
            align="center"
            width="220"
            prop="account_layer"
            label="账户分层
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  class="filter-select"
                  filterable
                  clearable
                  v-model="searchbank.account_layer_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj"
                >
                  <el-option
                    v-for="item in searchaccount_layer"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.account_layer }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[1].isShow"
            sortable
            align="center"
            width="200"
            prop="opening_bank"
            label="开户行"
            fixed="left"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  class="filter-select"
                  filterable
                  clearable
                  v-model="searchbank.opening_bank_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj1"
                >
                  <el-option
                    v-for="item in searchopening_bank"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.opening_bank }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[2].isShow"
            sortable
            align="center"
            width="200"
            prop="opening_bank"
            label="开户机构
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  class="filter-select"
                  filterable
                  clearable
                  v-model="searchbank.opening_bank_branch_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj2"
                >
                  <el-option
                    v-for="item in searchopening_bank_branch"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.opening_bank_branch }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[3].isShow"
            sortable
            align="right"
            width="220"
            prop="bank_account_number"
            label="账号
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  class="filter-select"
                  filterable
                  clearable
                  v-model="searchbank.bank_account_number_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj3"
                >
                  <el-option
                    v-for="item in searchbank_account_number"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.bank_account_number }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[4].isShow"
            sortable
            align="right"
            width="200"
            prop="inter_bank_account_number"
            label="联行号
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  class="filter-select"
                  filterable
                  clearable
                  v-model="searchbank.inter_bank_account_number_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj4"
                >
                  <el-option
                    v-for="item in searchinter_bank_account_number"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.inter_bank_account_number }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[5].isShow"
            sortable
            align="center"
            prop="account_opening_date"
            label="开户时间
"
          >
            <el-table-column align="center" width="380">
              <template slot="header" slot-scope="scope">
                <span v-show="false">{{ scope.row }}</span>
                <el-date-picker
                  v-model="date"
                  size="mini"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </template>
              <template slot-scope="scope">
                {{ scope.row.account_opening_date }}</template
              >
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[6].isShow"
            sortable
            align="center"
            width="120"
            prop="account_closing_date"
            label="销户时间
"
          >
            <el-table-column align="center" width="380">
              <template slot="header" slot-scope="scope">
                <span v-show="false">{{ scope.row }}</span>
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  size="mini"
                  v-model="dates"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </template>
              <template slot-scope="scope">
                {{ scope.row.account_closing_date }}</template
              >
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[7].isShow"
            sortable
            align="center"
            width="120"
            prop="account_category"
            label="账户性质
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.account_category_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj5"
                >
                  <el-option
                    v-for="item in searchaccount_category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.account_category }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[8].isShow"
            sortable
            align="center"
            width="120"
            prop="fund_category"
            label="资金性质
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.fund_category_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj6"
                >
                  <el-option
                    v-for="item in searchfund_category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.fund_category }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[9].isShow"
            sortable
            align="center"
            width="120"
            prop="currency"
            label="币种
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.currency_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj7"
                >
                  <el-option
                    v-for="item in searchcurrency"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.currency }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[10].isShow"
            sortable
            align="center"
            width="200"
            prop="account_purpose"
            label="账户用途"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.account_purpose_inpsut"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj8"
                >
                  <el-option
                    v-for="item in searchaccount_purpose"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.account_purpose }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[11].isShow"
            sortable
            align="center"
            width="120"
            prop="interest_rate_category"
            label="利率分类	
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.interest_rate_category_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj9"
                >
                  <el-option
                    v-for="item in searchinterest_rate_category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.interest_rate_category }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[12].isShow"
            sortable
            align="right"
            width="120"
            prop="interest_rate"
            label="利率	
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.interest_rate_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj10"
                >
                  <el-option
                    v-for="item in serachinterest_rate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.interest_rate }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[13].isShow"
            sortable
            align="center"
            width="180"
            prop="md_agreement_deposit"
            label="协定存款到期日
"
          >
            <el-table-column align="center" width="380">
              <template slot="header" slot-scope="scope">
                <span v-show="false">{{ scope.row }}</span>
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  size="mini"
                  v-model="datess"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </template>
              <template slot-scope="scope">
                {{ scope.row.md_agreement_deposit }}
              </template></el-table-column
            >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[14].isShow"
            sortable
            align="center"
            width="120"
            prop="bank_fees"
            label="手续费
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.bank_fees_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj11"
                >
                  <el-option
                    v-for="item in searchbank_fees"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.bank_fees }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[15].isShow"
            sortable
            align="right"
            width="180"
            prop="bank_transfer_limit"
            label="网银转账限额
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>

                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.bank_transfer_limit_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj12"
                >
                  <el-option
                    v-for="item in searchbank_transfer_limit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.bank_transfer_limit }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[15].isShow"
            sortable
            align="center"
            width="120"
            prop="contact_person"
            label="联系人
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.contact_person_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj13"
                >
                  <el-option
                    v-for="item in searchcontact_person"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.contact_person }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[16].isShow"
            sortable
            align="center"
            width="220"
            prop="contact_details"
            label="联系电话
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.contact_details_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj14"
                >
                  <el-option
                    v-for="item in searchcontact_details"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.contact_details }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[17].isShow"
            sortable
            align="center"
            width="250"
            prop="contact_address"
            label="联系地址
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.contact_address_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj15"
                >
                  <el-option
                    v-for="item in searchcontact_address"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.contact_address }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[18].isShow"
            sortable
            align="center"
            width="180"
            prop="intra_account_contact_person"
            label="内部账户联系人"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.intra_account_contact_person_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj16"
                >
                  <el-option
                    v-for="item in searchintra_account_contact_person"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.intra_account_contact_person }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[19].isShow"
            sortable
            align="center"
            width="120"
            prop="ukey_serial_number"
            label="ukey编号
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.ukey_serial_number_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj17"
                >
                  <el-option
                    v-for="item in searchukey_serial_number"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                {{ scope.row.ukey_serial_number }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[20].isShow"
            sortable
            align="center"
            width="160"
            prop="ukey_holder"
            label="ukey管理人
"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.ukey_holder_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj18"
                >
                  <el-option
                    v-for="item in searchukey_holder"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <!--                 <el-input
                  size="mini"
                  clearable
                  prefix-icon="el-icon-search"
                  v-model="searchbank.ukey_holder_input"
                  placeholder="请输入内容"
                ></el-input> -->
              </template>
              <template slot-scope="scope">
                {{ scope.row.ukey_holder }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[21].isShow"
            sortable
            align="center"
            width="350"
            prop="other_info"
            label="备注"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in columnHeaders"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>

                <el-select
                  size="mini"
                  filterable
                  clearable
                  v-model="searchbank.other_info_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj19"
                >
                  <el-option
                    v-for="item in searchother_info"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <!--                 <el-input
                  size="mini"
                  clearable
                  prefix-icon="el-icon-search"
                  v-model="searchbank.other_info_input"
                  placeholder="请输入内容"
                ></el-input> -->
              </template>
              <template slot-scope="scope">
                {{ scope.row.other_info }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[22].isShow"
            sortable
            align="center"
            width="250"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="showEditDialog(scope.row)"
                >修改</el-button
              >
              <el-button
                @click="removeUserById(scope.row)"
                type="danger"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="padding-top: 15px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[15, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <div class="button-box">
        <el-button size="mini" type="primary" @click="exportExcelsss"
          >导出表格</el-button
        >
      </div>

      <!-- 添加出来的弹框嵌套表单提交 -->
      <el-dialog
        :append-to-body="true"
        title="添加任务"
        :visible.sync="dialogFormVisible"
        width="35%"
      >
        <el-form
          label-width="170px"
          :rules="bankaddrules"
          ref="addbankaccountRef"
          :model="form"
        >
          <el-form-item label="账户分层" prop="account_layer">
            <el-select
              v-model="form.account_layer"
              placeholder="请选择账户分层"
            >
              <el-option
                v-for="item in searchaccount_layer"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!--   <el-input v-model="form.account_layer" clearable></el-input> -->
          </el-form-item>
          <el-form-item label="开户行" prop="opening_bank">
            <el-input
              placeholder="请输入开户行"
              v-model="form.opening_bank"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开户机构" prop="opening_bank_branch">
            <el-input
              placeholder="请输入开户机构"
              v-model="form.opening_bank_branch"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="bank_account_number">
            <el-input
              placeholder="请输入账号"
              v-model="form.bank_account_number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联行号" prop="inter_bank_account_number">
            <el-input
              placeholder="请输入联行号"
              v-model="form.inter_bank_account_number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开户时间" prop="account_opening_date">
            <el-input
              placeholder="例:yyyy-mm-dd格式"
              v-model="form.account_opening_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="销户时间" prop="account_closing_date">
            <el-input
              placeholder="例:yyyy-mm-dd格式"
              v-model="form.account_closing_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="账户性质" prop="account_category">
            <!--   <el-input v-model="form.account_category" clearable></el-input> -->
            <el-select
              v-model="form.account_category"
              placeholder="请选择账户性质"
            >
              <el-option
                v-for="item in searchaccount_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资金性质" prop="fund_category">
            <!--  <el-input v-model="form.fund_category" clearable></el-input> -->
            <el-select
              v-model="form.fund_category"
              placeholder="请选择资金性质"
            >
              <el-option
                v-for="item in searchfund_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="币种" prop="currency">
            <el-select v-model="form.currency" placeholder="请选择币种">
              <el-option
                v-for="item in searchcurrency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!--    <el-input v-model="form.currency" clearable></el-input> -->
          </el-form-item>
          <el-form-item label="账户用途" prop="account_purpose">
            <el-select
              v-model="form.account_purpose"
              placeholder="请选择账户用途"
            >
              <el-option
                v-for="item in searchaccount_purpose"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!--   <el-input v-model="form.account_purpose" clearable></el-input> -->
          </el-form-item>
          <el-form-item label="利率分类" prop="interest_rate_category">
            <el-select
              v-model="form.interest_rate_category"
              placeholder="请选择利率分类"
            >
              <el-option
                v-for="item in searchinterest_rate_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <!--             <el-input
              v-model="form.interest_rate_category"
              clearable
            ></el-input> -->
          </el-form-item>
          <el-form-item label="利率" prop="interest_rate">
            <el-input
              placeholder="请输入利率"
              v-model="form.interest_rate"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="协定存款日期" prop="md_agreement_deposit">
            <el-input
              placeholder="例:yyyy-mm-dd格式"
              v-model="form.md_agreement_deposit"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="手续费" prop="bank_fees">
            <el-input
              placeholder="请输入手续费"
              v-model="form.bank_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="网银转账限额" prop="bank_transfer_limit">
            <el-input
              placeholder="请输入网银转账限额"
              v-model="form.bank_transfer_limit"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact_person">
            <el-input
              placeholder="请输入联系人"
              v-model="form.contact_person"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contact_details">
            <el-input
              placeholder="请请输入联系电话"
              v-model="form.contact_details"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="contact_address">
            <el-input
              placeholder="请输入联系地址"
              v-model="form.contact_address"
              clearables
            ></el-input>
          </el-form-item>
          <el-form-item
            label="内部账户联系人"
            prop="intra_account_contact_person"
          >
            <el-input
              placeholder="请输入内部联系人"
              v-model="form.intra_account_contact_person"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="ukey编号" prop="ukey_serial_number">
            <el-input
              placeholder="ukey编号"
              v-model="form.ukey_serial_number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="ukey管理人" prop="ukey_holder">
            <el-input
              placeholder="请输入ukey管理人"
              v-model="form.ukey_holder"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="other_info">
            <el-input
              placeholder="请输入备注"
              v-model="form.other_info"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑数据弹框嵌套表单 -->
      <el-dialog
        :append-to-body="true"
        title="修改用户"
        :visible.sync="editDialogVisble"
        width="35%"
        @change="aditClosedbankaccount"
      >
        <el-form
          :model="editForm"
          :rules="bankaddrules"
          ref="editFormRef"
          label-width="170px"
        >
          <el-form-item label="账户分层" prop="account_layer">
            <el-select
              v-model="editForm.account_layer"
              placeholder="请选择账户分层"
            >
              <el-option
                v-for="item in searchaccount_layer"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!--     <el-input v-model="editForm.account_layer" clearable></el-input> -->
          </el-form-item>
          <el-form-item label="开户行" prop="opening_bank">
            <el-input
              placeholder="请输入开户行"
              v-model="editForm.opening_bank"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开户机构" prop="opening_bank_branch">
            <el-input
              placeholder="请输入开户机构"
              v-model="editForm.opening_bank_branch"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="bank_account_number">
            <el-input
              placeholder="请输入账号"
              :disabled="true"
              v-model="editForm.bank_account_number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联行号" prop="inter_bank_account_number">
            <el-input
              placeholder="亲输入联行号"
              v-model="editForm.inter_bank_account_number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开户时间" prop="account_opening_date">
            <el-input
              placeholder="请输入开户时间: 例yyyy-mm-dd格式"
              v-model="editForm.account_opening_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="销户时间" prop="account_closing_date">
            <el-input
              placeholder="请输入销户时间:例yyyy-mm-dd格式"
              v-model="editForm.account_closing_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="账户性质" prop="account_category">
            <!--   <el-input v-model="editForm.account_category" clearable></el-input> -->
            <el-select
              v-model="editForm.account_category"
              placeholder="请选择账户性质"
            >
              <el-option
                v-for="item in searchaccount_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资金性质" prop="fund_category">
            <el-select
              v-model="editForm.fund_category"
              placeholder="请选择资金性质"
            >
              <el-option
                v-for="item in searchfund_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="币种" prop="currency">
            <el-select v-model="editForm.currency" placeholder="请选择币种">
              <el-option
                v-for="item in searchcurrency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户用途" prop="account_purpose">
            <el-select
              v-model="editForm.account_purpose"
              placeholder="请选择账户用途"
            >
              <el-option
                v-for="item in searchaccount_purpose"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="利率分类" prop="interest_rate_category">
            <el-select
              v-model="editForm.interest_rate_category"
              placeholder="请选择利率分类"
            >
              <el-option
                v-for="item in searchinterest_rate_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="利率" prop="interest_rate">
            <el-input
              placeholder="请输入利率"
              v-model="editForm.interest_rate"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="协定存款日期" prop="md_agreement_deposit">
            <el-input
              placeholder="请输入协定存款日期: 例yyyy-mm-dd格式"
              v-model="editForm.md_agreement_deposit"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="手续费" prop="bank_fees">
            <el-input
              placeholder="请输入手续费"
              v-model="editForm.bank_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="网银转账限额" prop="bank_transfer_limit">
            <el-input
              placeholder="请输入网银转账限额"
              v-model="editForm.bank_transfer_limit"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact_person">
            <el-input
              placeholder="请输入联系人"
              v-model="editForm.contact_person"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contact_details">
            <el-input
              placeholder="请输入联系电话"
              v-model="editForm.contact_details"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="contact_address">
            <el-input
              placeholder="请输入联系地址"
              v-model="editForm.contact_address"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="内部账户联系人"
            prop="intra_account_contact_person"
          >
            <el-input
              placeholder="请输入内部账户联系人"
              v-model="editForm.intra_account_contact_person"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="ukey编号" prop="ukey_serial_number">
            <el-input
              placeholder="请输入ukey编号"
              v-model="editForm.ukey_serial_number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="ukey管理人" prop="ukey_holder">
            <el-input
              placeholder="请输入ukey管理人"
              v-model="editForm.ukey_holder"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="other_info">
            <el-input
              placeholder="请输入备注"
              v-model="editForm.other_info"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisble = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  reqbankaccountdel,
  reqbankaccounteditsure,
  reqbankaccount,
  reqbankaccountadd,
  reqbankaccountedit
} from "@/api/bank.js";
const columnSelecteds = [
  "账户分层",
  "开户行",
  "开户机构",
  "账号",
  "联行号",
  "开户时间",
  "销户时间",
  "账户性质",
  "资金性质",
  "币种",
  "账户用途",
  "利率分类",
  "利率",
  "协定存款到期日",
  "手续费",
  "网银转账限额",
  "联系人",
  "联系电话",
  "联系地址",
  "内部账户联系人",
  "ukey编号",
  "ukey管理人",
  "备注"
];
export default {
  name: "Bankaccount",
  data() {
    return {
      date: [],
      dates: [],
      datess: [],
      editid: "",
      //每段搜索的值

      searchaccount_layer: [],
      searchopening_bank: [],
      searchopening_bank_branch: [],
      searchbank_account_number: [],
      searchinter_bank_account_number: [],
      searchaccount_category: [],
      searchfund_category: [],
      searchcurrency: [],
      searchaccount_purpose: [],
      searchinterest_rate_category: [],
      serachinterest_rate: [],
      searchbank_fees: [],
      searchbank_transfer_limit: [],
      searchcontact_person: [],
      searchcontact_details: [],
      searchcontact_address: [],
      searchintra_account_contact_person: [],
      searchukey_serial_number: [],
      searchukey_holder: [],
      searchother_info: [],

      //每段输入的值
      searchaccount_layer_val: [],
      searchopening_bank_val: [],
      searchopening_bank_branch_val: [],
      searchbank_account_number_val: [],
      searchaccount_category_val: [],
      searchfund_category_val: [],
      searchcurrency_val: [],
      searchaccount_purpose_val: [],
      searchinterest_rate_category_val: [],
      serachinterest_rate_val: [],
      searchbank_fees_val: [],
      searchbank_transfer_limit_val: [],
      searchbank: {
        account_layer_input: "",
        opening_bank_input: "",
        opening_bank_branch_input: "",
        bank_account_number_input: "",
        inter_bank_account_number_input: "",
        account_opening_date_input: "",
        account_closing_date_input: "",
        account_category_input: "",
        fund_category_input: "",
        currency_input: "",
        account_purpose_input: "",
        interest_rate_category_input: "",
        interest_rate_input: "",
        md_agreement_deposit_input: "",
        bank_fees_input: "",
        bank_transfer_limit_input: "",
        contact_person_input: "",
        contact_details_input: "",
        contact_address_input: "",
        intra_account_contact_person_input: "",
        ukey_serial_number_input: "",
        ukey_holder_input: "",
        other_info_input: ""
      },
      opening_bank_input: "",
      value: [],
      account_opening_date_time: "",
      checkAll: false,
      isIndeterminate: true,
      k: "",
      form: {
        id: "",
        account_layer: "",
        opening_bank: "",
        opening_bank_branch: "",
        bank_account_number: "",
        inter_bank_account_number: "",
        account_opening_date: "",
        account_closing_date: null,
        account_category: "",
        fund_category: "",
        currency: "人民币",
        account_purpose: "",
        interest_rate_category: "",
        interest_rate: "" + "%",
        md_agreement_deposit: null,
        bank_fees: "",
        bank_transfer_limit: "",
        contact_person: "",
        contact_details: "",
        contact_address: "",
        intra_account_contact_person: "",
        ukey_serial_number: "",
        ukey_holder: "",
        other_info: ""
      },
      editForm: {
        account_layer: "",
        opening_bank: "",
        opening_bank_branch: "",
        bank_account_number: "",
        inter_bank_account_number: "",
        account_opening_date: "",
        account_closing_date: "",
        account_category: "",
        fund_category: "",
        currency: "",
        account_purpose: "",
        interest_rate_category: "",
        interest_rate: "",
        md_agreement_deposit: "",
        bank_fees: "",
        bank_transfer_limit: "",
        contact_person: "",
        contact_details: "",
        contact_address: "",
        intra_account_contact_person: "",
        ukey_serial_number: "",
        ukey_holder: "",
        other_info: ""
      },
      editDialogVisble: false,
      dialogFormVisible: false,
      bankaccountlist: [],
      input: "",
      value1: "",
      total: 1,
      size: 15,
      currentPage2: 1,
      cities: columnSelecteds,
      //表头信息
      columnHeaders: [
        { index: 0, title: "账户分层", isShow: true },
        { index: 1, title: "开户行", isShow: true },
        { index: 2, title: "开户机构", isShow: true },
        { index: 3, title: "账号", isShow: true },
        { index: 4, title: "联行号", isShow: true },
        { index: 5, title: "开户时间", isShow: true },
        { index: 6, title: "销户时间", isShow: true },
        { index: 7, title: "账户性质", isShow: true },
        { index: 8, title: "资金性质", isShow: true },
        { index: 9, title: "币种", isShow: true },
        { index: 10, title: "账户用途", isShow: true },
        { index: 11, title: "利率分类", isShow: true },
        { index: 12, title: "利率", isShow: true },
        { index: 13, title: "协定存款到期日", isShow: true },
        { index: 14, title: "手续费", isShow: true },
        { index: 15, title: "网银转账限额", isShow: true },
        { index: 16, title: "联系人", isShow: true },
        { index: 17, title: "联系电话", isShow: true },
        { index: 18, title: "联系地址", isShow: true },
        { index: 19, title: "内部账户联系人", isShow: true },
        { index: 20, title: "ukey编号", isShow: true },
        { index: 21, title: "ukey管理人", isShow: true },
        { index: 22, title: "备注", isShow: true }
      ],
      bankaddrules: {
        account_layer: [
          { required: true, message: "请输入账户分层", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        opening_bank: [
          { required: true, message: "请输入开户行", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        opening_bank_branch: [
          { required: true, message: "请输入开户机构", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        bank_account_number: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        inter_bank_account_number: [
          { required: true, message: "请输入联行号", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        account_opening_date: [
          {
            required: true,
            message: "请输入开户时间",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
            message: "请输入正确格式",
            trigger: ["blur", "change"]
          }
        ],
        account_closing_date: [
          {
            required: false,
            message: "请输入开户时间",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
            message: "请输入正确格式",
            trigger: ["blur", "change"]
          }
        ],
        md_agreement_deposit: [
          {
            required: false,
            message: "请输入开户时间",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/,
            message: "请输入正确格式",
            trigger: ["blur", "change"]
          }
        ],
        account_category: [
          { required: true, message: "请输入账户性质", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        fund_category: [
          { required: true, message: "请输入资金性质", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        currency: [
          { required: true, message: "请输入币种", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        account_purpose: [
          { required: true, message: "请输入账户用途", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        interest_rate_category: [
          { required: true, message: "请输入利率分类", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        interest_rate: [
          { required: true, message: "请输入利率", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        bank_transfer_limit: [
          { required: true, message: "请输入网银转账限额", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    fn() {},
    searchobj(val) {
      this.searchaccount_layer_val = val;
      console.log(this.searchaccount_layer_val);
    },
    searchobj1(val) {
      this.searchopening_bank_val = val;
    },
    searchobj2(val) {
      console.log(this.searchopening_bank_branch_val);
      this.searchopening_bank_branch_val = val;
    },
    searchobj3(val) {
      this.searchbank_account_number_val = val;
    },
    searchobj4(val) {
      this.searchinter_bank_account_number_val = val;
    },
    searchobj5(val) {
      console.log(this.searchaccount_category_val);
      this.searchaccount_category_val = val;
    },
    searchobj6(val) {
      this.searchfund_category_val = val;
    },
    searchobj7(val) {
      this.searchcurrency_val = val;
    },
    searchobj8(val) {
      this.searchaccount_purpose_val = val;
    },
    searchobj9(val) {
      this.searchinterest_rate_category_val = val;
    },
    searchobj10(val) {
      this.searchinterest_rate_val = val;
    },
    searchobj11(val) {
      console.log(val);
      this.searchbank_fees_val = val;
    },
    searchobj12(val) {
      console.log(val);
      this.searchbank_transfer_limit_val = val;
    },
    searchobj13(val) {
      this.contact_person_val = val;
    },
    searchobj14(val) {
      this.contact_details_val = val;
    },
    searchobj15(val) {
      this.contact_address_val = val;
    },
    searchobj16(val) {
      this.intra_account_contact_person_val = val;
    },
    searchobj17(val) {
      this.ukey_serial_number_val = val;
    },
    searchobj18(val) {
      this.ukey_holder_val = val;
    },
    searchobj19(val) {
      this.other_info_val = val;
    },
    /* 删除 */
    async removeUserById(row) {
      const confirmRusult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "永久删除该用户",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      console.log(confirmRusult);
      if (confirmRusult !== "confirm") {
        return this.$message.info("已经取消了删除");
      }
      const res = await reqbankaccountdel(row.id);
      this.getbankaccount();
    },
    /* 添加账户 */
    async add() {
      this.$refs.addbankaccountRef.validate(async valid => {
        if (!valid) return;
        await this.$confirm("此操作将添加文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消添加"
            });
          });
        await reqbankaccountadd(this.form);
        this.$refs.addbankaccountRef.resetFields();
        this.dialogFormVisible = false;
        this.getbankaccount();
      });
    },
    /* 获取用户账户数据 */
    async getbankaccount() {
      const [beginPubdate, endPubdate] = this.date || [];
      const [beginPubdates, endPubdates] = this.dates || [];
      const [beginPubdatess, endPubdatess] = this.datess || [];

      console.log(beginPubdate, endPubdate);
      const { data: res } = await reqbankaccount(
        beginPubdate,
        endPubdate,
        beginPubdates,
        endPubdates,
        beginPubdatess,
        endPubdatess,
        this.searchaccount_layer_val,
        this.searchopening_bank_val,
        this.searchopening_bank_branch_val,
        this.searchbank_account_number_val,
        this.searchinter_bank_account_number_val,
        this.searchaccount_category_val,
        this.searchfund_category_val,
        this.searchcurrency_val,
        this.searchaccount_purpose_val,
        this.searchinterest_rate_category_val,
        this.searchinterest_rate_val,
        this.searchbank_fees_val,
        this.searchbank_transfer_limit_val,
        this.contact_person_val,
        this.contact_details_val,
        this.contact_address_val,
        this.intra_account_contact_person_val,
        this.ukey_serial_number_val,
        this.ukey_holder_val,
        this.other_info_val,
        this.currentPage2,
        this.size,
        this.form
      );

      this.bankaccountlist = res.results.data;
      this.searchaccount_layer = res.results.unique_data.account_layer;
      this.searchopening_bank = res.results.unique_data.opening_bank;
      this.searchopening_bank_branch =
        res.results.unique_data.opening_bank_branch;
      this.searchbank_account_number =
        res.results.unique_data.bank_account_number;

      this.searchinter_bank_account_number =
        res.results.unique_data.inter_bank_account_number;
      this.searchaccount_category = res.results.unique_data.account_category;
      this.searchfund_category = res.results.unique_data.fund_category;
      this.searchcurrency = res.results.unique_data.currency;
      this.searchaccount_purpose = res.results.unique_data.account_purpose;
      this.searchinterest_rate_category =
        res.results.unique_data.interest_rate_category;
      this.serachinterest_rate = res.results.unique_data.interest_rate;
      this.searchbank_fees = res.results.unique_data.bank_fees;
      this.searchbank_transfer_limit =
        res.results.unique_data.bank_transfer_limit;
      this.searchcontact_person = res.results.unique_data.contact_person;
      this.searchcontact_details = res.results.unique_data.contact_details;
      this.searchcontact_address = res.results.unique_data.contact_address;
      this.searchintra_account_contact_person =
        res.results.unique_data.intra_account_contact_person;
      console.log("99999", this.searchopening_bank_branch);
      this.searchukey_serial_number =
        res.results.unique_data.ukey_serial_number;
      this.searchukey_holder = res.results.unique_data.ukey_holder;
      this.searchother_info = res.results.unique_data.other_info;
      this.total = res.count;
    },
    /* 分页大小 */
    handleSizeChange(newsize) {
      this.size = newsize;
      //  console.log(`每页 ${newsize} 条`);
      this.getbankaccount();
    },
    /* 分页页数 */
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${newpage}`);
      this.currentPage2 = newpage;
      this.getbankaccount();
    },
    /* 导出表格 */
    exportExcelsss() {
      let fix = document.querySelector(".el-table__fixed");
      let wb;
      if (fix) {
        //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
        wb = XLSX.utils.table_to_book(
          document.querySelector("#table").removeChild(fix)
        );
        document.querySelector("#table").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#table"));
      }
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "银行账户清单.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    async editUserInfo() {
      this.$refs.editFormRef.validate(async validate => {
        if (!valid) return;
        await this.$confirm("此操作将编辑文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消编辑"
            });
          });
        const res = await reqbankaccounteditsure(this.editid, this.editForm);

        if (res.status !== 200) {
          this.$message.error("更新用户信息失败!");
        }
        this.$message.success("更新用户信息成功!");
        this.editDialogVisble = false;
        this.getbankaccount();
      });
    },
    aditClosedbankaccount() {
      this.$refs.editFormRef.resetFields();
    },
    async showEditDialog(row) {
      this.editid = row.id;
      const res = await reqbankaccountedit(row.id);

      this.editForm = res.data;

      this.editDialogVisble = true;
    },
    handleCheckAllChange(val) {
      //console.log(val)
      this.cities = val ? columnSelecteds : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  },
  watch: {
    /**
     * @title 监听列显示隐藏
     */
    cities(newArrayVal) {
      // 计算为被选中的列标题数组
      var nonSelecteds = this.columnHeaders
        .filter(item => newArrayVal.indexOf(item.title) == -1)
        .map(item => item.title);
      // 根据计算结果进行表格重绘
      this.columnHeaders.filter(item => {
        let isNonSelected = nonSelecteds.indexOf(item.title) != -1;
        if (isNonSelected) {
          // 隐藏未选中的列
          item.isShow = false;
          this.$nextTick(() => {
            this.$refs.dataTabless.doLayout();
          });
        } else {
          // 显示已选中的列
          item.isShow = true;
          this.$nextTick(() => {
            this.$refs.dataTabless.doLayout();
          });
        }
      });
    }
  },

  mounted() {
    this.getbankaccount();
    //  console.log("11", this.editForm.account_layer);
  }
};
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  position: relative;
  .top-box {
    position: absolute;
    top: 35px;
    left: 45%;
  }
  .icon-box {
    top: 95px;
    right: 40px;
    position: absolute;
  }

  .button-box {
    position: absolute;
    bottom: 24px;
    right: 18px;
  }
}
</style>
