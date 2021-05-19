<template>
  <!-- 左侧导航 -->
  <div class="CategoryLaft">
    <div
      class="characters"
      :class="{ active: index === activeIndex }"
      v-for="(item, index) in characters"
      :key="index"
      @click="charactersClick(index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryLeftBar",
  props: {
    characters: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // 活跃时的索引
      activeIndex: 0
    };
  },
  methods: {
    charactersClick(index) {
      this.activeIndex = index;
      this.$emit("charactersIndex", index);
    }
  }
};
</script>

<style  scoped>
.CategoryLaft {
  width: 25%;
  background-color: #efefef;
  margin-left: 2px;
}
.characters {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.active {
  background-color: #fff;
  border-left: 3px solid #b7404f;
  color: var(--color-high-text);
  font-weight: 700;
}
</style>