  <!-- 顶部导航模块 -->
<template>
  <div class="nav-bar">
    <!--具名插槽 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
/* http://152.136.185.210:7878/api/m5/home/data?type=pop&page=1 */
export default {
  name: "NavBar"
};
</script>
<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: 18px;

  text-align: center;
  /* 
    阴影 => h-shadow(水平阴影)  v-shadow(垂直阴影) 
    box-shadow: x轴 -y轴 粗细 rgba(red, green, blue, 透明度) ; 
    x轴的右边和y轴的下边是正 
    x和y的偏移量 模糊度
   */
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}
.left,
.right {
  width: 60px;
  /* background-color: #fff; */
}
.center {
  flex: 1;
}
</style>