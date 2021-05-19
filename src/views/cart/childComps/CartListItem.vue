<template>
  <!-- 购物车商品的组件 -->
  <div id="shop-item">
    <!-- 按钮 -->
    <div class="item-selector">
      <!--:is-checked="itemInfo.checked" 决定是否选中  @click.native="checkedChange" 监听当前的按钮组件-->
      <check-button
        :is-checked="itemInfo.checked"
        @click.native="checkedChange"
      ></check-button>
      <!--  -->
    </div>
    <!-- 商品的图片 -->
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <!-- 商品的标题 -->
      <div class="item-title">{{ itemInfo.title }}</div>
      <!-- 商品介绍 -->
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <!-- 价格 left right 全局样式内设置了左右浮动-->
        <div class="item-price left">￥{{ itemInfo.price }}</div>
        <!-- 件数 -->
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入按钮组件
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItrm",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    // 按钮点击触发的函数
    checkedChange() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
};
</script>

<style scoped>
/* 最外层的大盒子 */
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
/* 小按钮 */
.item-selector {
  width: 20px;
  display: flex;
  /* 弹性布局子元素居中紧挨着填充（水平居中） */
  justify-content: center;
  /*垂直居中 */
  align-items: center;
}
/* 商品的图片 */
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
/* 商品具体信息的大盒子 */
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
/* 商品的标题和介绍 */
.item-title,
.item-desc {
  /* 溢出隐藏 */
  overflow: hidden;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  /* text-overflow 属性规定当文本溢出包含元素时发生的事情 
     clip	修剪文本。	 ellipsis	显示省略符号来代表被修剪的文本。string	使用给定的字符串来代表被修剪的文本。*/
  text-overflow: ellipsis;
}
/* 商品介绍 */
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
/* 商品价格和件数的大盒子 */
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
/*  商品价格*/
.info-bottom .item-price {
  color: orangered;
}
</style>