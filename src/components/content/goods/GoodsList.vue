<template>
  <div class="goods">
    <!-- 使用首页的商品模块,并传入数据,和遍历 -->
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    />
    <!-- {{ goods }} -->
    <!-- <ul>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
      <li>我喜欢你</li>
    </ul> -->
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.goods {
  display: flex;
  /* 盒子装不下时就换行 */
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
  padding: 3px;
}
</style>