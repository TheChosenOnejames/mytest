<!--
 * @Date: 2022-11-08 15:09:46
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-16 18:11:06
 * @Description: 
-->
<template>
  <el-card class="box-card">
    <span>部门查询</span>
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
              @click="getRegulatorList"
              slot="append"
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
    <el-table border :data="getList" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        label="部门名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="owner"
        label="部门负责人"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" sortable prop="phone" label="联系电话">
      </el-table-column>
      <el-table-column align="center" sortable prop="email" label="邮箱">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="create_datetime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column sortable align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click.native="status => switchChange(status, scope.row)"
          >
          </el-switch>
        </template>
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
            @click.native.prevent="handleDelete(scope.$index, scope.row)"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

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
    <!-- 添加 -->
    <el-dialog
      :append-to-body="true"
      title="新增用户"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="formLabelAlignRef"
        label-width="100px"
        :rules="rules"
        :model="formLabelAlign"
      >
        <el-form-item label="父级部门" prop="parent">
          <el-cascader
            :props="{
              label: 'name',
              value: 'id',
              children: 'children',
              checkStrictly: true
            }"
            :show-all-levels="false"
            v-model="formLabelAlign.parent"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="owner">
          <el-input v-model="formLabelAlign.owner"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改框 -->
    <el-dialog
      :append-to-body="true"
      title="修改用户"
      :visible.sync="dialogEditFormVisible"
      width="50%"
    >
      <el-form label-width="100px" :rules="rules" :model="editFormLabelAlign">
        <el-form-item label="父级部门" prop="parent">
          <el-cascader
            :props="{
              label: 'name',
              value: 'id',
              children: 'children',
              checkStrictly: true
            }"
            :show-all-levels="false"
            v-model="editFormLabelAlign.parent"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="editFormLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="owner">
          <el-input v-model="editFormLabelAlign.owner"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editFormLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFormLabelAlign.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  reqregulator,
  reqregulatorStatus,
  reqregulatordel,
  reqregulatorEdit,
  reqregulatortree,
  reqregulatorAdd
} from "@/api/regulator.js";

export default {
  name: "Regulator",
  data() {
    return {
      options: {
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true
      },
      dialogVisible: false,
      value: [],
      options: [],
      editId: "",
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        parent: [
          { required: true, message: "请输入父级部门名称", trigger: "blur" }
        ]
      },
      editFormLabelAlign: {
        parent: "",
        name: "",
        owner: "",
        phone: "",
        email: ""
      },
      formLabelAlign: {
        parent: "",
        name: "",
        owner: "",
        phone: "",
        email: ""
      },
      dialogEditFormVisible: false,
      searchName: "",
      getList: [],
      total: 1,
      currentPage2: 1,
      size: 8,
      arrList: []
    };
  },
  methods: {
    async addUsers() {
      this.$refs.formLabelAlignRef.validate(async valid => {
        if (!valid) return;
        const res = await reqregulatorAdd(this.formLabelAlign);
        if (res.status !== 200) {
          this.$message.error("添加失败");
        }
        this.$message.success("添加成功");
        this.dialogVisible = false;
        this.$refs["form"].resetFields();
        console.log(res, "res");
      });
    },
    handleChange(value) {
      if (value != "") {
        this.editFormLabelAlign.parent = value[value.length - 1];
        this.formLabelAlign.parent = value[value.length - 1];
      }
    },
    async getTreeList() {
      const res = await reqregulatortree();
      this.options = res.data.data.data.data;
      console.log(res.data.data.data.data, "uuuurrrr");
    },
    async editUser() {
      const res = await reqregulatorEdit(this.editId, this.editFormLabelAlign);
      if (res.status !== 200) {
        this.$message.error("修改失败");
      }
      this.$message.success("修改成功");
      this.dialogEditFormVisible = false;
    },
    showEditDialog(row) {
      this.editId = row.id;
      this.editFormLabelAlign.parent = row.parent;
      this.editFormLabelAlign = row;
      this.dialogEditFormVisible = true;
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
      await reqregulatordel(row.id);
      this.getRegulatorList();
    },
    async switchChange(status, row) {
      console.log(row);
      let isOpen = row.status ? 0 : 1;
      this.$confirm(`你确定要修改状态吗?`, "系统提示", {
        confirmButtonText: "确定",
        concelButtonText: "取消",
        callback: async acttion => {
          if (acttion == "confirm") {
            const res = await reqregulatorStatus(row.id, isOpen);
            this.getRegulatorList();
          }
        }
      });
    },
    handleSizeChange(newsize) {
      this.size = newsize;
      //  console.log(`每页 ${newsize} 条`);
      this.getRegulatorList();
    },
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${newpage}`);
      this.currentPage2 = newpage;
      this.getRegulatorList();
    },
    async getRegulatorList() {
      const res = await reqregulator(
        this.searchName,
        this.currentPage2,
        this.size
      );
      this.getList = res.data.results;
      this.total = res.data.count;
    }
  },
  created() {
    this.getRegulatorList();
    this.getTreeList();
  }
};
</script>

<style></style>
