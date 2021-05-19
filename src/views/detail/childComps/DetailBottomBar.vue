<template>
  <!--底部的导航 -->
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
      // console.log("我被加入购物车了");
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  height: 49px;
  /* line-height: 49px; */
  background-color: #fff;
  position: absolute; /*fixed*/
  left: 0;
  right: 0;
  bottom: 0;
  /* position: relative;
  bottom: 49px;
  z-index: 999; */

  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 0px;
  background-color: pink;
}
.bar-left .service {
  /* background-position属性设置背景图像的起始位置。 */
  /* background-position: 0 -54px; */
  background: url(~assets/img/detail/service.svg) 0 0/100%;
}
.bar-left .shop {
  background: url(~assets/img/detail/shop.svg) 0 0/100%;
}
.bar-left .select {
  background: url(~assets/img/detail/select.svg) 0 0/100%;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  background-color: #f69;
}
</style>