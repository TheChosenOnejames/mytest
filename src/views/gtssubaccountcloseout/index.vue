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
        <el-breadcrumb-item :to="{ path: '/gtssubaccountfloat' }"
          >gts子账户浮动统计</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/gtssubaccountsplit' }"
          >gts子账户拆分统计</el-breadcrumb-item
        >
        <el-breadcrumb-item>gts子账户平仓统计</el-breadcrumb-item>
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
          @click="getgtssubaccountcloseout"
          >查询</el-button
        >

        <el-button
          style="margin-left:5px"
          type="success"
          slot="reference"
          @click="dialogVisible = true"
          >导入文件</el-button
        >
      </div>

      <div class="table-box" style="margin-bottom:15px">
        <el-table
          v-loading="loading"
          height="700"
          :header-cell-style="{ 'text-align': 'center' }"
          border
          :data="getgtssubaccountcloseoutList"
          stripe
          style="width: 100%"
        >
          <el-table-column
            sortable
            prop="source_file_name"
            label="文件名"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="sub_account_code"
            label="子账户号"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            sortable
            prop="department"
            label="部门"
          >
          </el-table-column>
          <el-table-column align="center" sortable prop="project" label="项目">
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="underlying_asset_type"
            label="标的属性"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="trading_day"
            label="日期"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="underlying_product_id"
            label="品种"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="exchangeinst_id"
            label="合约号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="direction"
            label="买卖方向"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="offset_flag"
            label="开平标志"
          >
          </el-table-column>
          <el-table-column align="right" sortable prop="price" label="成交价">
          </el-table-column>
          <el-table-column align="center" sortable prop="volume" label="成交量">
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="trading_amount"
            label="成交金额"
          >
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="close_profit_by_trade"
            label="逐笔平盈"
          >
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="transaction_fee"
            label="手续费"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable
            prop="asset_category"
            label="标的分类"
          >
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="option_premium_cashflow"
            label="权利金额流水"
          >
          </el-table-column>
        </el-table>
      </div>

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
      <div>
        <el-dialog
          :append-to-body="true"
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
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
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
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  reqgtssubaccountcloseout,
  reqgtssubaccountcloseoutupload
} from "@/api/gtssubaccountcloseout.js";
export default {
  name: "Gtssubaccountcloseout",
  data() {
    return {
      loading: false,
      visible: false,
      type: "",
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      total: 1,
      size: 50,
      getgtssubaccountcloseoutList: [],
      currentPage2: 1,
      date: "",
      dialogVisible: false
    };
  },
  methods: {
    // 文件超出个数限制时的钩子
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
      this.loading = true;
      this.dialogVisible = false;
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        //使用formdata格式传照片
        let form = new FormData();
        form.append("file", this.fileList[0]);
        reqgtssubaccountcloseoutupload(form).then(res => {
          if (res.status == 200) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
          }
          this.$refs.upload.clearFiles();
          this.fileList = [];
          this.loading = false;
          this.getgtssubaccountcloseout();
        });
      }
    },
    async getgtssubaccountcloseout() {
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqgtssubaccountcloseout(
        this.currentPage2,
        this.size,
        beginPubdate,
        endPubdate
      );
      this.getgtssubaccountcloseoutList = res.data.results;
      this.total = res.data.count;
      console.log(res.data, "hhhhh");
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getgtssubaccountcloseout();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      this.getgtssubaccountcloseout();
    }
  },
  created() {
    this.getgtssubaccountcloseout();
  }
};
</script>

<style></style>
