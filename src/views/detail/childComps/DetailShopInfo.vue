<template>
  <!-- 店铺介绍的组件 -->
  <div class="shop-info ">
    <!-- 店铺信息 -->
    <div class="shop-top">
      <!--店铺logo -->
      <img :src="shop.logo" alt="" />
      <!-- 店铺名称 -->
      <span class="title">{{ shop.name }}</span>
    </div>
    <!-- 分割线 -->
    <div class="shop-Dividingline"></div>
    <div class="shop-middle">
      <!--店铺商品数量 -->
      <div class="shop-middle-left">
        <div class="shop-middle-item ">
          <div class="sells-count">
            <!-- 过滤器sellCountFilter -->
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总售量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <!--店铺评价  -->
      <div class="shop-middle-right">
        <div
          v-for="(item, index) in shop.score"
          :key="index"
          class="shop-middle-right-item"
        >
          <span class="name">{{ item.name }}</span>
          <span class="score" :class="{ 'score-better': item.isBetter }">
            {{ item.score }}
          </span>
          <span class="better" :class="{ 'better-more': item.isBetter }">
            {{ item.isBetter ? "高" : "低" }}
          </span>
        </div>
      </div>
    </div>
    <div class="shop-button">进店逛一逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped>
/* 最外层的盒子 */
.shop-info {
  position: relative;
  margin: 30px 10px 0 10px;
  padding: 0;
  background-color: #fff;
}
/* 店铺的信息 */
.shop-top {
  margin-left: 10px;
  color: black;
}
/* 店铺的logo  */
.shop-top img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 2px solid #ccc;
  vertical-align: middle;
}
/* 店铺名称 */
.title {
  margin-left: 10px;
  font-weight: 700;
}

/* 店铺介绍的大盒子 */
.shop-middle {
  position: relative;
  display: flex;
  color: black;
}
.shop-middle-left,
.shop-middle-right {
  width: 45%;
  font-size: 15px;
}
.shop-middle-left {
  margin-top: 20px;
  padding: 0 7px;
}
/* 分割线 */
.shop-Dividingline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-8px, -1px);
  width: 1px;
  height: 49px;
  background: rgba(0, 0, 0, 0.2);
}
/* 总售量 */
.shop-middle-item {
  float: left;
}
/* 全部宝贝 */
.info-goods {
  float: right;
  padding-top: 2px;
}
.shop-middle-right {
  padding-left: 23px;
  font-size: 15px;
}

.shop-middle-right-item {
  padding-top: 7px;
}
/* 数字的颜色 */
.score {
  margin-left: 9px;
  color: green;
}
/* 数字的颜色 */
.score-better {
  color: red;
}

.better {
  position: absolute;
  right: 15px;
  /* 低字的背景颜色 */
  color: aliceblue;
  background-color: green;
  padding: 0;
}
/* 高字的背景颜色 */
.better-more {
  background-color: red;
}
.shop-button {
  margin-left: calc(60% - 197px);

  width: 120px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background-color: #dddddd;
  transform: translate(94px, 14px);
  margin-bottom: 10px;
}
</style>