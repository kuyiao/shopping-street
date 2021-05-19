<template>
  <!-- 底部导航的封装组件 -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 具名插槽 -->
    <!-- 接收活跃时的图片 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- 不活跃时的图片 -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 接收文字 用div装起来方便设置样式-->
    <!-- 绑定一个style 获取活跃时的字体颜色 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 父传子:props 接收父组件传过来的数据
  props: {
    path: String,
    activeColor: {
      // 限制类型为字符串
      type: String,
      // 设置默认的颜色
      default: "var(--color-tint)"
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    // 控制显示那张图片
    isActive() {
      // this.$route获取当前活跃的组件
      //indexOf=>该方法将从头到尾地检索字符串如果找到返回第一次出现的位置,找不到返回-1
      // 这里返回的是布尔值 如果在当前页面的$router.path中找不到this.path就是-1就执行
      // -1 !==-1? 答案是等于 条件不成立返回false,找到时返回true
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 控制文字颜色
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // this.$router 获取当前活跃的组件
      // replace更改URl路径(浏览器不能前进和后退)
      // replace() 方法可用一个新文档取代当前文档
      // 也可以使用push方法
      this.$router.replace(this.path);
      // console.log("itemClick");
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  /* 平分剩余空间 */
  flex: 1;
  text-align: center;
  /* 大多数的tabbar的高度都为49px */
  height: 49px;
  /* line-height: 49px; */
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  /* 清除图片与文字之间的空白缝隙 */
  /* vertical-align => 与父元素的对齐方式 */
  /* vertical-align: middle; => 放在父元素的中间 */
  vertical-align: middle;
  margin: 2px 0;
}
/* .active {
  color: var(--color-tint);
} */
</style>