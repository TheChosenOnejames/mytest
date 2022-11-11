<!--
 * @Date: 2022-11-01 09:11:16
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-11 09:57:15
 * @Description: 
-->
<template>
  <div class="container">
    <el-card>
      <span>用户名查询</span>
      <div class="box-box" style="margin-bottom:10px;margin-top:10px">
        <el-row class="seach" :gutter="20">
          <el-col :span="8">
            <el-input
              clearable
              :trigger-on-focus="false"
              v-model="searchName"
              placeholder="请输入内容"
            >
              <el-button
                slot="append"
                @click="getuser"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="dialogVisible = true"
              >添加</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-table border :data="getuserList" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="username"
          label="账号"
          width="180"
        >
        </el-table-column>
        <el-table-column sortable align="center" prop="is_active" label="状态">
          <template slot-scope="scope">
            <el-switch
              disabled
              v-model="scope.row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click.native="is_active => switchChange(is_active, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="create_datetime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.row)"
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
      <!-- 修改 -->
      <el-dialog
        :append-to-body="true"
        title="修改用户"
        :visible.sync="dialogEditFormVisible"
        width="50%"
      >
        <el-form
          label-width="100px"
          :rules="ruless"
          :model="editFormLabelAlign"
        >
          <el-form-item label="管理员账号" prop="username">
            <el-input v-model="editFormLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名" prop="name">
            <el-input v-model="editFormLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="editFormLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editFormLabelAlign.mobile"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select
              multiple
              clear
              collapse-tags
              v-model="editFormLabelAlign.role"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="dept">
            <el-select
              multiple
              clear
              collapse-tags
              v-model="editFormLabelAlign.dept"
              placeholder="请选择"
            >
              <el-option
                v-for="item in deptList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :append-to-body="true"
        title="新增用户"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <el-form
          ref="form"
          label-width="100px"
          :rules="rules"
          :model="formLabelAlign"
        >
          <el-form-item label="管理员账号" prop="username">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="formLabelAlign.mobile"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select
              multiple
              clear
              collapse-tags
              v-model="formLabelAlign.role"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="dept">
            <el-select
              multiple
              clear
              collapse-tags
              v-model="formLabelAlign.dept"
              placeholder="请选择"
            >
              <el-option
                v-for="item in deptList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[5, 8, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination
    ></el-card>
  </div>
</template>
<script>
import {
  requserNames,
  reqdeluserName,
  reqSelectrole,
  reqSelectdept,
  reqAddforms,
  reqEdit,
  reqEditActive
} from "@/api/username.js";
import { reqEditActives } from "@/api/username.js";
export default {
  name: "addUser",
  data() {
    return {
      status: true,
      editId: "",
      getList: [],
      dialogEditFormVisible: false,
      getdept: [],
      getuserList: [],
      deptList: [],
      searchName: "",
      total: 1,
      currentPage2: 1,
      size: 8,
      dialogVisible: false,
      formLabelAlign: {
        username: "",
        name: "",
        password: "",
        mobile: "",
        role: "",
        dept: ""
      },
      editFormLabelAlign: {
        username: "",
        name: "",
        password: "",
        mobile: "",
        role: "",
        dept: ""
      },
      roleList: [],
      getRole: [],
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        dept: [{ required: true, message: "请输入部门", trigger: "blur" }],
        role: [{ required: true, message: "请输入角色", trigger: "blur" }]
      },
      ruless: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required: false, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        dept: [{ required: true, message: "请输入部门", trigger: "blur" }],
        role: [{ required: true, message: "请输入角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    async editActive(is_active, row) {
      const res = await reqEditActives(row.id, this.status);
      this.getuser();
    },
    async switchChange(is_active, row) {
      let isOpen = row.is_active ? false : true;
      this.$confirm(`你确定要修改状态吗?`, "系统提示", {
        confirmButtonText: "确定",
        concelButtonText: "取消",
        callback: async acttion => {
          if (acttion == "confirm") {
            const res = await reqEditActive(row.id, isOpen);
            this.getuser();
          }
        }
      });
    },
    async editUser() {
      const res = await reqEdit(this.editId, this.editFormLabelAlign);
      console.log(res.status, "uuu112");
      if (res.status !== 200) {
        this.$message.error("修改失败");
      }
      this.$message.success("修改成功");
      this.dialogEditFormVisible = false;
    },
    showEditDialog(row) {
      this.editId = row.id;
      this.editFormLabelAlign = row;
      this.dialogEditFormVisible = true;
    },
    handleSizeChange(newsize) {
      this.size = newsize;
      //  console.log(`每页 ${newsize} 条`);
      this.getuser();
    },
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${newpage}`);
      this.currentPage2 = newpage;
      this.getuser();
    },
    async getuser() {
      const res = await requserNames(
        this.currentPage2,
        this.size,
        this.searchName
      );
      this.total = res.data.count;
      this.getuserList = res.data.results;
    },
    async handleDelete(index, row) {
      var res = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
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
      await reqdeluserName(row.id);
      this.getuser();
    },
    async getRoleSelect() {
      const res = await reqSelectrole();
      this.roleList = res.data.data.data;
    },
    async getDeptSelect() {
      const res = await reqSelectdept();
      this.deptList = res.data.results;
    },
    async addUser() {
      const res = await reqAddforms(this.formLabelAlign);
      if (res.status !== 200) {
        this.$message.error("添加失败");
      }
      this.$message.success("添加成功");
      this.getuser();
      this.dialogVisible = false;
      this.$refs["form"].resetFields();
    }
  },
  created() {
    this.getDeptSelect();
    this.getuser();
    this.getRoleSelect();
  }
};
</script>
<style></style>
