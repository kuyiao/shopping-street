<template>
  <!-- 详情页的商品 -->
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <!-- 商品的介绍 -->
    <div class="info-desc clear-fix">
      <h2 class="indu">商品的介绍</h2>
      <div class="desc">{{ detailInfo.desc }}</div>
      <!-- <div class="end"></div> -->
    </div>
    <!-- 穿着效果 -->
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <!-- 详情页的商品图片 -->
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // 图片已加载的个数
      counter: 0,
      // 图片总的个数
      imagesLength: 0
    };
  },
  methods: {
    imageLoad() {
      if (++this.counter === this.imagesLength) {
        // 商品的图片全部加载完成就发送事件
        this.$emit("imageLoad");
      }
    }
  },
  // watch 监听属性的变化
  watch: {
    // 获取图片的个数  detailInfo的值发生改变时触发
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.info-desc {
  border: 2px solid var(--color-high-text);
  border-radius: 8px;
}
.desc {
  /* padding: 0px 10px 10px 10px; */
  padding: 10px;
}
.indu {
  text-align: center;
}
.info-key {
  background-color: #dddddd;
  border: 2px solid #eeeeee;
  border-radius: 6px;
  text-align: center;
  margin: 10px 0px 10px;
  font-size: 28px;
}
.goods-info {
  margin-top: 30px;
  font-size: 15px;
  padding: 0 10px;
  background-color: #fff;
}
.info-list img {
  width: 100%;
}
</style>