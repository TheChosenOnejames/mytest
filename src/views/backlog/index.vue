<!--
 * @Date: 2022-06-09 11:23:19
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-16 17:35:16
 * @Description: 首页待办的界面
-->
<template>
  <!-- 首页的待办 -->
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
    <div class="left-container">
      <el-row class="seach" :gutter="20">
        <el-col :span="7">
          <el-input
            clearable
            :trigger-on-focus="false"
            v-model="task_content"
            placeholder="请输入内容"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加待办</el-button
          >
        </el-col>
      </el-row>
      <div class="data-box">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
      </div>
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        border
        :data="slist"
        style="width: 100%"
      >
        <el-table-column
          sortable
          align="center"
          prop="create_datetime"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="creator_name"
          align="center"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          sortable
          align="center"
          prop="task_name"
          label="待办名称"
        >
        </el-table-column>
        <el-table-column
          sortable
          align="center"
          prop="task_content"
          label="待办内容"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="task_urgency_level"
          label="紧急程度"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              effect="light"
              :type="
                scope.row.task_urgency_level == '1'
                  ? 'info'
                  : scope.row.task_urgency_level == '2'
                  ? 'success'
                  : scope.row.task_urgency_level == '3'
                  ? 'warning'
                  : 'danger'
              "
              >{{
                scope.row.task_urgency_level == "1"
                  ? "一级程度"
                  : scope.row.task_urgency_level == "2"
                  ? "二级程度"
                  : scope.row.task_urgency_level == "3"
                  ? "三级程度"
                  : scope.row.task_urgency_level == "4"
                  ? "四级程度"
                  : ""
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          sortable
          align="center"
          label="未办/已办"
          prop="task_status"
        >
          <template slot-scope="scope">
            <el-switch
              disabled
              v-model="scope.row.task_status"
              :active-value="2"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click.native="
                task_status => switchChange(task_status, scope.row)
              "
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加弹框 -->
      <el-dialog
        :append-to-body="true"
        title="待办事项"
        :visible.sync="dialogFormVisible"
      >
        <el-form ref="addFormRef" :rules="addFormRules" :model="form">
          <el-steps :active="active" finish-status="success">
            <el-step title="添加待办名称"></el-step>
            <el-step title="紧急程度"></el-step>
            <el-step title="添加待办"></el-step>
          </el-steps>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-form-item
            label="待办名称"
            prop="task_name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.task_name"></el-input>
          </el-form-item>
          <el-form-item
            label="紧急程度"
            :label-width="formLabelWidth"
            prop="task_urgency_level"
          >
            <el-input
              v-model="form.task_urgency_level"
              placeholder="请输入紧急程度/1/2/3/4"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="具体待办"
            prop="task_content"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.task_content"></el-input>
          </el-form-item>
          <div v-show="active == 1"></div>
          <div v-show="active == 2"></div>
          <div v-show="active == 3"></div>
        </el-form>
        <!-- 弹框确认 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUsers">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹框 -->
      <el-dialog
        :append-to-body="true"
        title="待办事项"
        :visible.sync="dialogEditFormVisible"
      >
        <el-form :rules="addFormRules" :model="editform">
          <el-steps :active="active" finish-status="success">
            <el-step title="添加待办名称"></el-step>
            <el-step title="紧急程度"></el-step>
            <el-step title="添加待办"></el-step>
          </el-steps>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-form-item
            label="待办名称"
            prop="task_name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="editform.task_name"></el-input>
          </el-form-item>
          <el-form-item
            prop="task_urgency_level"
            label="紧急程度"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.task_urgency_level"
              placeholder="请输入紧急程度/1/2/3/4"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="具体待办"
            prop="task_content"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.task_content"
              placeholder="请输入紧急程度/1/2/3/4"
            ></el-input>
          </el-form-item>
          <div v-show="active == 1"></div>
          <div v-show="active == 2"></div>
          <div v-show="active == 3"></div>
        </el-form>
        <!-- 弹框确认 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUsers">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="last-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[5, 8, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import {
  reqEditlog,
  reqgetList,
  reqDelBacklog,
  reqAddUser,
  reqEditBacklog,
  reqEditDiaBacklog
} from "../../api/user";
export default {
  name: "Backlog",
  data() {
    return {
      total: 1,
      editId: "",
      active: 0,
      total: 1,
      size: 8,
      value2: "",
      formLabelWidth: "120px",
      form: {
        task_name: "",
        task_urgency_level: "",
        task_content: ""
      },
      editform: {
        task_name: "",
        task_urgency_level: "",
        task_content: ""
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      slist: [],
      creator_name: "",
      task_urgency_level: "",
      task_content: "",
      create_datetime: "",
      task_status: "",
      date: [],
      currentPage2: 1,
      // 添加表单的验证规则对象
      addFormRules: {
        task_name: [
          { required: true, message: "请输入待办名称", trigger: "blur" },
          {
            mini: 2,
            max: 120,
            message: "name在2个和120个字符之间",
            trigger: "blur"
          }
        ],
        task_content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            mini: 1,
            max: 200,
            message: "内容在1个和200个字符之间",
            trigger: "blur"
          }
        ],
        task_urgency_level: [
          { required: true, message: "请输入紧急程度", trigger: "blur" },
          {
            mini: 1,
            max: 1,
            message: "内容在1个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async showEditDialog(index, row) {
      console.log(row, "1111");
      this.editId = row.id;
      console.log(this.editform, "999");
      const res = await reqEditDiaBacklog(this.editId);
      this.editform = row;
      this.dialogEditFormVisible = true;
    },
    async editUsers() {
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
      const res = await reqEditlog(this.editId, this.editform);
      if (res.status !== 200) {
        this.$message.error("更新用户信息失败!");
      }
      this.$message.success("更新用户信息成功!");
      this.dialogEditFormVisible = false;
      this.getList();
    },

    next() {
      if (this.active++ > 3) this.active = 1;
    },
    handleSizeChange(newsize) {
      this.size = newsize;
      //  console.log(`每页 ${newsize} 条`);
      this.getList();
    },
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${newpage}`);
      this.currentPage2 = newpage;
      this.getList();
    },
    /* 获取首页待办列表 */
    async getList() {
      const [beginPubdate, endPubdate] = this.date || [];
      const { data: res } = await reqgetList(
        this.currentPage2,
        this.size,
        this.task_content,
        beginPubdate,
        endPubdate
      );

      this.slist = res.results;
      console.log(res.results, "iii");
      this.total = res.count;
      console.log(res, "uu");
    },
    /* 首页删除功能 */
    async handleDelete(index, row) {
      var res = await this.$confirm(
        "此操作将永久删除该待办, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      if (res != "confirm") return this.$message.info("删除用户已取消");
      await reqDelBacklog(row.id);
      this.getList();
    },
    //开关功能
    async switchChange(task_status, row) {
      let isOpen = row.task_status ? 2 : 1;
      this.$confirm(`你确定要修改状态吗?`, "系统提示", {
        confirmButtonText: "确定",
        concelButtonText: "取消",
        callback: async acttion => {
          if (acttion == "confirm") {
            const res = await reqEditBacklog(row.id, isOpen);
            this.getList();
          }
        }
      });
    },
    //弹窗里的添加
    addUsers() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const res = await reqAddUser(this.form);
        if (res.status !== 200) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        // 隐藏添加对话框
        this.dialogFormVisible = false;
        // 重新获取用户列表
        this.getList();
        this.$refs.addFormRef.resetFields();
      });
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
  .data-box {
    margin-bottom: 15px;
  }
  .seach {
    margin: 10px;
  }
  .last-box {
    width: 100%;
    height: 20px;
    margin-top: 20px;
  }
}
</style>
