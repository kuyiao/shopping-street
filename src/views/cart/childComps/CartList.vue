<template>
  <div class="cart-list">
    <!-- :probeType ="3" -->
    <!-- 使用滚动插件 -->
    <scroll class="content" ref="scroll">
      <!-- <li v-for="(item, index) in cartList" :key="index">{{ item }}</li> -->
      <!-- <ul>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
      </ul> -->
      <!-- 使用购物车商品的组件 -->
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      />
    </scroll>
  </div>
</template>
<script>
//导入滚动的插件
import Scroll from "components/common/scroll/Scroll";

// 导入购物车商品的组件
import CartListItem from "./CartListItem";

// 导入Vuex的mapGetters辅助函数  mapGetters辅助函数仅仅是将store(Vuex实例的对象)中的个getter(计算属性)映射到局部计算属性
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    // mapGetters => 附属函数
    ...mapGetters(["cartList"])
  },
  // 进入当前页面时调用
  activated() {
    // console.log("dididi");

    //  refresh() 函数重新计算滚动的高度（数据）
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
.cart-list {
  height: 100vh;
  margin-top: 44px;
}
.content {
  /* background-color: #dddddd; */
  height: calc(100% - 137px);
  overflow: hidden;
}
</style>