<template>
  <div>
    <div class="icon">
      <i
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="isCollapse = !isCollapse"
      ></i>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#00cc5d"
      :router="true"
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/controlCenter">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>控制中心</span>
        </template>
        <el-menu-item index="/controlCenter/banner">
          <i class="el-icon-s-tools"></i>
          <span slot="title">页面轮播配置</span>
        </el-menu-item>
        <el-menu-item index="/controlCenter/scenery">
          <i class="el-icon-s-tools"></i>
          <span slot="title">页面景点配置</span>
        </el-menu-item>
        <el-menu-item index="/controlCenter/ad">
          <i class="el-icon-s-tools"></i>
          <span slot="title">页面广告配置</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>数据中心</span>
        </template>
        <el-menu-item index="3-1">
          <i class="el-icon-s-order"></i>
          <span slot="title">新增用户统计</span>
        </el-menu-item>
        <el-menu-item index="3-2">
          <i class="el-icon-s-order"></i>
          <span slot="title">用户数量统计</span>
        </el-menu-item>
        <el-menu-item index="3-3">
          <i class="el-icon-s-order"></i>
          <span slot="title">数据接口统计</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/examineConfig">
        <i class="el-icon-document-checked"></i>
        <span slot="title">审核管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统中心</span>
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-menu"></i>
          <span slot="title">系统权限配置</span>
        </el-menu-item>
        <el-menu-item index="5-2">
          <i class="el-icon-menu"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
        <el-menu-item index="5-3">
          <i class="el-icon-menu"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: none;
}
.icon {
  height: 50px;
  width: 100%;
  background-color: #445e68;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 25px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>