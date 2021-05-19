<template>
  <!-- 商品的参数 -->
  <div class="param-info" v-if="Object.keys(paramInfo).length != 0">
    <!-- 选购的参照表 -->
    <table
      v-for="(table, index) in paramInfo.sizes"
      :key="index"
      class="info-size"
    >
      <!-- 尺码、胸围 之类的 -->
      <tr v-for="(tr, index) in table" :key="index">
        <td v-for="(td, index) in tr" :key="index">{{ td }}</td>
      </tr>
    </table>

    <!-- 商品的规格数据 -->
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.info" :key="index">
        <!-- 类型 -->
        <td class="info-param-key">{{ info.key }}</td>
        <!-- 参数 -->
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>

    <!-- 商品的图片 -->
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  /* 合并外边框 */
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  /* 当value的数据量比较大的时候,会挤到key,所以要给一个固定的宽度 */
  width: 95px;
}
.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
.info-size {
  width: 100%;
}
.info-size tr {
  display: flex;
}
.info-size tr td {
  flex: 1;
}
</style>