<!--
 * @Date: 2022-08-22 09:08:34
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-16 18:12:50
 * @Description: 
-->
<template>
  <div>
    <el-card class="card-box">
      <div style="margin-bottom:15px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>银行</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/bank' }"
            >银行核对</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ path: '/bankaccount' }"
            >银行账户</el-breadcrumb-item
          >
          <el-breadcrumb-item>银行授信</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="top-box">
        <h1 style="font-size:25px;">银行授信管理</h1>
      </div>
      <el-button
        style="margin-top:25px"
        @click="dialogFormVisible = true"
        type="primary"
        >添加</el-button
      >
      <el-button
        style="margin-top:25px"
        @click="getbankfacilitiesList"
        type="success"
        >搜索</el-button
      >
      <el-popover width="90" trigger="click">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <el-checkbox-group v-model="cities" @change="handleCheckedCitiesChange">
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
      <div class="table-box" style="margin-bottom: 10px">
        <el-table
          border
          ref="multipleTable"
          id="table"
          height="700"
          :data="bankfacilitiesList"
          style="width: 100%"
        >
          <el-table-column
            sortable
            align="center"
            prop="company_name"
            label="公司名称"
            v-if="columnHeaders[0].isShow"
          >
            <el-table-column width="200" align="center">
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
                  v-model="company_name_input"
                  class="filter-select"
                  size="mini"
                  filterable
                  clearable
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj"
                >
                  <el-option
                    v-for="item in searchcompany_name_input"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option> </el-select
              ></template>
              <template slot-scope="scope">{{
                scope.row.company_name
              }}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="bank_main_name"
            label="总行"
            width="200"
            fixed
            v-if="columnHeaders[1].isShow"
          >
            <el-table-column width="200" align="center">
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
                  v-model="bank_main_name_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj1"
                >
                  <el-option
                    v-for="item in searchbank_main_name_input"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option> </el-select
              ></template>
              <template slot-scope="scope">{{
                scope.row.bank_main_name
              }}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="bank_branch"
            label="分支行"
            width="180"
            v-if="columnHeaders[2].isShow"
          >
            <el-table-column width="200" align="center">
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
                  v-model="bank_branch_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj2"
                >
                  <el-option
                    v-for="item in searchbank_branch_input"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option> </el-select
              ></template>
              <template slot-scope="scope">{{
                scope.row.bank_branch
              }}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="currency"
            label="币种"
            width="200"
            v-if="columnHeaders[3].isShow"
          >
            <el-table-column width="200" align="center">
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
                  v-model="currency_input"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  @change="searchobj3"
                >
                  <el-option
                    v-for="item in searchcurrency_input"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.value"
                  ></el-option> </el-select
              ></template>
              <template slot-scope="scope">{{ scope.row.currency }}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[4].isShow"
            sortable
            align="right"
            prop="total_credit_amount"
            label="总授信金额(亿)"
            width="150"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[5].isShow"
            sortable
            align="right"
            prop="available_total_credit_amount"
            label="可用授信(亿)"
            width="150"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[6].isShow"
            sortable
            align="right"
            prop="available_credit_balance"
            label="可用金额"
            width="150"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[7].isShow"
            sortable
            align="center"
            prop="percentage_credit_usage"
            label="用信比例"
            width="150"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[8].isShow"
            sortable
            align="center"
            prop="credit_start_date"
            label="开始日期"
            width="150"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[9].isShow"
            sortable
            align="center"
            prop="credit_end_date"
            label="到期日期"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="用信条件及相关费率"
            v-if="columnHeaders[10].isShow"
          >
            <el-table-column
              sortable
              align="center"
              prop="floating_loan_interest_rate"
              label="流贷"
              width="120"
            ></el-table-column>
            <el-table-column
              sortable
              align="center"
              prop="bab_fees"
              label="银票"
              width="120"
            ></el-table-column>
            <el-table-column
              sortable
              align="center"
              prop="domestic_lc_fees"
              label="国内证"
              width="120"
            ></el-table-column>
            <el-table-column
              sortable
              align="center"
              prop="international_lc_fees"
              label="国际证"
              width="120"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[11].isShow"
            sortable
            align="center"
            prop="margin_interest_rate"
            label="保证金利率"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[12].isShow"
            sortable
            align="center"
            prop="bank_credit_duration"
            label="用信期限"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[13].isShow"
            sortable
            align="center"
            prop="short_term_loan_usage"
            label="短期贷款"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[14].isShow"
            sortable
            align="center"
            prop="bab_usage"
            label="BAB"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[15].isShow"
            sortable
            align="center"
            prop="long_term_loan"
            label="长期贷款"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[16].isShow"
            sortable
            align="center"
            prop="domestic_lc_usage"
            label="国内证"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[17].isShow"
            sortable
            align="center"
            prop="international_lc_usage"
            label="国际证"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[18].isShow"
            sortable
            align="center"
            prop="forex_usage"
            label="外汇交易"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[19].isShow"
            sortable
            align="center"
            prop="bank_guarantee_usage"
            label="银行保函"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[20].isShow"
            sortable
            align="center"
            prop="financial_derivatives_usage"
            label="衍生交易"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[21].isShow"
            sortable
            align="center"
            prop="other_usage"
            label="其他"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="columnHeaders[22].isShow"
            sortable
            align="right"
            prop="total_usage"
            label="小计"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="showEditDialog(scope.row)"
                size="mini"
                >修改</el-button
              >
              <el-button
                @click="delBankfacilities(scope.row)"
                type="danger"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        :append-to-body="true"
        title="添加用户"
        :visible.sync="dialogFormVisible"
        width="35%"
        @change="addClosedbankfacilities"
      >
        <el-form
          :model="addForm"
          :rules="bankaddrules"
          ref="addFormRef"
          label-width="170px"
        >
          <el-form-item label="公司名称" prop="company_name">
            <el-input
              placeholder="请输入公司名称"
              v-model="addForm.company_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="总行" prop="bank_main_name">
            <el-input
              placeholder="请输入总行"
              v-model="addForm.bank_main_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="分支行" prop="bank_branch">
            <el-input
              placeholder="请输入分支行"
              v-model="addForm.bank_branch"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="币种" prop="currency">
            <el-input
              placeholder="请输入币种"
              v-model="addForm.currency"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="总授信金额(亿)" prop="total_credit_amount">
            <el-input
              placeholder="请输入总授信金额(亿)"
              v-model="addForm.total_credit_amount"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="可用授信" prop="available_total_credit_amount">
            <el-input
              placeholder="请输入可用授信"
              v-model="addForm.available_total_credit_amount"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="可用金额" prop="available_credit_balance">
            <el-input
              placeholder="请输入可用金额"
              v-model="addForm.available_credit_balance"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用信比例" prop="percentage_credit_usage">
            <el-input
              placeholder="请输入用信比例"
              v-model="addForm.percentage_credit_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开始日期" prop="credit_start_date">
            <el-input
              placeholder="请输入开始日期例: yyyy-mm-dd格式"
              v-model="addForm.credit_start_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="到期日期" prop="credit_end_date">
            <el-input
              placeholder="请输入到期日期例: yyyy-mm-dd格式"
              v-model="addForm.credit_end_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="流贷(用信条件及费率)"
            prop="floating_loan_interest_rate"
          >
            <el-input
              placeholder="请输入流贷(用信条件及费率)"
              v-model="addForm.floating_loan_interest_rate"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="银票(用信条件及费率)" prop="bab_fees">
            <el-input
              placeholder="请输入银票(用信条件及费率)"
              v-model="addForm.bab_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国内证(用信条件及费率)" prop=" domestic_lc_fees">
            <el-input
              placeholder="请输入国内证(用信条件及费率)"
              v-model="addForm.domestic_lc_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国际证" prop="international_lc_fees">
            <el-input
              placeholder="请输入国际证"
              v-model="addForm.international_lc_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="保证金率" prop=" margin_interest_rate">
            <el-input
              placeholder="请输入保证金率"
              v-model="addForm.margin_interest_rate"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用信期限" prop=" bank_credit_duration">
            <el-input
              placeholder="请输入用信期限"
              v-model="addForm.bank_credit_duration"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="短期贷款" prop=" short_term_loan_usage">
            <el-input
              placeholder="请输入短期贷款"
              v-model="addForm.short_term_loan_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="BAB" prop="bab_usage">
            <el-input
              placeholder="请输入BAB"
              v-model="addForm.bab_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="长期贷款" prop="long_term_loan">
            <el-input
              placeholder="请输入长期贷款"
              v-model="addForm.long_term_loan"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国内证" prop="domestic_lc_usage">
            <el-input
              placeholder="请输入国内证"
              v-model="addForm.domestic_lc_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国际证" prop="international_lc_usage">
            <el-input
              placeholder="请输入国际证"
              v-model="addForm.international_lc_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="外汇交易" prop="forex_usage">
            <el-input
              placeholder="请输入外汇交易"
              v-model="addForm.forex_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="银行保函" prop="bank_guarantee_usage">
            <el-input
              placeholder="请输入银行保函"
              v-model="addForm.bank_guarantee_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="衍生交易" prop="financial_derivatives_usage">
            <el-input
              placeholder="请输入衍生交易"
              v-model="addForm.financial_derivatives_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="其他" prop="other_usage">
            <el-input
              placeholder="请输入其他"
              v-model="addForm.other_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="小计" prop="total_usage">
            <el-input
              placeholder="请输入小计"
              v-model="addForm.total_usage"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :append-to-body="true"
        title="修改用户"
        :visible.sync="editDialogVisble"
        width="35%"
      >
        <el-form
          :model="editForm"
          ref="editFormRef"
          :rules="bankaddrules"
          label-width="170px"
        >
          <el-form-item label="公司名称" prop="company_name">
            <el-input
              placeholder="请输入公司名称"
              :disabled="true"
              v-model="editForm.company_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="总行" prop="bank_main_name">
            <el-input
              placeholder="请输入总行"
              :disabled="true"
              v-model="editForm.bank_main_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="分支行" prop="bank_branch">
            <el-input
              placeholder="请输入分支行"
              :disabled="true"
              v-model="editForm.bank_branch"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="币种" prop="currency">
            <el-input
              placeholder="请输入币种"
              v-model="editForm.currency"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="总授信金额(亿)" prop="total_credit_amount">
            <el-input
              placeholder="请输入总授信金额"
              v-model="editForm.total_credit_amount"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="可用授信" prop="available_total_credit_amount">
            <el-input
              placeholder="请输入可用授信"
              v-model="editForm.available_total_credit_amount"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="可用金额" prop="available_credit_balance">
            <el-input
              placeholder="请输入可用可用金额"
              v-model="editForm.available_credit_balance"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用信比例" prop="percentage_credit_usage">
            <el-input
              placeholder="请输入用信比例"
              v-model="editForm.percentage_credit_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开始日期" prop="credit_start_date">
            <el-input
              placeholder="请输入开始日期例: yyyy-mm-dd格式"
              v-model="editForm.credit_start_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="到期日期" prop="credit_end_date">
            <el-input
              placeholder="请输入到期日期例: yyyy-mm-dd格式"
              v-model="editForm.credit_end_date"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="流贷(用信条件及费率)"
            prop="floating_loan_interest_rate"
          >
            <el-input
              placeholder="请输入流贷(用信条件及费率)"
              v-model="editForm.floating_loan_interest_rate"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="银票(用信条件及费率)" prop="bab_fees">
            <el-input
              placeholder="请输入银票(用信条件及费率)"
              v-model="editForm.bab_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国内证(用信条件及费率)" prop=" domestic_lc_fees">
            <el-input
              placeholder="请输入国内证(用信条件及费率)"
              v-model="editForm.domestic_lc_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="国际证(用信条件及费率)"
            prop="international_lc_fees"
          >
            <el-input
              placeholder="请输入国际证(用信条件及费率)"
              v-model="editForm.international_lc_fees"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="保证金率" prop="margin_interest_rate">
            <el-input
              placeholder="请输入保证金率"
              v-model="editForm.margin_interest_rate"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用信期限" prop="bank_credit_duration">
            <el-input
              placeholder="请输入用信期限"
              v-model="editForm.bank_credit_duration"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="短期贷款" prop=" short_term_loan_usage">
            <el-input
              placeholder="请输入短期贷款"
              v-model="editForm.short_term_loan_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="BAB" prop=" bab_usage">
            <el-input
              placeholder="请输入BAB"
              v-model="editForm.bab_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="长期贷款" prop="long_term_loan">
            <el-input
              placeholder="请输入长期贷款"
              v-model="editForm.long_term_loan"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国内证" prop="domestic_lc_usage">
            <el-input
              placeholder="请输入国内证"
              v-model="editForm.domestic_lc_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="国际证" prop="international_lc_usage">
            <el-input
              placeholder="请输入国际站证"
              v-model="editForm.international_lc_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="外汇交易" prop="forex_usage">
            <el-input
              placeholder="请输入外汇交易"
              v-model="editForm.forex_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="银行保函" prop="bank_guarantee_usage">
            <el-input
              placeholder="请输入银行保函"
              v-model="editForm.bank_guarantee_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="衍生交易" prop="financial_derivatives_usage">
            <el-input
              placeholder="请输入衍生交易"
              v-model="editForm.financial_derivatives_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="其他" prop="other_usage">
            <el-input
              placeholder="请输入其他"
              v-model="editForm.other_usage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="小计" prop="total_usage">
            <el-input
              placeholder="请输入小计"
              :disabled="true"
              v-model="editForm.total_usage"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisble = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[15, 20, 25, 30]"
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
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  reqbankfacilities,
  reqdelbankfacilities,
  reqeditbankfacilities,
  reqaddbankfacilities
} from "@/api/bank.js";
const columnSelecteds = [
  "公司名称",
  "总行",
  "分支行",
  "币种",
  "总授信金额",
  "可用授信",
  "可用金额",
  "用信比例",
  "开始日期",
  "到期日期",
  "用信条件及相关费率",
  "保证金利率",
  "用信期限",
  "短期贷款",
  "BAB",
  "长期贷款",
  "国内证",
  "国际证",
  "外汇交易",
  "银行保函",
  "衍生交易",
  "其他",
  "小计"
];
export default {
  name: "Bankfacilities",
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      cities: columnSelecteds,
      columnHeaders: [
        { index: 0, title: "公司名称", isShow: true },
        { index: 1, title: "总行", isShow: true },
        { index: 2, title: "分支行", isShow: true },
        { index: 3, title: "币种", isShow: true },
        { index: 4, title: "总授信金额", isShow: true },
        { index: 5, title: "可用授信", isShow: true },
        { index: 6, title: "可用金额", isShow: true },
        { index: 7, title: "用信比例", isShow: true },
        { index: 8, title: "开始日期", isShow: true },
        { index: 9, title: "到期日期", isShow: true },
        { index: 10, title: "用信条件及相关费率", isShow: true },
        { index: 11, title: "保证金利率", isShow: true },
        { index: 12, title: "用信期限", isShow: true },
        { index: 13, title: "短期贷款", isShow: true },
        { index: 14, title: "BAB", isShow: true },
        { index: 15, title: "长期贷款", isShow: true },
        { index: 16, title: "国内证", isShow: true },
        { index: 17, title: "国际证", isShow: true },
        { index: 18, title: "外汇交易", isShow: true },
        { index: 19, title: "银行保函", isShow: true },
        { index: 20, title: "衍生交易", isShow: true },
        { index: 21, title: "其他", isShow: true },
        { index: 22, title: "小计", isShow: true }
      ],
      bankaddrules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        bank_main_name: [
          { required: true, message: "请输入总行", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        currency: [
          { required: true, message: "请输入币种", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        total_credit_amount: [
          { required: true, message: "请输入总授信金额", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        available_total_credit_amount: [
          { required: true, message: "请输入可用授信", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        available_credit_balance: [
          { required: true, message: "请输入可用金额", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        percentage_credit_usage: [
          { required: true, message: "请输入用信比例", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ]
      },
      total: 1,
      size: 15,
      currentPage2: 1,
      company_name_val: [],
      bank_main_name_val: [],
      bank_branch_val: [],
      currency_val: [],
      bank_main_name_input: [],
      company_name_input: [],
      bank_branch_input: [],
      currency_input: [],
      searchcompany_name_input: [],
      searchbank_main_name_input: [],
      searchbank_branch_input: [],
      searchcurrency_input: [],
      editId: "",
      dialogFormVisible: false,
      editDialogVisble: false,
      bankfacilitiesList: [],
      addForm: {
        id: "",
        company_name: "",
        bank_main_name: "",
        bank_branch: "",
        currency: "",
        total_credit_amount: "",
        available_total_credit_amount: "",
        available_credit_balance: "",
        percentage_credit_usage: "",
        credit_start_date: null,
        credit_end_date: null,
        floating_loan_interest_rate: "",
        bab_fees: "",
        domestic_lc_fees: "",
        international_lc_fees: "",
        margin_interest_rate: "",
        bank_credit_duration: "",
        short_term_loan_usage: "",
        bab_usage: "",
        long_term_loan: "",
        domestic_lc_usage: "",
        international_lc_usage: "",
        forex_usage: "",
        bank_guarantee_usage: "",
        financial_derivatives_usage: "",
        other_usage: "",
        total_usage: ""
      },
      editForm: {
        company_name: "",
        bank_main_name: "",
        bank_branch: "",
        currency: "",
        total_credit_amount: "",
        available_total_credit_amount: "",
        available_credit_balance: "",
        percentage_credit_usage: "",
        credit_start_date: "",
        credit_end_date: "",
        floating_loan_interest_rate: "",
        bab_fees: "",
        domestic_lc_fees: "",
        international_lc_fees: "",
        margin_interest_rate: "",
        bank_credit_duration: "",
        short_term_loan_usage: "",
        bab_usage: "",
        long_term_loan: "",
        domestic_lc_usage: "",
        international_lc_usage: "",
        forex_usage: "",
        bank_guarantee_usage: "",
        financial_derivatives_usage: "",
        other_usage: "",
        total_usage: ""
      }
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getbankfacilitiesList();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      this.getbankfacilitiesList();
    },
    searchobj(val) {
      this.company_name_val = val;
    },
    searchobj1(val) {
      this.bank_main_name_val = val;
    },
    searchobj2(val) {
      this.bank_branch_val = val;
    },
    searchobj3(val) {
      this.currency_val = val;
    },
    async getbankfacilitiesList() {
      const { data: res } = await reqbankfacilities(
        this.currentPage2,
        this.size,
        this.company_name_val,
        this.bank_main_name_val,
        this.bank_branch_val,
        this.currency_val
      );
      this.bankfacilitiesList = res.results.data;
      this.searchcompany_name_input = res.results.unique_data.company_name;
      this.searchbank_main_name_input = res.results.unique_data.bank_main_name;
      this.searchbank_branch_input = res.results.unique_data.bank_branch;
      this.searchcurrency_input = res.results.unique_data.currency;
      this.total = res.count;
    },
    async delBankfacilities(row) {
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
      /*       console.log(row.id); */
      await reqdelbankfacilities(row.id);
      this.getbankfacilitiesList();
    },
    //修改弹出表单,数据回显
    async showEditDialog(row) {
      this.editId = row.id;
      console.log(row.id, "pp");
      const res = await reqeditbankfacilities(row.id);
      /*  console.log(res, "iiii"); */
      this.editForm = res.data;
      this.editDialogVisble = true;
    },
    //修改确认提交表单
    async editUserInfo() {
      this.$refs.editFormRef.validate(async valida => {
        if (!valida) return;
        //  console.log(this.editId, "llll");
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
        const res = reqeditbankfacilities(this.editId, this.editForm);
        if (res.status !== 200) {
          this.$message.error("更新用户信息失败!");
        }
        this.$message.success("更新用户信息成功!");
        this.editDialogVisble = false;
        this.getbankfacilitiesList();
      });
    },
    async addUserInfo() {
      this.$refs.addFormRef.validate(async valid => {
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
        const res = await reqaddbankfacilities(this.addForm);
        if (res.status !== 200) {
          this.$message.error("添加用户信息失败!");
        }
        this.$message.success("添加用户信息成功!");
        this.dialogFormVisible = false;
        this.getbankfacilitiesList();
      });
    },
    addClosedbankfacilities() {
      this.$refs.addFormRef.resetFields();
    },
    /*    aditClosedbankfacilities() {
      this.$refs.editFormRef.resetFields();
    } */
    /*     addClosed() {
      this.$refs.addFormRef.resetFields();
    }, */
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
          "银行授信管理.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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
            this.$refs.multipleTable.doLayout();
          });
        } else {
          // 显示已选中的列
          item.isShow = true;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        }
      });
    }
  },
  mounted() {
    this.getbankfacilitiesList();
  }
};
</script>

<style lang="less" scoped>
.card-box {
  /*   height: 1600px; */
  position: relative;
  width: 100%;
  .table-box {
    padding-top: 15px;
  }
  .icon-box {
    top: 105px;
    right: 40px;
    position: absolute;
  }
  .top-box {
    position: absolute;
    top: 40px;
    left: 45%;
  }
  .button-box {
    position: absolute;
    bottom: 24px;
    right: 18px;
  }
}
</style>
