<template>
  <div class="container">
    <div class="head404"></div>
    <div class="txtbg404">
      <div class="txtbox">
        <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
        <p class="paddingbox">请点击以下链接继续浏览网页</p>
        <p>
          》
          <a style="cursor:pointer" @click="back">返回上一页面</a>
        </p>
        <p>
          》
          <a href="/">返回网站首页</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back(){
      this.$router.go(-1);
    }
  },
};
</script>

<style lang='less' scoped>
.container {
  height: 100vh;
  width: 100%;
  background-color: #494949;
}

.head404 {
  width: 580px;
  height: 234px;
  padding: 50px 0;
  margin: 0 auto;
  background: url(https://file.gxnudsl.xyz/image/404Page/head404.png) no-repeat;
}

.txtbg404 {
  width: 499px;
  height: 169px;
  margin: 10px auto 0 auto;
  background: url(https://file.gxnudsl.xyz/image/404Page/content404.png)
    no-repeat;
}

.txtbg404 .txtbox {
  width: 390px;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 13px;
}

.txtbg404 .txtbox p {
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
  color: #fc9d1d;
  text-decoration: underline;
}
</style>