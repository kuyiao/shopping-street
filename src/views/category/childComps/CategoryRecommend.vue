<template>
  <div class="category-recommend">
    <div class="category-recommend-item" v-for="(item,index) in CategoryList" :key="index">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryRecommend",
  props: {
    CategoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.category-recommend{
  display: flex;
  /* 盒子装不下时就换行 */
  flex-wrap: wrap;
  width: 100%;
}
.category-recommend-item{
  width: 50%;
  text-align: center;
  margin-top:10px ;
}
.category-recommend-item img{
  width: 100%;
}
</style>