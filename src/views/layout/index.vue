<template>
  <div class="layout-container">
    <!-- 规范: 组件封装时, 一般会给组件的根元素, 添加上一个和组件名同名的类名 -->
    <!-- <Jack></Jack>  .jack类 -->
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right"> </el-breadcrumb>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 头部Logo -->
        <div class="logo" :class="{ minLogo: isCollapse }"></div>
        <!-- 菜单 -->
        <el-menu
          unique-opened
          :router="true"
          :default-active="$route.name"
          background-color="#002033"
          :collapse="isCollapse"
          :collapse-transition="false"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i
                class=" el-icon-house"
                style="margin-right:5px;font-size: 20px;"
              ></i>
              <span>首页</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/backlog">
                <i class="iconfont icon-daibanrenwu"></i>
                首页待办</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-yingli"></i>
              <span>业务盈亏</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/futuresmarket">
                <i class="iconfont icon-qihuo"></i> 期货做市</el-menu-item
              >
              <el-menu-item index="/shareoptionmarket">
                <i class="iconfont icon-gupiaoqiquan"></i>
                期权做市</el-menu-item
              >

              <el-menu-item index="/gtssubaccountcloseout">
                <i class="iconfont icon-gupiaoqiquan"></i>
                gts子账户平仓统计</el-menu-item
              >
              <el-menu-item index="/gtssubaccountfloat">
                <i class="iconfont icon-gupiaoqiquan"></i>
                gts子账户浮动统计</el-menu-item
              >

              <el-menu-item index="/gtssubaccountsplit">
                <i class="iconfont icon-gupiaoqiquan"></i>
                gts子账户拆分统计</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-yinhang"></i>
              <span>银行</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/bank">
                <i class="iconfont icon-7"></i>
                银行核对</el-menu-item
              >
              <el-menu-item index="/bankaccount">
                <i class="iconfont icon-yinhangzhanghu"></i>
                银行账户</el-menu-item
              >
              <el-menu-item index="/bankfacilities">
                <i
                  class="iconfont icon-edushouxin
"
                ></i>
                银行授信</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-touzi"></i>
              <span>期货账户凭证</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Gtsstatistics">
                <i class="iconfont icon-tongji"></i>期货账户凭证</el-menu-item
              >

              <el-menu-item index="/Gtsstatisticsshareoptions">
                <i
                  class="iconfont icon-tongji
"
                ></i>
                期货账户凭证(期权)</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-touzi"></i>
              <span>财务软件辅助</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Financialsupport">
                <i class="iconfont icon-tongji"></i>科目辅助余额表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="iconfont icon-touzi"></i>
              <span>业务核算</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/windcontractprice">
                <i class="iconfont icon-tongji"></i>WIND合约价格表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="iconfont icon-touzi"></i>
              <span>用戶管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/AddUser">
                <i class="iconfont icon-tongji"></i>添加超級用户</el-menu-item
              >
              <el-menu-item index="/AddUsers">
                <i class="iconfont icon-tongji"></i>添加普通用户</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="iconfont icon-touzi"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Regulator">
                <i class="iconfont icon-tongji"></i>部門管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 左侧部分 -->
          <div class="left" @click="toggleMenu">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            <span>&nbsp综合财务管理平台</span>
          </div>
          <!-- 右侧下拉菜单 -->
          <el-dropdown>
            <!-- 配置默认显示的内容的 -->
            <div class="avatar-wrap">
              <img class="avatar" :src="user.photo" alt="" />
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <!-- 下拉折叠的部分 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item
                ><span @click="homeBack">退出</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      isCollapse: false,
      user: {}
    };
  },
  methods: {
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    },
    homeBack() {
      window.localStorage.removeItem("token");
      this.$message.success("退出成功");
      this.$router.push("/login");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  width: 100%;
  height: 100%;
  .iconfont {
    font-size: 20px;
    margin-right: 5px;
  }
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    background-color: #002033;
    .el-menu {
      border-right: none;
    }
    .logo {
      width: 100%;
      height: 60px;
      //  background: #002244 url(../../assets/2df3883b48560f1bda658aff5d79bdf.png)
      //   no-repeat center;
      background-size: 140px auto;
    }
    // 小logo 覆盖background 的图片和大小，类书写在logo的下方。
    .minLogo {
      //  background-image: url(../../assets/gtja_logo.dcfaa174.png);
      background-size: 36px auto;
    }
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .avatar-wrap {
      display: flex;
      align-items: center;
      cursor: pointer;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>
