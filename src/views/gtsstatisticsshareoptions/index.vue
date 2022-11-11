<!--
 * @Date: 2022-10-26 16:25:08
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-04 11:27:23
 * @Description: 
-->
<template>
  <div class="container">
    <el-card>
      <div style="margin-bottom:15px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/backlog' }"
            >首页待办</el-breadcrumb-item
          >
          <el-breadcrumb-item>期货账户凭证</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="top-box">
        <el-select
          v-model="value2"
          multiple
          collapse-tags
          style="margin-right: 10px;"
          placeholder="请选择"
        >
          <el-option
            v-for="item in account_code_list"
            :key="item.value"
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
          style="margin-left:10px"
          type="primary"
          @click="getgtsstatisticsshareoptionsList"
          >查询</el-button
        >
        <el-button type="info" slot="reference" @click="dialogVisible = true"
          >导入数据</el-button
        >
        <el-button type="success" @click="count">计算</el-button>
        <el-button type="success" @click="getfutures" style="margin-left:10px"
          >导出凭证</el-button
        >
      </div>
      <el-dialog
        :modal-append-to-body="false"
        title="文件zip包上传"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <el-upload
          ref="upload"
          drag
          :limit="limitNum"
          :auto-upload="false"
          accept=".zip"
          :action="UploadUrl()"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传zip文件，且不超过10M
          </div>
        </el-upload>
        <br />
        <el-button size="small" type="primary" @click="uploadFile"
          >立即上传</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </el-dialog>
      <el-table
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :data="getList"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          sortable
          prop="futures_account_code"
          label="期货账户账号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="number_date"
          label="数值日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="long_settle_premium"
          label="买权平仓权利金"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="200"
          prop="long_open_settle_premium"
          label="买权平仓对应开仓权利金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_settle_premium"
          label="卖权平仓权利金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="200"
          prop="short_open_settle_premium"
          label="卖权平仓对应开仓权利金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="200"
          prop="long_settlement_profit"
          label="买权平仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_settlement_profit"
          label="卖权平仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_open_premium"
          label="买权开仓权利金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_open_premium"
          label="卖权开仓权利金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_market_value"
          label="买权市值"
        ></el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_market_value"
          label="卖权市值"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="last_long_market_value"
          label="上日买权市值"
        ></el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="last_short_market_value"
          label="上日卖权市值"
        ></el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_mv_change"
          label="买权市值变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_mv_change"
          label="卖权市值变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_total_profit"
          label="买权总盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_total_profit"
          label="卖权总盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_floating_profit"
          label="买权浮动盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_floating_profit"
          label="卖权浮动盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_change_floating"
          label="买权浮盈变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_change_floating"
          label="卖权浮盈变动"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="long_exercise_profit"
          label="买权行权及到期盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          width="180"
          prop="short_exercise_profit"
          label="卖权行权及到期盈亏"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  reqgtsstatisticsshareoptionsUpload,
  reqgtsstatisticsshareoptions,
  reqgtsstatisticsshareoptionsDate,
  reqfuturesList
} from "@/api/gtsstatisticsshareoptions.js";
export default {
  name: "Gtsstatisticsshareoptions",
  data() {
    return {
      value2: [],
      account_code_list: [],
      currentPage2: 1,
      total: 1,
      size: 50,
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [],
      dialogVisible: false,
      getList: [],
      date: ""
    };
  },
  methods: {
    async getfutures() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqfuturesList(this.value2, beginPubdate, endPubdate);
      saveAs.saveAs(res.data, "期货账户凭证期权.zip");
    },
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
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "zip") {
        this.$message.warning("只能上传后缀是.zip的文件");
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
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        //使用formdata格式传照片
        let form = new FormData();
        form.append("file", this.fileList[0]);
        console.log(form, "jjjjjj");
        // form.append("type", this.type);
        reqgtsstatisticsshareoptionsUpload(form).then(res => {
          this.$nextTick(() => {
            this.dialogVisible = false;
          });
          console.log(res.status, "11111111111");
          if (res.status == 200) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
          }
          this.$refs.upload.clearFiles();
          this.fileList = [];
          this.dialogVisible = false;
        });
        /*        this.$axios({
          method: "post",
          url: "", //这里写后端的地址
          headers: {
            "Content-type": "multipart/form-data"
          },
          data: form
        }).then(
          res => {
            if (res.data.code == 200) {
              this.$message({
                message: "上传成功",
                type: "success"
              });
            }
            this.visible = false;
          },
          err => {}
        ); */
      }
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getgtsstatisticsshareoptionsList();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      this.getgtsstatisticsshareoptionsList();
    },
    async count() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqgtsstatisticsshareoptionsDate(
        beginPubdate,
        endPubdate
      );
      console.log(res, "12345");
      if (res.data.status == 200) {
        this.$message.success("计算成功");
      } else {
        this.$message.error("计算失败");
      }
    },
    async getgtsstatisticsshareoptionsList() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqgtsstatisticsshareoptions(
        this.currentPage2,
        this.size,
        this.value2,
        beginPubdate,
        endPubdate
      );
      // console.log(res);
      this.total = res.data.count;
      this.getList = res.data.results.data;
      this.account_code_list = res.data.results.account_code_list;
    }
  },
  mounted() {
    this.getgtsstatisticsshareoptionsList();
  }
};
</script>

<style lang="less" scoped>
.top-box {
  margin-bottom: 20px;
}
</style>
