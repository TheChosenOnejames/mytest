<!--
 * @Date: 2022-07-04 09:33:36
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 14:47:41
 * @Description: 
-->
<template>
  <div>
    <el-card class="box-card">
      <div style="padding-bottom:15px">
        <el-breadcrumb
          style="padding-bottom:15px"
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item>业务盈亏</el-breadcrumb-item>

          <el-breadcrumb-item :to="{ path: '/shareoptionmarket' }"
            >期权做市</el-breadcrumb-item
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
          <el-breadcrumb-item>期货做市</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box-big">
        <div class="left-box">
          <el-button size="mini" type="primary" @click="exportExcel"
            >导出表格</el-button
          >
          <h1 style="padding-bottom:5px;;text-align: center;">
            期货做市盈亏数据表
          </h1>
          <h1 style="padding-bottom:10px;text-align: center;">
            （单位：元）
          </h1>
          <el-table
            style="font-size:10px"
            fiexd
            :row-style="{ height: '43px' }"
            height="800"
            border
            class="table"
            :data="banktotalList"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              width="90"
              align="center"
              prop="instrument_name"
              label="品种"
              sortable
            >
            </el-table-column>
            <el-table-column
              width="120"
              prop="settlement_profit"
              align="right"
              label="平仓盈亏"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="transaction_fees"
              align="right"
              label="手续费"
              sortable
            >
            </el-table-column>
            <el-table-column
              width="120"
              prop="change_floating_profit"
              label="浮盈变动"
              sortable
              align="right"
            >
            </el-table-column>
            <el-table-column prop="value" align="right" label="总盈亏" sortable>
            </el-table-column>
          </el-table>
        </div>
        <div class="right-box" style="padding-left:5px">
          <!--     <div class="right-top-button"></div> -->
          <div class="right-box-top">
            <div class="date-picker-top">
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
                collapse-tags
                v-model="value2"
                multiple
                filterable
                allow-create
                default-first-option
                clearable
                placeholder="请选择"
                @change="addobjs"
              >
                <el-option
                  v-for="item in addvariety"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button
                style="margin-left:10px"
                type="primary"
                @click="getvarietyList"
                >查询</el-button
              >
              <h1 style="padding-top:10px;padding-left: 400px;">
                期货做市逐日盈亏图（单位：元）
                <span class="el-icon-bottom" @click="download"></span>
              </h1>
            </div>
            <div class="line-box" style="margin-top:100px">
              <ve-line
                width="100%"
                id="charts"
                :data="chartData"
                :settings="chartSettings"
              ></ve-line>
            </div>
          </div>
          <div class="right-buttom-button"></div>
          <h1>
            期货做市分交易所累计盈亏图（单位：元）
            <span class="el-icon-download" @click="downloads"></span>
          </h1>
          <div class="date-picker-button">
            <ve-pie
              width="100%"
              style="padding-top:10px"
              id="chartss"
              ref="charts"
              :data="chartDatas"
              :settings="chartSettingss"
            ></ve-pie>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { reqProfitandloss } from "@/api/bank.js";
export default {
  name: "futuresmarket",
  data() {
    this.chartSettings = { scale: [true] };
    this.chartSettingss = {
      dimension: "label",
      metrics: "value",
      scale: [true],
      itemStyle: {
        normal: {
          color: function(params) {
            var colorList = ["#FFc000", "#409eff", "#FF9933"];
            return colorList[params.dataIndex];
          }
        }
      }
    };
    return {
      banktotalList: [],
      date: [],
      chartDatas: {},
      addvarietyList: [],
      addvariety: [],
      value1: "",
      value2: "",
      chartData: {},
      total_data: []
    };
  },
  methods: {
    download() {
      // const charts = this.$refs.charts.getElementsByTagName("canvas");
      const charts = document
        .getElementById("charts")
        .getElementsByTagName("canvas");
      // 创建标签
      const element = document.createElement("a");
      // 设置下载名称
      element.download = "期货做市逐日盈亏图" + ".png";
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png");
      // 触发下载事件
      element.click();
      // 移除标签
      element.remove();
    },
    downloads() {
      const charts = document
        .getElementById("chartss")
        .getElementsByTagName("canvas");
      // 创建标签
      const element = document.createElement("a");
      // 设置下载名称
      element.download = "期货做市分交易所累计盈亏图" + ".png";
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png");
      document.body.appendChild(element);
      // 触发下载事件
      element.click();
      // 移除标签
      element.remove();
    },
    exportExcel() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = "期货做市盈亏数据表" + year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
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

    addobjs(vals) {
      this.addvarietyList = vals;
    },
    async getvarietyList() {
      const [beginPubdate, endPubdate] = this.date || [];
      const { data: res } = await reqProfitandloss(
        this.addvarietyList,
        beginPubdate,
        endPubdate
      );
      this.addvariety = res.results.instrument_list;
      this.chartDatas = {
        columns: ["label", "value"],
        rows: res.results.pie_diagram_data
      };
      //console.log(this.chartDatas, "99");
      this.chartData = {
        columns: ["日期", "盈亏"],
        rows: res.results.line_plot_data
      };
      this.banktotalList = res.results.table_data;
      // console.log(res.results, "00");

      // console.log(res.results.total_data, "090");
      this.total_data = res.results.total_data;
    }
  },
  mounted() {
    this.getvarietyList();
  }
};
</script>
<style lang="less" scoped>
/deep/.el-card__body {
  padding: 15px;
  margin: 0;
}

.box-card {
  width: 100%;
  position: relative;
  //height: 100%;
  .box-big {
    height: 100%;
    // background-color: pink;
    position: relative;
    .left-box {
      padding-bottom: 10px;
      //   height: 100%;
      // background-color: skyblue;
      width: 580px;
      // display: inline-block;
      float: left;
    }
    .right-box {
      position: absolute;
      left: 580px;
      right: 0;
      display: inline-block;
      text-align: center;
      overflow: hidden;
      .right-top-button {
        text-align: left;
      }
      .right-buttom-button {
        text-align: left;
      }

      .right-box-top {
        width: 100%;
        height: 100%;
        .date-picker-top {
          position: absolute;
          top: 0;

          /*  padding-bottom: 10px; */
          //margin: 0 auto;
        }
        /*        .date-picker-button {
          // padding-bottom: 10px;
          margin: 0 auto;
        } */
        span {
          border-bottom: 1px solid #000;
        }
      }
    }
  }
}
</style>
