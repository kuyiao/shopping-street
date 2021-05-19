<template>
  <div id="app">
    <!--keep-alive 是Vue内置的一个组件,可以使被包含的组件保留状态,或避免重新渲染。
    也就是说里面对应的组件,就不会被频繁创建和销毁,可以提高cpm效率 
     exclude 设置要排除的组件 -->
    <keep-alive exclude="Detail">
      <!-- 显示路由的组件 -->
      <router-view></router-view>
    </keep-alive>
    <!--驼峰写法  <main-tab-bar> === <MainTabBar> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 导入MainTabBar 组件
import MainTabBar from "components/content/maintabbar/MainTabBar";

export default {
  name: "App",
  components: {
    //  注册MainTabBar组件
    MainTabBar
  }
};
</script>
<style scoped>
/* 
  引入初始化的css文件   
  assets 路径别名 可以直接找到src/assets 文件夹 
*/
@import url("./assets/css/base.css");
</style>
