<template>
  <!-- 详情页 -->
  <div class="detail">
    <!-- 使用顶部导航栏组件 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <!-- <div>{{ $store.state.cartList.length }}</div> -->
    <!-- 使用轮播图组件 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">
          {{ item }}
        </li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <!-- 使用商品介绍的组件 -->
      <detail-base-info :goods="goods" />
      <!-- 使用店铺相关介绍的组件 -->
      <detail-shop-info :shop="shop" />
      <!-- 使用店铺商品的组件 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <!-- 使用店铺商品的参数组件 -->
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <!--使用店铺商品的评论组件  -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!-- 商品推荐 -->
      <goods-list ref="recommend" :goods="recommends" />
      <!--  @click.native="itemClick"  @itemClick="itemClick"-->
    </scroll>

    <!-- .native 监听组件的修饰符  返回顶部按钮-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <toast :message="message" :show="show" />

    <!-- 底部导航 @addCart="addToCart" 接收加入购物车的事件-->
    <detail-bottom-bar @addCart="addToCart" />
    <!-- <div>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
      <p>{{ iid }}</p>
    </div> -->
  </div>
</template>
<script>
// 引入顶部的导航栏组件
import DetailNavBar from "./childComps/DetailNavBar";
// 引入轮播图组件
import DetailSwiper from "./childComps/DetailSwiper";
// 导入商品介绍的组件
import DetailBaseInfo from "./childComps/DetailBaseInfo";
// 导入店铺相关介绍的组件
import DetailShopInfo from "./childComps/DetailShopInfo";
// 导入店铺商品的组件
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
// 导入商品参数组件
import DetailParamInfo from "./childComps/DetailParamInfo";
// 导入商品评论组件
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// 底部的购物车
import DetailBottomBar from "./childComps/DetailBottomBar";

//导入滚动的插件
import Scroll from "components/common/scroll/Scroll";
// 商品推荐
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";
import Toast from "components/common/toast/Toast";

// 导入防抖函数
import { debounce } from "common/utils";
// 导入混入函数
import { itemListenerMixin, backTopMixin } from "common/mixin"; // itemListenerMixin,

import { mapActions } from "vuex";

import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },

  // 使用混入  混入内的生命周期函数会比自生的生命周期函数先调用
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      //  商品的id
      iid: null,
      //  轮播图数据
      topImages: [],
      //  商品相关的文字和图片
      goods: {},
      //  店铺相关的文字和图片
      shop: {},
      //  店铺商品相关的数据
      detailInfo: {},
      //  商品参数信息
      paramInfo: {},
      // 商品评论
      commentInfo: {},
      // 推荐的数据
      recommends: [],
      // ,itemImgListener: null

      // 存放顶部导航栏的对应内容的位置
      themeTopYs: [],
      // 存放防抖函数的处理结果
      getThemeTopY: null,
      // isShowBackTop: false,

      // 滚动时要改变的顶部导航栏的下标
      currentIndex: null,
      // 点击加入购物车之后的弹窗内容
      message: "",
      // 决定是否显示弹窗
      show: false
    };
  },
  methods: {
    // 将组件内的addCart方法映射到vuex状态管理内
    ...mapActions(["addCart"]),
    // 商品图片加载完之后就会调用这个函数
    imageLoad() {
      // this.newRefresh();
      // 手动刷新滚动的数据
      this.$refs.scroll.refresh();
      // 调用顶部导航栏获取组件位置的函数
      this.getThemeTopY();
    },
    // 点击顶部的导航栏滚动到指定的位置
    titleClick(index) {
      // console.log(index);
      // Y轴向下滚是负值
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 滚动的指定的位置就切换顶部导航栏的按钮
    contentScroll(position) {
      // console.log(position);

      // 1. 获取Y值   Number.MAX_VALUE数字的最大值
      const positoinY = -position.y;

      // 2.positoinY和主题中的值相对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positoinY >= this.themeTopYs[i] &&
          positoinY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(i);
        }
      }

      // 3.是否显示回到顶部
      this.listenShowBackTop(position);
    },
    // 点击加入购物车
    addToCart() {
      // console.log("我是购物车");

      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);

      // 2.将商品添加到购物车模块里面(这里先把要加入购物车商品数据,传给Vuex进行共享)
      // 方法1
      // this.$store 调用仓库(./store/index.js)  commit 提交到mutations内 increment 事件类型
      // this.$store.commit("addCart", product);
      // dispatch 提交到actions内
      // this.$store.dispatch("addCart", product)
      // .then(res =>{
      //   console.log(res);
      // })
      // 方法2  通过辅助函数把addCart方法映射到Vuex 的文件内
      this.addCart(product).then(res => {
        // console.log(res);

        // 这里是加入购物车成功之后才会触发
        /* this.show = true;
        this.message = res;

        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1500); */
        //  res 要显示的文字   1500 文字消失的时间,可以不传使用默认的
        this.$toast.show(res, 1500);
        // console.log(this.$toast);
      });
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1 获取顶部的图片轮播
      // console.log("Detail", res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.2 获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 2.4 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 2.5  保存商品的参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.6 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /* // 一、第一次获取，值不对
      // 值不对的原因：this.$refs.param.$el压根没有渲染
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      console.log(this.themeTopYs); */

      /*  // 二、第二次获取：值不对
      // 支部队的原因：图片没有计算在内
      // 根据最新的数据，对应的DOM是已经被渲染出来
      // 但是图片依然是没有夹杂完（目前获取到offsetTop不包含其中的图片）
      // offsetTop值不对的时候，都是因为图片的问题
      this.$nextTick(() => {
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs);
      }); */

      // // 4. 给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
      // this.getThemeTopY = debounce(() => {
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      //   // console.log(this.getThemeTopY);
      // }, 100);
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log("Recommend", res);

      this.recommends = res.data.list;
    });

    // console.log(11);

    // 4. 给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      // console.log(11);
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
      // console.log(this.getThemeTopY);
    }, 100);
  },
  updated() {
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  mounted() {
    // console.log("mounted");
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  }
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 93px);
  /* overflow: hidden; */
}
</style>