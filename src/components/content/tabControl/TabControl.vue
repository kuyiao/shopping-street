<template>
  <!-- 流行,新款,精选之间切换的组件 -->
  <div class="tab-control">
    <div
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
    >
      <span>
        {{ item }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      // 当默认值是对象或数组是这里就要是函数类型
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // 记录那一个被选中
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 发送请求this.$emit(事件名称,要发送的参数)
      this.$emit("tabClick", index);
    }
  }
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); */
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 1px solid var(--color-high-text);
}
</style>