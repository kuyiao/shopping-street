<template>
  <!-- 轮播图组件 -->
  <!-- 使用封装好的轮播图组件,并传入对应的数据 -->
  <swiper>
    <!-- 想要多少个图片轮播这里就要有多少个swiper-item组件,swiper-item组件里有个默认的插槽
      在swiperItem组件标签里写的东西会被替换掉默认的插槽,然后swiperItem组件再替换掉swiper组件的默认的插槽 -->
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <!--因为数据是动态加载的,所以需要时间要获取 流行\新款\精选组件内的元素距离顶部的距离
         现监听轮播图是否加载完成不然数据不准确 @load 监听图片是否加载完成 -->
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";

import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    // 接收轮播图的数据
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // console.log("加载完成");

      // 这样只会发送一次事件
      if (!this.isLoad) {
        this.$emit("SwiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>
<style scoped>
</style>