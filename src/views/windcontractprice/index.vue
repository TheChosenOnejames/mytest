<!--
 * @Date: 2022-11-03 13:10:19
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 15:18:30
 * @Description: 
-->
<template>
  <div>
    <el-card>
      <div style="margin-bottom:10px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>业务核算</el-breadcrumb-item>
          <el-breadcrumb-item>WIND合约价格表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-select
        clearable
        filterable
        v-model="value3"
        multiple
        collapse-tags
        style="margin-right: 20px;"
        placeholder="请选择"
      >
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
        style="margin-left:10px"
        @click="getWinddataList"
        >查询</el-button
      >
      <el-button
        type="info"
        @click="dialogVisible = true"
        style="margin-left:10px"
        >数据同步</el-button
      >
      <el-button type="success" style="margin-left:10px" @click="exportExcelsss"
        >文件导出</el-button
      >
      <div class="table-box" style="margin-top:15px; ">
        <el-table
          height="700"
          v-loading="loading"
          id="table"
          :data="getList"
          border
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column label="#" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="wind_instrument_code"
            label="wind合约代码"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="instrument_code"
            label="合约代码"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="instrument_type"
            label="品种"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="data_date"
            label="数据日期"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="number_date"
            label="数值型日期"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="recent_month_flag"
            label="近月合约标识"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="main_contract_flag"
            label="主力合约标识"
          >
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="closing_price"
            label="收盘价"
          >
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="settlement_price"
            label="结算价"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        append-to-body
        title="数据同步"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-date-picker
          v-model="value2"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendDate">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[50, 100, 150]"
        :page-size="size"
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
import { reqWindData, reqWindDate, reqWindDownload } from "@/api/wind.js";
export default {
  name: "WindContractprice",
  data() {
    return {
      loading: false,
      date: "",
      value2: "",
      value3: [],
      dialogVisible: false,
      getList: [],
      typeList: [],
      total: 1,
      currentPage2: 1,
      size: 50
    };
  },
  methods: {
    handleSizeChange(newsize) {
      this.size = newsize;
      //  console.log(`每页 ${newsize} 条`);
      this.getWinddataList();
    },
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${newpage}`);
      this.currentPage2 = newpage;
      this.getWinddataList();
    },
    //获取wind数据列表
    async getWinddataList() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqWindData(
        this.currentPage2,
        this.size,
        beginPubdate,
        endPubdate,
        this.value3
      );
      this.total = res.data.count;
      this.getList = res.data.results.data;
      this.typeList = res.data.results.instrument_code_list;
      if (res.status !== 200) {
        this.$message.error("获取数据失败");
      }
      this.$message.success("获取列表成功");
    },
    //数据同步
    async sendDate() {
      this.loading = true;
      this.dialogVisible = false;
      const res = await reqWindDate(this.value2);
      if (res.status !== 200) {
        this.$message.error("数据同步失败");
      }
      this.$message.success("数据同步成功");
      this.loading = false;
    },
    //导出文件
    async exportExcelsss() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqWindDownload(this.value3, beginPubdate, endPubdate);
      saveAs(res.data, "Wind合约价格表.xlsx");
    }
  },
  created() {
    this.getWinddataList();
  }
};
</script>

<style></style>
