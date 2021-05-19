<template>
  <!-- 分类 -->
  <div class="Category">
    <!-- 使用顶部导航栏组件 -->
    <category-nav-bar class="detail-nav" ref="nav" />
    <!-- 使用左侧导航 -->
    <category-left-bar
      :characters="characters"
      @charactersIndex="charactersIndex"
      class="category-left-bar"
    />
    <tab-control
      :titles="['综合', '新品', '售量']"
      @tabClick="tabClick"
      class="control"
      ref="tabcontrol2"
      v-show="isAgree"
    ></tab-control>
    <!-- 使用滚动的插件 -->
    <scroll
      class="Category-scroll"
      :probe-type="3"
      @scroll="scrollClick"
      ref="scroll"
    >
      <!-- 推荐 -->
      <category-recommend
        :CategoryList="this.recommend"
        class="category-recommend"
      ></category-recommend>
      <tab-control
        :titles="['综合', '新品', '售量']"
        @tabClick="tabClick"
        ref="tabcontrol"
        class="tab-control"
      ></tab-control>
      <!-- 使用商品组件 -->
      <goods-list
        :goods="this.commoditycontent"
        class="goods-list"
      ></goods-list>
    </scroll>
    <!-- .native 监听组件的修饰符  返回顶部按钮-->
    <back-top @click.native="backCLick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 安装移动端的滚动机制的插件 npm install better-scroll --save

// 引入顶部的导航栏组件
import CategoryNavBar from "./childComps/CategoryNavBar";

// 引入商品的左侧导航
import CategoryLeftBar from "./childComps/CategoryLeftBar";
// 推荐
import CategoryRecommend from "./childComps/CategoryRecommend";

//导入滚动的插件
import Scroll from "components/common/scroll/Scroll";
//流行,新款,精选之间切换的组件
import TabControl from "components/content/tabControl/TabControl";
// 商品组件
import GoodsList from "components/content/goods/GoodsList.vue";

// 导入混入函数
import { backTopMixin } from "common/mixin";

// 引入分类页的数据
import { getCategory, getCategoryimg, getSubcategory } from "network/category";
export default {
  name: "Category",
  components: {
    Scroll,
    CategoryNavBar,
    CategoryLeftBar,
    GoodsList,
    TabControl,
    CategoryRecommend
  },
  mixins: [backTopMixin],
  data() {
    return {
      characters: [],
      // 左侧当前活跃的索引
      currentIndex: 0,
      miniWallkey: null,
      commoditycontent: null,
      currentTpe: "pop",
      maitkey: null,
      recommend: null,
      // 切换栏距离顶部的位置
      tabTop: 0,
      // 是否吸顶
      isAgree: false
    };
  },
  // 进入当前页面时调用
  activated() {
    //刷新一下数据
    this.$refs.scroll.refresh();
  },
  //  组件创建完之后调用
  created() {
    // 发送网络请求
    // 1.请求文字数据
    this.getCategorys();
  },
  methods: {
    getCategorys() {
      //1. 获取左侧导航的文字内容
      getCategory().then(res => {
        this.characters = res.data.category.list;
        // maitkey
        this.maitkey = this.characters[0].maitKey;
        // 获取开始的miniWallkey
        this.miniWallkey = this.characters[0].miniWallkey;
        // 2.推荐
        this.getSubcategoryS();
        // 3.图片
        this.getCategorysimg();
      });
    },
    getSubcategoryS() {
      // 2.推荐的数据
      getSubcategory(this.maitkey).then(res => {
        this.recommend = res.data.list;
      });
    },
    getCategorysimg() {
      // 3.获取商品内容
      getCategoryimg(this.miniWallkey, this.currentTpe).then(res => {
        this.commoditycontent = res;
      });
    },

    charactersIndex(index) {
      //  this.currentIndex =  index;
      // 获取对应的miniWallkey
      this.miniWallkey = this.characters[index].miniWallkey;
      this.getCategorysimg();
    },
    // 点击切换
    tabClick(index) {
      //  决定显示那一个模块('综合', '新品', '售量')
      switch (index) {
        case 0:
          this.currentTpe = "pop";
          break;
        case 1:
          this.currentTpe = "new";
          break;
        case 2:
          this.currentTpe = "sell";
          break;
        default:
          break;
      }
      this.getCategorysimg();
      // // 让顶部的流行\新款\精选组件的选择 和 中间的同步
      this.$refs.tabcontrol.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    // 获取滚动的位置
    scrollClick(position) {
      // 1.获取切换栏距离顶部的位置
      this.tabTop = this.$refs.tabcontrol.$el.offsetTop;
      this.isAgree = -position.y >= this.tabTop;

      // 2.判断返回顶部按钮是否显示
      this.listenShowBackTop(position);
    }
  }
};
</script>

<style scoped>
/* 设置区域内的Y轴是可以滚动的,他会自动隐藏超出的部分,不用写overflow: hidden; */
/* overflow-y: scroll; */
/* 最外面的大盒子 */
.Category {
  height: 100vh;
}
.detail-nav {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 99;
}
/* 滚动的区域 */
.Category-scroll {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 90px;
  overflow: hidden;
}
.category-left-bar {
  position: relative;
  top: 44px;
  left: 0;
}
/* 修改插件内的组件样式  .a 组件的父级  >>> .b 组件默认的样式  */
.Category-scroll >>> .goods-item img {
  height: 162px !important;
}
.control {
  position: fixed;
  top: 23px;
  left: 90px;
  right: 0;
  z-index: 9;
}
.tab-control {
  margin-top: 20px;
}
</style>