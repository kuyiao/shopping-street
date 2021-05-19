<template>
  <!-- 
    使用Tabbar组件 
  Tabbar组件内写了个默认的插槽
    如果组件标签里面有写东西就会替换到默认插槽slot中
    -->
  <tab-bar>
    <!-- 使用TabBarItem组件 -->
    <!-- 
      path='/home'  把字符串 /home 传给 path 
      如果path前面加了 : 就是动态的接收这里的数据  这里没有使用
      activeColor 决定要变换的文字颜色-->
    <tab-bar-item path="/home" activeColor="var(--color-tint)">
      <!-- assets 路径别名 可以直接找到src/assets 文件夹  在html 里的路径前面要加 ~ -->
      <!-- 替换TabBarItem文件内指定的插槽 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <!-- 活跃时显示的图片 -->
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="var(--color-tint)">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="var(--color-tint)">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="var(--color-tint)">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入Tabbar
import TabBar from "components/common/tabbar/TabBar";
// 导入Tabbar的子组件TabBarItem
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabbar",
  components: {
    // 注册TabBar组件
    TabBar,
    // 注册Tabbar的子组件TabBarItem
    TabBarItem
  }
};
</script>
<style scoped>
</style>
