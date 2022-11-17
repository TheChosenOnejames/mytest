<!--
 * @Date: 2022-10-20 10:53:05
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 15:29:07
 * @Description: 
-->
<template>
  <div class="container">
    <el-card>
      <el-breadcrumb
        style="padding-bottom:15px"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>业务盈亏</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/futuresmarket' }"
          >期货做市</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/shareoptionmarket' }"
          >期权做市</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/gtssubaccountcloseout' }"
          >gts子账户平仓统计</el-breadcrumb-item
        >

        <el-breadcrumb-item :to="{ path: '/gtssubaccountsplit' }"
          >gts子账户拆分统计</el-breadcrumb-item
        >
        <el-breadcrumb-item>gts子账户浮动统计</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="top-box" style="margin-bottom:15px;">
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
          style="margin-left:5px"
          type="primary"
          @click="getgtssubaccountfloat"
          >查询</el-button
        >
        <el-button type="success" slot="reference" @click="dialogVisible = true"
          >文件导入</el-button
        >
      </div>
      <div class="table-box" style="margin-bottom:15px">
        <el-table
          height="700"
          v-loading="loading"
          :header-cell-style="{
            'text-align': 'center',
            height: '20px',
            padding: '5px'
          }"
          border
          :data="getgtssubaccountfloatList"
          stripe
          style="width: 100%"
        >
          <el-table-column
            align="center"
            sortable
            prop="serial_number"
            label="序号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="trading_day"
            label="结算日期"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            sortable
            prop="organization_name"
            label="机构"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            sortable
            prop="asset_unit_code"
            label="资产单元"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            show-overflow-tooltip
            sortable
            prop="asset_unit_name"
            label="资产单元名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            sortable
            prop="exchange_code"
            label="交易所代码"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            sortable
            prop="underlying_product_id"
            label="品种代码"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            sortable
            prop="exchangeinst_id"
            label="合约代码"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            sortable
            prop="direction"
            label="买卖"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="230"
            sortable
            prop="hedge_flag"
            label="投保标志"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            sortable
            prop="previous_holding_amount"
            label="昨仓"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            sortable
            prop="current_holding_amount"
            label="今仓"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            show-overflow-tooltip
            sortable
            prop="total_holding_amount"
            label="持仓量"
          >
          </el-table-column>
          <el-table-column
            align="right"
            show-overflow-tooltip
            sortable
            prop="average_price"
            width="150"
            label="开仓均价"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="200"
            show-overflow-tooltip
            sortable
            prop="position_profit_by_date"
            label="逐日持仓盈亏"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="200"
            sortable
            prop="position_profit_by_trade"
            label="逐笔持仓盈亏"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="200"
            show-overflow-tooltip
            sortable
            prop="margin"
            label="持仓保证金"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="150"
            sortable
            prop="last_settlement_price"
            label="昨结算价"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="150"
            show-overflow-tooltip
            sortable
            prop="settlement_price"
            label="今结算价"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            sortable
            prop="currency_type"
            label="币种"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            show-overflow-tooltip
            sortable
            prop="sub_account_code"
            label="子账户号"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            show-overflow-tooltip
            sortable
            prop="department"
            label="部门"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            sortable
            prop="project"
            label="项目"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            sortable
            prop="underlying_asset_type"
            label="标的属性"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="150"
            show-overflow-tooltip
            sortable
            prop="opening_position_profit_by_trade"
            label="期初逐笔持盈"
          >
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            sortable
            prop="asset_category"
            label="标的分类"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="150"
            sortable
            prop="option_market_value"
            show-overflow-tooltip
            label="期权市值"
          >
          </el-table-column>
          <el-table-column
            align="right"
            width="150"
            show-overflow-tooltip
            sortable
            prop="option_floating_profit"
            label="期权浮动盈亏"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[50, 100, 150, 200]"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <div>
        <el-dialog
          :modal-append-to-body="false"
          title="文件excel上传"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <el-upload
            ref="upload"
            drag
            :limit="limitNum"
            :auto-upload="false"
            accept=".xls,.xlsx"
            :action="UploadUrl()"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传excel文件，且不超过10M
            </div>
          </el-upload>
          <br />
          <el-button size="small" type="primary" @click="uploadFile"
            >立即上传</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  reqgtssubaccountfloat,
  reqgtssubaccountfloatUpload
} from "@/api/gtssubaccountfloat.js";
export default {
  name: "Gtssubaccountfloat",
  data() {
    return {
      loading: false,
      visible: false,
      type: "",
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [],
      total: 1,
      getgtssubaccountfloatList: [],
      currentPage2: 1,
      date: "",
      dialogVisible: false
    };
  },
  methods: {
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
          fileList.length} 个`
      );
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw);
      this.fileList.push(file.raw);
      console.log(this.fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx" || "xls") {
        this.$message.warning("只能上传后缀是.xlsx或者xls的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    UploadUrl: function() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    uploadFile() {
      this.loading = true;
      this.dialogVisible = false;
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        let form = new FormData();
        form.append("file", this.fileList[0]);
        reqgtssubaccountfloatUpload(form).then(res => {
          if (res.status == 200) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            this.loading = false;
            this.$refs.upload.clearFiles();
            this.fileList = [];
            this.getgtssubaccountfloat();
          }
        });
      }
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      console.log(newSize);
      this.getgtssubaccountfloat();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      console.log(newpage);
      this.getgtssubaccountfloat();
    },
    async getgtssubaccountfloat() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqgtssubaccountfloat(
        this.currentPage2,
        this.size,
        beginPubdate,
        endPubdate
      );
      console.log(res.data.count, "ppppp");
      this.getgtssubaccountfloatList = res.data.results;
      this.total = res.data.count;
    }
  },
  created() {
    this.getgtssubaccountfloat();
  }
};
</script>

<style></style>
