<!--
 * @Date: 2022-06-13 08:56:40
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-10-25 17:05:21
 * @Description: 
-->
<template>
  <div id="app">
    <!--    <el-button @click="fn">默认按钮</el-button> -->

    <keep-alive> <router-view></router-view></keep-alive>
  </div>
</template>

<script>
import { reqtest } from "@/api/test.js";
export default {
  data() {
    return {};
  },
  methods: {
    /*     async fn() {
      await this.$http.get("/task/").then(res => {
        console.log("111", res);
      });
    } */
    /*    async fn() {
      await reqtest();
      console.log("11113333");
    } */
  },
  mounted() {
    // this.fn();
  }
};
</script>

<style lang="less" scoped>
#nprogress .bar {
  height: 10rpx !important; //高度
  background: #000000 !important; //颜色
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
}
</style>
