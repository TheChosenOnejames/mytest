<!--
 * @Date: 2022-11-15 09:28:43
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 10:40:10
 * @Description: 
-->
<template>
  <div class="container">
    <el-card
      ><el-breadcrumb
        style="padding-bottom:10px"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Regulator' }"
          >部门管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
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
                icon="el-icon-search"
                @click="getMenuList"
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
      <el-table
        :data="arrNewList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column align="center" type="index" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="菜单名称"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="icon"
          label="图标"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="web_path"
          label="路由地址"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="menuPermission_name"
          label="权限"
        >
        </el-table-column>

        <el-table-column align="center" sortable prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == '1'">启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status == '0'"
              >禁用</el-tag
            ></template
          >
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editForm(scope.$index, scope.row)"
              size="mini"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="fn(scope.$index, scope.row)"
              v-show="scope.row.isautopm == '1' ? true : false"
              >菜单权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改 -->
      <el-dialog
        :append-to-body="true"
        title="修改菜单"
        :visible.sync="dialogEditFormVisible"
        width="30%"
      >
        <el-form
          :rules="rules"
          ref="editformLabelAlignRef"
          label-width="100px"
          :model="editformLabelAlign"
        >
          <el-form-item label="父级菜单" prop="parent">
            <el-cascader
              clearable
              :props="{
                label: 'name',
                value: 'id',
                children: 'children',
                checkStrictly: true
              }"
              :show-all-levels="false"
              v-model="editformLabelAlign.parent"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="子菜单名称" prop="name">
            <el-input clearable v-model="editformLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="侧边栏可见" prop="visible">
            <el-select
              clearable
              v-model="editformLabelAlign.visible"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectSidebar"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="108px"
            label="创建按钮权限"
            prop="isautopm"
          >
            <el-select
              clearable
              v-model="editformLabelAlign.isautopm"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectCatalog"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              clearable
              v-model="editformLabelAlign.status"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路由地址" prop="web_path">
            <el-input v-model="editformLabelAlign.web_path"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSure">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加 -->
      <el-dialog
        :append-to-body="true"
        title="新增菜单"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form
          :rules="rules"
          ref="formLabelAlignRef"
          label-width="100px"
          :model="formLabelAlign"
        >
          <el-form-item label="父级菜单" prop="parent">
            <el-cascader
              clearable
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
          <el-form-item label="子菜单名称" prop="name">
            <el-input clearable v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="侧边栏可见" prop="visible">
            <el-select
              clearable
              v-model="formLabelAlign.visible"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectSidebar"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="108px"
            label="创建按钮权限"
            prop="isautopm"
          >
            <el-select
              clearable
              v-model="formLabelAlign.isautopm"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectCatalog"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              clearable
              v-model="formLabelAlign.status"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路由地址" prop="web_path">
            <el-input v-model="formLabelAlign.web_path"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMenutList">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  reqMenuList,
  reqDelMenuList,
  reqMenutreeList,
  reqAddMenutList,
  reqEditMenutList
} from "@/api/menuList.js";
export default {
  name: "MenuList",
  data() {
    return {
      rules: {
        parent: [
          { required: true, message: "请输入父级菜单名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入子级菜单名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15个字符", trigger: "blur" }
        ],
        visible: [
          { required: true, message: "请输入侧边栏可见", trigger: "blur" }
        ],
        isautopm: [{ required: true, message: "按钮权限", trigger: "blur" }],
        status: [{ required: true, message: "状态", trigger: "blur" }],
        web_path: [
          {
            required: true,
            message: "路由地址",
            trigger: "blur"
          }
        ]
      },
      isShow: false,
      options: {
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true
      },
      selectSidebar: [
        {
          id: "0",
          name: "否"
        },
        {
          id: "1",
          name: "是"
        }
      ],
      selectCatalog: [
        {
          id: "0",
          name: "否(否代表只创建一个目录)"
        },
        {
          id: "1",
          name: "是"
        }
      ],
      selectStatus: [
        {
          id: "0",
          name: "禁用"
        },
        {
          id: "1",
          name: "启用"
        }
      ],
      newArrList: [],
      options: [],
      dialogVisible: false,
      dialogEditFormVisible: false,
      arrList: [],
      arrNewList: [],
      searchName: "",
      getFormMenuList: [],
      showIsautopm: "",
      rowId: "",
      formLabelAlign: {
        parent: "",
        name: "",
        icon: "",
        web_path: "",
        menuPermission_name: "",
        status: "",
        visible: "",
        is_link: "",
        isautopm: "1",
        menuPermission: ""
      },
      editformLabelAlign: {
        parent: "",
        name: "",
        icon: "",
        web_path: "",
        menuPermission_name: "",
        status: "",
        visible: "",
        is_link: "",
        isautopm: "1",
        menuPermission: ""
      }
    };
  },
  methods: {
    async editSure() {
      this.$refs.editformLabelAlignRef.validate(async valid => {
        if (!valid) return;
        const res = await reqEditMenutList(this.rowId, this.editformLabelAlign);
        this.$refs["editformLabelAlignRef"].resetFields();
        this.dialogEditFormVisible = false;
        this.getMenuList();
      });
    },
    editForm(index, row) {
      this.rowId = row.id;
      this.editformLabelAlign = row;
      this.dialogEditFormVisible = true;
    },
    fn(index, row) {
      this.showIsautopm = this.row.isautopm;
    },
    async addMenutList() {
      this.$refs.formLabelAlignRef.validate(async valid => {
        if (!valid) return;
        const res = await reqAddMenutList(this.formLabelAlign);
        this.dialogVisible = false;
        this.$refs["formLabelAlignRef"].resetFields();
        this.getMenuList();
      });
    },
    async getparentMenuList() {
      const res = await reqMenutreeList();
      this.options = res.data.data.data.data;
    },
    handleChange(value) {
      if (value != "") {
        this.formLabelAlign.parent = value[value.length - 1];
        this.editformLabelAlign.parent = value[value.length - 1];
      }
    },
    async handleDelete(index, row) {
      var res = await this.$confirm(
        "此操作将永久删除该菜单, 是否继续?",
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
      await reqDelMenuList(row.id);
      this.getMenuList();
    },
    async getMenuList() {
      const res = await reqMenuList(this.searchName);
      this.getFormMenuList = res.data.data.data;
      this.arrNewList = this.getFormMenuList.filter(
        item => item.children !== null
      );
    }
  },
  created() {
    this.getMenuList();
    this.getparentMenuList();
  }
};
</script>

<style></style>
