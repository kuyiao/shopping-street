<template>
  <!-- 小按钮 -->
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      // 布尔型
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #aaa;
  background-color: #fff;
}

.check {
  /* 边框颜色 */
  border-color: var(--color-high-text);
  background-color: var(--color-high-text);
}
.check-button img {
  margin: 3px 0 2px 1px;
  width: 14px;
}
</style>