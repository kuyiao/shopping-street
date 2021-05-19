<template>
  <!-- 轮播图的封装组件-->
  <div class="slide">
    <!-- 默认的插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Slide",
};
</script>
 
<style scoped>
.slide {
  width: 100%;
  /* 当指定view为flex布局后，给子元素定义width是不起效果的
   原因：定义为flex布局元素的子元素，自动获得了flex-shrink的属性，这个属性是什么意思呢？就是告诉子元素当父元素宽度不够用时，自己调整自己所占的宽度比，这个flex-shrink设置为1时，表示所有子元素大家同时缩小来适应总宽度。当flex-shrink设置为0时，表示大家都不缩小适应。
   所以，倘若给父元素设置了flex布局后，若要其子元素的width有效果，必须给子元素设置flex-shrink为0。 */
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>