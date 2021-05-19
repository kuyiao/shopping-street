<template>
  <!-- 顶部导航栏 -->
  <div>
     <nav-bar class="center">
       <div slot="center">商品分类</div>
     </nav-bar>
  </div>
</template>

<script>
// 导入顶部导航组件
import NavBar from "components/common/navbar/NavBar";
export default {
   nane:"CategoryNavBar",
   components:{
     NavBar
   },
}
</script>

<style  scoped>
 .center{
   background-color: var(--color-high-text);
   color: #fff;
   font-weight:700;
   z-index: 9;
 }
</style>