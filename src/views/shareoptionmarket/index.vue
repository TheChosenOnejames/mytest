<!--
 * @Date: 2022-07-19 09:03:22
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 14:48:18
 * @Description: 
-->
<template>
  <div class="container">
    <el-card class="card-box">
      <el-breadcrumb
        style="padding-bottom:15px"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>业务盈亏</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/futuresmarket' }"
          >期货做市</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/gtssubaccountcloseout' }"
          >gts子账户平仓统计</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/gtssubaccountfloat' }"
          >gts子账户浮动统计</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/gtssubaccountsplit' }"
          >gts子账户拆分统计</el-breadcrumb-item
        >
        <el-breadcrumb-item>期权做市</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="top-time-box">
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
        <el-select
          filterable
          default-first-option
          v-model="value2"
          multiple
          clearable
          collapse-tags
          placeholder="请选择"
          @change="addobjs"
        >
          <el-option
            v-for="item in getvarietyshareoptions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          style="margin-left:10px"
          type="primary"
          @click="getOptionsList"
          >查询</el-button
        >
      </div>
      <h1 style="padding-bottom:30px;text-align: center;">
        期权做市盈亏数据表（单位：元）
      </h1>
      <el-button size="mini" type="primary" @click="exportExcels"
        >导出表格</el-button
      >
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        fiexd
        class="table"
        style="margin-top: 10px; width: 100%"
        height="300"
        :data="getoptionobj"
        border
      >
        <el-table-column
          width="110"
          align="center"
          sortable
          prop="instrument_name"
          label="品种"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="settlement_profit"
          label="期货平仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="transaction_fees"
          label="期货手续费"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="change_floating_profit"
          label="期货浮盈变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="option_settlement_profit"
          label="期权平仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="change_option_floating_profit"
          label="期权浮盈变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="option_transaction_fees"
          label="期权手续费"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="option_exercise_fees"
          label="行权手续费"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="value"
          label="总盈亏"
          width="200"
        >
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div class="bottom-left-box">
          <h1 style="padding-bottom:10px;padding-top:20px;;text-align: center;">
            期权做市分交易所累计盈亏图（单位：元）

            <span
              @click="downloadpieshareoption"
              class="el-icon-download"
            ></span>
          </h1>
          <ve-pie
            id="charts"
            :data="chartDatas"
            :settings="chartSettingss"
          ></ve-pie>
        </div>
        <div class="bottom-right-box">
          <h1 style="padding-top:5px">
            期权做市逐日盈亏图（单位：元）
            <span
              @click="downloadlineshareoption"
              class="el-icon-download"
            ></span>
          </h1>
          <ve-line
            width="100%"
            id="chartss"
            :data="chartData"
            :settings="chartSettings"
          ></ve-line>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reqOptions } from "@/api/bank.js";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default {
  data() {
    this.chartSettingss = {
      dimension: "label",
      metrics: "value",
      scale: [true],
      itemStyle: {
        normal: {
          color: function(params) {
            var colorList = ["#FFc000", "#409eff", "#FF9933", "#99ccff"];
            return colorList[params.dataIndex];
          }
        }
      }
    };
    this.chartSettings = {};
    return {
      date: [],
      getvarietyshareoptions: [],
      chartData: [],
      chartDatas: [],
      getoptionobj: [],
      addvarietyList: [],
      value1: [],
      value2: []
    };
  },
  methods: {
    downloadpieshareoption() {
      // const charts = this.$refs.charts.getElementsByTagName("canvas");
      const charts = document
        .getElementById("charts")
        .getElementsByTagName("canvas");
      // 创建标签
      const element = document.createElement("a");
      // 设置下载名称
      element.download = "期权做市逐日盈亏图" + ".png";
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png");
      document.body.appendChild(element);
      // 触发下载事件
      element.click();
      // 移除标签
      element.remove();
    },
    downloadlineshareoption() {
      // const charts = this.$refs.charts.getElementsByTagName("canvas");
      const charts = document
        .getElementById("chartss")
        .getElementsByTagName("canvas");
      // 创建标签
      const element = document.createElement("a");
      // 设置下载名称
      element.download = "期权做市逐日盈亏图" + ".png";
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png");
      document.body.appendChild(element);
      // 触发下载事件
      element.click();
      // 移除标签
      element.remove();
    },
    addobjs(val) {
      this.addvarietyList = val;
    },
    exportExcels() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = "期权做市盈亏数据表" + year + "" + month + "" + day;
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    async getOptionsList() {
      const [beginPubdate, endPubdate] = this.date || [];
      const { data: res } = await reqOptions(
        this.addvarietyList,
        beginPubdate,
        endPubdate
      );
      this.getoptionobj = res.results.table_data;
      this.chartDatas = {
        columns: ["label", "value"],
        rows: res.results.pie_diagram_data
      };
      this.chartData = {
        columns: ["日期", "盈亏"],
        rows: res.results.line_plot_data
      };
      this.getvarietyshareoptions = res.results.instrument_list;
    }
  },

  mounted() {
    this.getOptionsList();
  }
};
</script>

<style scoped lang="less">
.card-box {
  width: 100%;
  position: relative;
  // height: 1200px;
  .top-time-box {
    position: absolute;
    top: 9%;
    left: 30%;
    transform: 50%, 50%;
  }
  .box-table {
    width: 100%;
  }
  .bottom-box {
    width: 100%;
    display: flex;
    .bottom-left-box {
      margin-top: 10px;
      width: 500px;
    }
    .bottom-right-box {
      text-align: center;
      margin-left: 10px;
      margin-top: 10px;
      width: 100%;

      flex-grow: 1;
    }
  }
}
</style>
