<template>
  <!-- 返回顶部 -->
  <div class="back-top">
    <img src="~assets/img/common/tops.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop"
};
</script>

<style  scoped>
.back-top {
  position: fixed;
  right: 22px;
  bottom: 60px;
  border-radius: 50%;
  background-color: #fff;
  width: 35px;
  height: 35px;
  z-index: 9999999999;
}
.back-top img {
  width: 100%;
  height: 100%;
}
</style>