<template>
  <!-- ref如果是绑定在组件中的，那么通过this.$refs.ref名称，获取到的是一个组件对象 -->
  <!-- ref如果是绑定在普通对象中的，那么通过this.$refs.ref名称，获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 默认的插槽,用来替换页面需要滚动的内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
//安装移动端滚动插件 npm install better-scroll --save
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    // 监听滚动的变量
    probeType: {
      type: Number,
      // 默认为0不监听
      default: 0
    },
    // 上拉加载更多
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  // 组件挂载完成之后调用
  mounted() {
    // 1.创建BScroll对象
    // 赋值给scroll保存起来  // 传入要滚动的标签和开启想要的功能
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 允许原生的点击事件
      click: true,
      // 变化的观察(进行同步数据的)
      observeDOM: true,
      // 监听滚动的位置 2 监听手指滑动时的,不监听手指离开的惯性滚动 3 监听全部类型
      probeType: this.probeType,
      // pullUpLoad选项,用来配置上拉加载功能.当设置为true或者是一个Object的时候,可以开启上拉加载
      pullUpLoad: this.pullUpLoad
    });

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // 把位置信息position传给父组件
        this.$emit("scroll", position);
        // console.log(position);
      });
    }
    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log("我加载了更多了");
      });
    }
  },
  methods: {
    // 返回顶部
    // x轴的位置 y 轴的位置  time=300 默认用时
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 必须手动调用finishPullUp()方法才能再次上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // refresh() 函数重新计算滚动的高度（数据）
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>