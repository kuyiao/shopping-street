<template>
  <div id="home">
    <!-- 顶部导航模块 -->
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <!-- 把所有要滚动的组件放到 <scroll> 移动端滚动组件里 3监听滚动 不加:会被当成字符型变量
 @scroll=""接收子组件传过来的信息  :pullUpLoad="true" 开启上拉加载更多 @pullingUp="loadMore"-->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 使用轮播图组件并且把轮播图的数据传过去 -->
      <home-swiper :banners="banners" @SwiperImageLoad="SwiperImageLoad" />
      <!--精品推荐组件并且把-精品推荐的数据传过去  -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行组件 -->
      <feature-view />
      <!--:titles="['流行','新款','精选']" 把('流行','新款','精选')传给子组件的titles属性
      @tabClick="tabClick" 接收子组件传过来的索引,用来判断要显示的模块(流行,新款,精选)  -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      /><!-- :class="{ fixed: isTabFixed }" -->
      <!-- 使用商品组件并把商品对应的数据传过去 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- .native 监听组件的修饰符  返回顶部按钮-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <ul>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
      <li>礼包</li>
    </ul> -->
  </div>
</template>

<script>
// 导入顶部导航组件
import NavBar from "components/common/navbar/NavBar";
//流行,新款,精选之间切换的组件
import TabControl from "components/content/tabControl/TabControl";
// 商品组件
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";
// 移动端滚动插件的组件
import Scroll from "components/common/scroll/Scroll";

// 导入轮播图组件
import HomeSwiper from "./childComps/HomeSwiper";
// 导入-精品推荐组件
import RecommendView from "./childComps/RecommendView";
// 导入本周流行组件
import FeatureView from "./childComps/FeatureView";

// 导入请求首页数据的函数
import { getHomeMultidata, getHomeGoods } from "network/home";

// import { debounce } from "common/utils";

// 导入混入函数
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    // BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,

    Scroll
  },
  data() {
    return {
      // result: null
      // 把请求过来的数据保存起来
      // 轮播图的数据
      banners: [],
      // -精品推荐的数据
      recommends: [],
      goods: {
        // 流行的数据  page页码 具体的数据
        pop: { page: 0, list: [] },
        // 新款
        new: { page: 0, list: [] },
        // 精选
        sell: { page: 0, list: [] }
      },
      // 决定显示那一个模块(流行,新款,精选) 默认显示流行模块
      currentType: "pop",
      // 流行\新款\精选组件内的元素距离顶部的距离
      tabOffsetTop: 0,
      // 是否吸顶
      isTabFixed: false,
      //  保存离开当前页面时的位置s
      saveY: 0

      // isShowBackTop: false,
      // tabOffsetTop: 671,
      // ,itemImgListener: null
    };
  },
  // 使用混入  混入内的生命周期函数会比自身的生命周期函数先调用
  mixins: [itemListenerMixin, backTopMixin],

  // 生命周期函数-created 组件创建完成时触发
  created() {
    // 发送网络请求
    // 1.请求多个数据 (轮播图和精品组件的数据)
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 50);

    // 1.监听item中图片加载完成
    // this.$bus.$on("itemImageLoad", () => {
    // console.log("我被监听了");
    // refresh();

    // this.$refs.scroll.refresh();
    // });

    // 2.赋值 => 获取tabControl的offsetTop
    // 赋值的组件都会有一个属性$el:用于获取组建中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;

    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  methods: {
    /* 网络请求的相关方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log("请求成功", res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log("请求成功", res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    /* 事件监听的相关方法 */
    tabClick(index) {
      console.log("我被点击了", index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      // 让顶部的流行\新款\精选组件的选择 和 中间的同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部按钮
    // backClick() {
    //   console.log("我回到顶部啦！");
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },

    //  滚动到的位置  是否显示返回顶部的组件
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = -position.y > this.tabOffsetTop;

      // 2.决定tabControl是否吸顶( position: fixed )
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("我加载了更多了");
      // 调用请求商品数据函数,把当前显示的模块类型传过去(流行,新款,精选),请求更多的商品数据数据
      this.getHomeGoods(this.currentType);
    },
    //  流行\新款\精选组件内的元素距离顶部的距离 $el获取里面的子组件
    SwiperImageLoad() {
      // console.log((this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop));
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    // console.log("activated");
    //刷新数据
    this.$refs.scroll.refresh();

    // 调用scrollTo函数滚动到指定的位置 x y 所需的时间(不能给0,不然有时网络延迟数据没加载,就会出现问题)
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // console.log("deactivated");
    // this.saveY = -1000;

    // 1.保存Y值
    // this.$refs.scroll.scroll.y 获取滚动插件滚动到的Y轴位置
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消首页的全局事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  destroyed() {
    // console.log("home被销毁了");
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /* 
  //在使用浏览器原生滚动时，为了防止导航栏不跟随一起滚动时使用
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/*
.content{
   color: red; */
/* height: 300px; */
/* 任何长度值都可以使用calc()函数进行计算 */
/* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; 
}
*/
.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
