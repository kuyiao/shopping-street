<template>
  <!-- tab-bar 就是组件的标签名 -->
  <div class="tab-bar">
    <!--默认的插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style>
.tab-bar {
  /* 弹性布局 */
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 
    阴影 => h-shadow(水平阴影)  v-shadow(垂直阴影) 
    box-shadow: x轴 -y轴 粗细 rgba(red, green, blue, 透明度) ; 
    x轴的右边和y轴的下边是正 
    x和y的偏移量 模糊度
   */
  box-shadow: 0 -8px 6px rgba(0, 0, 0, 0.2);
}
</style>