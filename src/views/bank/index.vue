<!--
 * @Date: 2022-06-27 10:56:19
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-28 18:10:36
 * @Description: 银行核对
-->
<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/backlog' }"
            >首页待办</el-breadcrumb-item
          >
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="left-box" v-if="a">
        <el-select
          style="width:350px"
          multiple
          v-model="value"
          filterable
          allow-create
          default-first-option
          clearable
          placeholder="请选择"
          @change="addobj"
        >
          <el-option
            v-for="item in selectbank"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          @click="getBankgetList(1)"
          style="margin-left:10px"
          type="primary"
          >点击查询</el-button
        >
        <el-button
          style="margin-left:10px"
          @click="dialogVisible = true"
          type="info"
          >导入文件</el-button
        >
        <div class="tableheader">
          <h1 style="font-size: 25px;">银行流水明细表</h1>
        </div>
        <div class="block" style="margin-bottom: 15px">
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
            v-show="num === 1"
            type="success"
            style="margin-left:10px"
            @click="dialogVisibles = true"
            >变动检查</el-button
          >
        </div>
      </div>

      <div class="on-box" v-if="a">
        <el-table
          height="700"
          :header-cell-style="{ 'text-align': 'center' }"
          border
          :data="getbanlList"
          style="width: 100%"
        >
          <el-table-column align="center" type="index" label="#" width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="format_date"
            sortable
            label="日期"
            width="250"
          >
          </el-table-column>
          <el-table-column
            align="right"
            sortable
            prop="dr_amount_bank"
            label="借方发生额（余额减少）"
            width="250"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="cr_amount_bank"
            sortable
            label="贷方发生额（余额增加）"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="bank_abbr_code"
            sortable
            label="银行简称"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[30, 40, 50]"
          style="margin-top:10px"
          layout="total, sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <div class="in-box" v-if="b" style="margin-top:15px">
        <div class="toexcel">
          <el-button
            style="margin-bottom:15px"
            type="info"
            plain
            @click="exportExcel"
            >导出文件</el-button
          >
          <el-button type="info" @click="dialogVisibles = true"
            >点击打开 Dialog</el-button
          >
        </div>

        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          class="table"
          border
          :data="recon_result_List"
          style="width: 100%"
        >
          <el-table-column align="center" type="index" label="#">
          </el-table-column>
          <el-table-column
            align="center"
            prop="bank_account_code"
            sortable
            label="银行账户简称"
            width="200"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="recon_date"
            sortable
            label="日期"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="nc_debit"
            sortable
            label="用友当日借方"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="bank_credit"
            sortable
            label="银行当日贷方"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="nc_debit_dif"
            sortable
            label="用友借方金额差异"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="nc_credit"
            sortable
            label="用友当日贷方"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="bank_debit"
            sortable
            label="银行当日借方"
          >
          </el-table-column>
          <el-table-column
            align="right"
            prop="nc_credit_dif"
            sortable
            label="用友贷方金额差异"
          >
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :modal-append-to-body="false"
        title="上传文件"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="value2"
          placeholder="选择日期"
          type="date"
        >
        </el-date-picker>
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
      <el-dialog
        title="变动检查"
        :modal-append-to-body="false"
        :visible.sync="dialogVisibles"
        width="40%"
      >
        <div class="select-box" style="margin-bottom:10px">
          <span><h1>银行对账月份</h1></span>
          <el-select
            ref="selectLabel"
            @change="testSelect"
            v-model="selectvalue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in List"
              :key="item.value"
              :label="item.label"
              :value="item.secondary_list"
            >
            </el-option>
          </el-select>
        </div>
        <span
          ><h1>财务软件数据备份</h1>
          <el-select
            ref="selectLabel2"
            v-model="selectvalue2"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ok"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button type="primary" @click="inspectdata">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { reqbanupload } from "../../api/banupload";
import { reqBanfilter, reqBandata } from "../../api/bank.js";
export default {
  name: "Bank",
  data() {
    return {
      recon_result_List: [],
      dialogVisible: false,
      selectvalue: [],
      selectvalue2: [],
      dialogVisibles: false,
      value2: "",
      num: 0,
      isShow: true,
      date: [],
      a: true,
      b: false,
      getbanlList: [],
      selectbank: [],
      value: "",
      bankcheck: [],
      size: 30,
      total: 1,
      currentPage2: 1,
      addbank: [],
      fileList: [],
      limitNum: 1,
      isIndeterminate: true,
      List: [],
      latest_date: [],
      latest_data_copy: [],
      qw: [],
      ww: 0,
      ok: ""
    };
  },
  methods: {
    fn() {
      this.a = false;
      this.b = true;
    },
    handleSizeChange(newsize) {
      this.size = newsize;
      // console.log(newsize);
      this.getBankgetList();
    },
    handleCurrentChange(newpage) {
      //  console.log(newpage);
      this.currentPage2 = newpage;
      this.getBankgetList();
    },
    async getBankgetList(num) {
      console.log("点击率");
      this.num = num;
      // this.isShow = !this.isShow;
      const [beginPubdate, endPubdate] = this.date || [];
      const { data: res } = await reqBanfilter(
        this.currentPage2,
        this.size,
        this.addbank,
        beginPubdate,
        endPubdate
      );

      if (res.status !== 200) {
        this.$message.error("获取列表失败!");
      }
      this.$message.success("获取列表成功");
      console.log(res.results);
      this.selectbank = res.results.bank_list;
      console.log(this.selectbank, "hhhhhhhhhhhhhhhhh");
      this.getbanlList = res.results.data;
      this.total = res.count;
      this.bankcheck = res.results.recon_result;
      /* this.List = res.results.compare_list; */
      this.List = res.results.compare_list;
      console.log(this.ww, "hhhjjj");
      if (this.ww == 0) {
        this.qw = res.results.compare_list[0].secondary_list;
      } else {
        var i = this.selectvalue;
        this.qw = res.results.compare_list[i].secondary_list;
      }
      console.log(this.qw, "uuu");
      console.log(this.List, "999999");
      this.latest_date = res.results.latest_date;
      this.latest_data_copy = res.results.latest_data_copy;
      /*   console.log(this.latest_date, "hhhhhhh"); */
      let jj = this.List;

      console.log(res.results.compare_list, "银行对账月份");
    },
    async inspectdata() {
      const { data: res } = await reqBandata(
        this.$refs.selectLabel.selected.label,
        this.$refs.selectLabel2.selected.label
      );
      this.recon_result_List = res.recon_result;
      this.dialogVisibles = false;
      this.b = true;
      this.a = false;
      console.log(res, "qwert");
    },
    testSelect() {
      console.log(this.selectvalue);
      let ok = this.selectvalue;
      this.selectvalue - 1;
      this.ok = ok.flat();
      console.log(this.selectvalue, "yyyyy");
      console.log(this.List.secondary_list);
      console.log(this.List, "mmmmmmmm");
      let ee = this.List.map(x => {
        return x.secondary_list;
      });
      this.ee = ee.flat();
      console.log(ee, "qqqqq");
      console.log();
    },
    addobj(val) {
      this.addbank = val;
    },
    exportExcel() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
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
        this.$message.warning("只能上传后缀是.xlsx和.xls的文件");
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
    async uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        let form = new FormData();
        form.append("file", this.fileList[0]);

        form.append("date", this.value2);
        /*         const res = reqimportdata(form);
        console.log(res); */
        const res = await reqbanupload(form);
        if (res.status == 200) {
          this.$message({
            message: "上传成功",
            type: "success"
          });
        } else {
          this.$message.error("上传失败");
        }
        this.fileList = [];
        this.$refs.upload.clearFiles();
        this.dialogVisible = false;
      }
    }
  },
  created() {
    this.getBankgetList(0);
  }
};
</script>

<style scoped lang="less">
.box-card {
  width: 100%;
  position: relative;
  .left-box {
    margin-top: 20px;
  }
  .tableheader {
    position: absolute;
    left: 45%;
    top: 45px;
  }
  .block {
    margin-top: 10px;
  }
}
</style>
