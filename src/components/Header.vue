<template>
  <div class="container">
    <div class="box">
      <div class="title">小程序后台管理系统</div>
      <div class="user" v-if="user">
        欢迎{{user.authority === 0 ? '管理员' : '超级管理员'}}：{{user.account}}
        <div class="loginOut">
          <el-button type="info" icon="el-icon-switch-button" circle size="mini" @click="exit"></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Message} from "element-ui";

export default {
  components: {},
  data() {
    return {
      user:null
    };
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      if (this.$cookie.get('user')){
        this.user = this.$cookie.getJSON('user').userInfo
      }else {
        Message.error('您还未登录,请先登陆');
        setTimeout(() => {
          window.location.href = '/login'
        }, 500)
      }
    },
    exit(){
      this.$confirm('注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal:false
      }).then(() => {
        this.$cookie.remove("user")
        localStorage.removeItem('userToken')
        window.location.href = '/login'
      })
    }
  },
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-image: linear-gradient(to right, #00cc76, #03bc94, #06aeaf);

  .box{
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title{
      margin-left: 30px;
      font-size: 20px;
      font-weight: bold;
    }

    .user{
      margin-right: 30px;
      display: flex;
      align-items: center;
      .loginOut{
        margin-left: 10px;
      }
    }
  }
}
</style>