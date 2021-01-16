<template>
  <div class="container">
    <div class="loginBox">
      <div class="title">
        欢迎登录后台管理系统
      </div>
      <el-form
        :model="Form"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="form"
        v-loading="isLoading"
        element-loading-text="登陆中..."
      >
        <el-form-item prop="account">
          <el-input type="text" v-model="Form.account"  prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="Form.password"  prefix-icon="el-icon-lock" show-password placeholder="请输入密码" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" style="float: left">记住我</el-checkbox>
          <el-link type="primary" :underline="false" style="float:right">忘记密码？</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import config from '../../untils/base'

export default {
  components: {},
  data() {
    return {
      Form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked:true,
      isLoading:false
    };
  },
  mounted() {
    const accountInfo = this.$cookie.getJSON('accountInfo')
    if (accountInfo) {
      this.Form.account = accountInfo.account
      this.Form.password = accountInfo.password
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          let accountInfo = {
            account:this.Form.account,
            password:this.Form.password
          }
          if (this.checked){
            this.$cookie.set('accountInfo', accountInfo, {expires: 7});
          }else {
            this.$cookie.remove('accountInfo')
          }
          this.$axios.post(`${config.address}/api/v1/user/login`,accountInfo).then(res=>{
            if (res.status === 200 && res.data.msg === '处理成功') {
              if (res.data.data){
                if (!this.$cookie.get('user')) {
                  this.$cookie.set('user', res.data.data, { expires: 1 });
                }
                if (localStorage.getItem('userToken')){
                  localStorage.removeItem('userToken')
                }
                localStorage.setItem('userToken',res.data.data.token)
                this.$notify({
                  title: '提示信息',
                  message:'登陆成功,正在跳转...',
                  type: 'success',
                  duration:1000
                });
                setTimeout(()=>{
                  this.$router.push('/')
                },500)
              }
            }else {
              this.$message.error(res.data.msg);
            }
            this.isLoading = false
          })
        } else {
          this.$message.error("请仔细填写");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
};
</script>

<style lang='less' scoped>
.container {
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(to right, #23f8a7, #0fc3ad);
  .loginBox {
    width: 500px;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    margin: 0 auto;
    .title{
      font-size: 34px;
      font-weight: bold;
      font-family: "楷体";
      text-align: center;
      margin-bottom: 20px;
    }
    .form {
      background-color: white;
      border-radius: 24px;
      padding: 50px;
      .styleBetween{
        display: flex;
        justify-content: space-between;
      }
      .btn{
        width: 100%;
        
      }
    }
  }
}
</style>