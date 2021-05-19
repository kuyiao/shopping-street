<template>
  <!-- 商品介绍的组件 -->
  <!-- Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组,
   因为对象没有length属性 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <!-- 商品名称 -->
    <div class="info-title">{{ goods.title }}</div>
    <!-- 商品价格 -->
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="info-columns">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
.base-info {
  padding: 0 9px 15px 9px;
  border-bottom: 5px solid #f1f0f3;
}
.info-price {
  margin: 7px 0 20px 0;
}
.info-title {
  color: #252723;
  font-weight: 700;
  font-size: 16px;
}
.n-price {
  font-weight: 700;
  color: #f24d5f;
  font-size: 22px;
}
/* 设置【下划线效果 代码：text-decoration:underline;】
 设置【中划线效果 代码：text-decoration: line-through;】
 设置【上划线效果 代码：text-decoration:overline】 */
.o-price {
  text-decoration: line-through;
  font-size: 13px;
  margin: 0 8px;
}
.discount {
  display: inline-block;
  width: 58px;
  height: 19px;
  background-color: #f24d5f;
  border-radius: 5px;
  line-height: 19px;
  font-size: 14px;
  color: ivory;
  text-align: center;
}
.info-columns {
  display: flex;
  /* 先两边贴边 再平分空间*/
  justify-content: space-between;
  font-size: 16px;
  color: #a49c9a;
}
.info-columns span {
  flex: 1;
}
.info-columns span:nth-child(2) {
  text-align: center;
}
.info-columns span:nth-child(3) {
  text-align: right;
}
.info-service {
  height: 40px;
  margin-top: 22px;
  display: flex;
  /*  在主轴居中对齐  (如果x轴是主轴则水平居中) */
  justify-content: center;
  text-align: center;
  font-size: 15px;
  color: black;
}
.info-service-item {
  flex: 1;
}
.info-service-item img {
  width: 13px;
  /* 清除图片与文字之间的空白缝隙 */
  vertical-align: middle;
}
</style>