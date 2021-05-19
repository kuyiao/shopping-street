<template>
  <div>
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>

      <div class="title" slot="center">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: index == currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      //   console.log("我是title，我被点击了", index);
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      //   this.$router.go(-1);

      this.$router.back();
    }
  }
};
</script>
<style scoped>
.title {
  display: flex;
  font-size: 16px;
}
.title-item {
  flex: 1;
}
.back {
  width: 22px;
  height: 22px;
  margin-top: 5px;
  margin-left: 9px;
}
.back img {
  width: 100%;
  height: 100%;
}
.active {
  color: var(--color-high-text);
}
</style>