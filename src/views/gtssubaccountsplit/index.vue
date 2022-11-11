<!--
 * @Date: 2022-10-20 10:59:09
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-26 16:16:47
 * @Description: 
-->
<template>
  <div class="container">
    <el-card class="box-card">
      <el-breadcrumb
        style="padding-bottom:10px"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>市盈亏</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/futuresmarket' }"
          >期货做市</el-breadcrumb-item
        >
        <el-breadcrumb-item>期权做市</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="top-box">
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button
          type="primary"
          @click="getgtssubaccountSplitlist"
          style="margin-left:10px"
          >查询</el-button
        >
        <el-button type="info" @click="count">计算</el-button>
        <el-button type="success" @click="fileExport">文件导出</el-button>
      </div>
      <el-table
        :header-cell-style="{
          'text-align': 'center',
          height: '20px',
          padding: '10px'
        }"
        border
        :data="gtssubaccountSplitlist"
        stripe
        style="width: 100%"
      >
        <el-table-column
          align="center"
          sortable
          prop="subaccount_code"
          label="子账户编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="number_date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          sortable
          prop="instrument_type"
          label="品种"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          width="150"
          prop="instrument_name"
          label="品种名称"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="futures_change_floating_profit"
          label="浮盈变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="futures_settlement_profit"
          label="平仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="futures_transaction_fees"
          label="期货手续费"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="net_option_premium"
          label="权利金收支"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="option_fees"
          label="期权手续费"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          show-overflow-tooltip
          width="220"
          prop="option_net_value_change"
          label="期权多空市值差异变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="total_futures_profit"
          label="期货端盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="total_option_profit"
          label="期权端盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="option_change_floating_profit"
          label="期权浮盈变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="option_settlement_profit"
          label="期权平仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="150"
          prop="total_profit"
          label="汇总盈亏"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          width="180"
          prop="pre_classified_department"
          label="未重分类部门"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          width="150"
          prop="project_category"
          label="项目 "
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          width="150"
          prop="instrument_category"
          label="分类"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          width="150"
          prop="department"
          label="部门"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[50, 100, 150, 200]"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import fileDownload from "js-file-download";
import {
  reqgtssubaccountSplit,
  reqgtssubaccountSplitdate,
  reqgtssubaccountexport
} from "@/api/gtssubaccountsplit.js";

export default {
  name: "Gtssubaccountsplit",
  data() {
    return {
      filename: "GTS子账户拆分数据",
      total: 1,
      currentPage2: 1,
      date: "",
      gtssubaccountSplitlist: []
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getgtssubaccountSplitlist();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      this.getgtssubaccountSplitlist();
    },
    async getgtssubaccountSplitlist() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqgtssubaccountSplit(
        this.currentPage2,
        this.size,
        beginPubdate,
        endPubdate
      );
      this.total = res.data.count;
      this.gtssubaccountSplitlist = res.data.results;
    },
    async count() {
      const [beginPubdate, endPubdate] = this.date || [];
      await reqgtssubaccountSplitdate(beginPubdate, endPubdate);
    },
    fileExport() {
      const [beginPubdate, endPubdate] = this.date || [];
      reqgtssubaccountexport(beginPubdate, endPubdate).then(res => {
        saveAs(res.data, "GTS子账户拆分数据.xlsx");
      });
    }
  },
  created() {
    this.getgtssubaccountSplitlist();
  }
};
</script>

<style lang="less" scoped>
.top-box {
  margin-bottom: 15px;
}
</style>
