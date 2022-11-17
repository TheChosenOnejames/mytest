<template>
  <div class="login-container">
    <!-- 白色的整个内部容器 -->
    <div class="login-form-wrap">
      <div class="login-head">
        <!--  <div ref="logoref" class="logo"></div> -->
      </div>
      <!--
        el-form 整个的大的form组件
          (1) :model="form" 绑定了一个对象, 用于收集表单数据 (将来还可以用于表单校验)
          (2) label-width 控制label的宽度
        el-form-item 一个表单项, 一行, 用于包裹表单元素
          label="活动名称"  label的名字
        el-input 输入框组件
          v-model="form.name" 和form中的某个属性双向绑定
      -->
      <el-form ref="form" class="login-form" :model="form" :rules="rules">
        <h2 class="title">综合财务管理平台</h2>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入账号" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            type="passWord"
            placeholder="请输入密码"
            v-model="form.code"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree"
            >我已阅读并同意许可协议!</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="login-btn" type="primary"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reqUserLogin } from "@/api/user.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        mobile: "",
        code: "",
        agree: true
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["blur", "change"]
          },
          {
            message: "请输入正确的密码",
            trigger: ["blur", "change"]
          }
        ],
        code: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          {
            message: "请输入正确的验证码",
            trigger: ["blur", "change"]
          }
        ],
        agree: [
          {
            // rule 当前规则的相关信息, 比如字段名: agree
            // value 当前校验的值  true false
            // callback 它内部提供给你的一个函数, 成功callback() 失败了callback(new Error('错误提示'))
            validator: function(rule, value, callback) {
              if (value === false) {
                callback(new Error("请同意许可"));
              } else {
                callback();
              }
            },
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/backlog");
      // console.log(this.$refs.logoref)
      // console.log(this.$refs.form)
      // 要先拿到el-form组件, 调用内部的校验方法, 进行校验
      // 校验通过, 才发送ajax请求
      /*       this.$refs.form.validate(flag => {
        this.$router.push("/backlog");
        if (flag) {
          // 通过校验了, 才发送ajax请求了, 登录请求
          reqUserLogin(this.form.mobile, this.form.code).then(res => {
            console.log(res, "res1111");
            const token = res.data.data.access;
            if (res.status !== 200) {
              return this.$message.error("登录失败");
            }
            this.$message.success("登录成功");
            window.localStorage.setItem("token", JSON.stringify(token));
            this.$router.push("/backlog");
          });
        }
      }); */
    }
  }
};
</script>

<style lang="less" scoped>
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    border-radius: 5%;
    min-width: 300px;
    padding: 30px 50px 10px;
    background: rgba(255, 255, 255, 0.2);
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        // background: url("../../assets/logo.png") no-repeat center;
        background-size: contain;
      }
    }
    .login-form {
      .title {
        text-align: center;
        margin-bottom: 30px;
        color: #fff;
        font-weight: 700;
        font-size: 24px;
        font-family: Microsoft Yahei;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
