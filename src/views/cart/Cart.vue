<template>
  <!-- 购物车模块 -->
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
// 导入顶部导航组件
import NavBar from "components/common/navbar/NavBar";
// 导入 商品列表的组件
import CartList from "./childComps/CartList";
// 底部的汇总组件
import CartBottomBar from "./childComps/CartBottomBar";

// 导入Vuex的mapGetters辅助函数  mapGetters辅助函数仅仅是将store(Vuex实例的对象)中的个getter(计算属性)映射到局部计算属性
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 使用Vuex的map辅助函数
    // 两种语法
    // 1.数组的写法
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }

    // 两种语法
    // ...mapGetters(["cartLength"]),
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  }
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 520;
}
</style>
