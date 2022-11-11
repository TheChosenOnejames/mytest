<!--
 * @Date: 2022-09-08 10:30:31
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-04 10:39:59
 * @Description: 
-->
<template>
  <el-card class="box-card">
    <div style="margin-bottom:15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/backlog' }"
          >首页待办</el-breadcrumb-item
        >
        <el-breadcrumb-item>期货账户凭证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top-box" style="margin-bottom:15px">
      <div class="account-box">
        <el-row class="seach" :gutter="20">
          <el-col :span="6">
            <div class="header-box">
              <el-select
                collapse-tags
                multiple
                v-model="futures"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in getselectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <div class="time-box">
          <el-date-picker
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div class="button-box">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchList"
            circle
          ></el-button>
          <!--           <el-button
            circle
            style="margin-left:5px"
            type="primary"
            @click="searchList"
            >查询数据</el-button
          > -->
          <el-button
            type="success"
            slot="reference"
            @click="dialogVisible = true"
            >导入数据</el-button
          >
          <el-button type="success" @click="getfutures" style="margin-left:10px"
            >导出凭证</el-button
          >
        </div>
      </div>
      <el-dialog
        :modal-append-to-body="false"
        title="文件上传"
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传xlsx,xls文件，且不超过10M
          </div>
        </el-upload>
        <br />
        <el-button size="small" type="primary" @click="uploadFile"
          >立即上传</el-button
        >
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
      </el-dialog>
    </div>
    <div class="table-box" style="margin-bottom:15px">
      <el-table
        id="table"
        :header-cell-style="{ 'text-align': 'center' }"
        border
        center
        :data="gettableList"
        style="width: 100%"
      >
        <el-table-column align="center" type="index" width="38" label="#">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="file_name"
          label="文件名"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="futures_account_code"
          label="期货账户账号"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" sortable prop="date" label="日期">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="number_date"
          label="数值型日期"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="settlement_profit_by_trade"
          label="逐笔平仓盈亏"
        >
        </el-table-column>
        <el-table-column align="right" sortable prop="fees" label="交易手续费">
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="floating_profit_by_trade"
          label="逐笔持仓盈亏"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="client_equity"
          label="账户权益"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="margin"
          label="占用保证金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="available_fund"
          label="可用资金"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="opening_fund_balance"
          label="上日结存"
        >
        </el-table-column>
        <el-table-column
          align="right"
          sortable
          prop="closing_fund_balance"
          label="当日结存"
        >
        </el-table-column>
      </el-table>
    </div>
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
    <div class="buttonexportExcelsss-box">
      <el-button size="mini" type="primary" @click="exportExcelsss"
        >导出表格</el-button
      >
    </div>
  </el-card>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { reqGts, reqdownload, reqfutures } from "@/api/gts.js";
export default {
  name: "Gtsstatistics",
  data() {
    return {
      total: 1,
      size: 15,
      currentPage2: 1,
      getselectList: [],
      futures: [],
      gettableList: [],
      dialogVisible: false,
      date: [],
      input: "",
      limitNum: 20, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      messageList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //只能选择今天及今天之前的日期
          // return time.getTime() > Date.now() - 8.64e7; //只能选择今天之前的日期，连今天的日期也不能选
        }
      }
    };
  },
  methods: {
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
          "期货账户凭证.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getList();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      this.getList();
    },
    async getfutures() {
      console.log(this.futures, "oolo");
      const [beginPubdate, endPubdate] = this.date || [];
      const res = await reqfutures(this.futures, beginPubdate, endPubdate);
      saveAs.saveAs(res.data, "期货账户凭证.zip");
    },
    searchList() {
      this.getList();
    },
    async getList() {
      console.log(this.futures);
      const [beginPubdate, endPubdate] = this.date || [];
      const { data: res } = await reqdownload(
        this.currentPage2,
        this.size,
        this.futures,
        beginPubdate,
        endPubdate
      );
      if (res.status !== 200) {
        this.$message.error("更新数据失败!");
      }
      this.$message.success("更新数据成功!");
      this.gettableList = res.results.data;

      this.getselectList = res.results.account_code_list;
      this.total = res.count;
      console.log(res, "popo");
    },
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
      if (extension !== "xlsx" || "xls") {
        this.$message.warning("只能上传后缀是.xlsx的文件");
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
        let form = new FormData();
        form.append("file", this.fileList[0]);
        form.append("file", this.fileList[1]);
        form.append("file", this.fileList[2]);
        form.append("file", this.fileList[3]);
        form.append("file", this.fileList[4]);
        form.append("file", this.fileList[5]);
        form.append("file", this.fileList[6]);
        form.append("file", this.fileList[7]);
        form.append("file", this.fileList[8]);
        form.append("file", this.fileList[9]);
        form.append("file", this.fileList[10]);
        form.append("file", this.fileList[11]);
        form.append("file", this.fileList[12]);
        form.append("file", this.fileList[13]);
        form.append("file", this.fileList[14]);
        form.append("file", this.fileList[15]);
        form.append("file", this.fileList[16]);
        form.append("file", this.fileList[17]);
        form.append("file", this.fileList[18]);
        form.append("file", this.fileList[19]);
        form.append("file", this.fileList[20]);
        reqGts(form).then(res => {
          this.messageList = res.data.data;
          let bb = this.messageList.map(x => {
            return x.label;
          });
          bb.toString();
          if (res.data.status == 200) {
            this.$message({
              message: "上传成功",
              type: "success"
            });

            this.$refs.upload.clearFiles();
          } else if (res.data.status == 201) {
            this.$notify({
              title: "导入数据部分重复",
              type: "warning",
              message: `${bb}`,
              duration: 0
            });
            this.$refs.upload.clearFiles();
          } else {
            this.$notify({
              title: "导入数据重复",
              type: "error",
              message: `${bb}`,
              duration: 0
            });
            this.fileList = [];
            this.$refs.upload.clearFiles();
          }
        });
        this.fileList = [];
        this.dialogVisible = false;
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped lang="less">
.box-card {
  width: 100%;
  position: relative;
  /deep/ .el-upload {
    width: 100%;
    /*     height: 400px; */
  }
  /deep/ .el-upload .el-upload-dragger {
    width: 100%;
    /*  height: 400px; */
  }

  .time-box {
    top: 48px;
    left: 44%;
    position: absolute;
  }
  .button-box {
    top: 48px;
    right: 5%;
    position: absolute;
  }
  .buttonexportExcelsss-box {
    position: absolute;
    bottom: 24px;
    right: 18px;
  }
}
</style>
