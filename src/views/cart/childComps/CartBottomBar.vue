<template>
  <!-- 购物车底部的汇总工具栏 -->
  <div class="bottom-bar">
    <div class="check-content">
      <!-- 使用小按钮 -->
      <check-button class="check-button" :is-checked="isSelectAll" />
      <span @click="checkClick">全选</span>
    </div>
    <div class="price">
      合计:<span>{{ totalPrice }}</span>
    </div>

    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>
<script>
// 导入按钮组件
import CheckButton from "components/content/checkButton/CheckButton";

// 导入Vuex的mapGetters辅助函数  mapGetters辅助函数仅仅是将store(Vuex实例的对象)中的个getter(计算属性)映射到局部计算属性
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  // 计算属性 用来监控自己定义的变量(响应式)
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    // 价格合计
    totalPrice() {
      //  filter 筛选数组 它直接返回一个数组 item 当前项  index 当前项的索引
      return (
        "￥" +
        this.cartList
          //  找出选中的商品
          .filter(item => item.checked)
          // reduce 函数对数组中所有的内容进行汇总(累加)
          // preValue 初始值(或者上一次回调函数的返回值),item当前元素值
          .reduce((preValue, item) => {
            // 获取被选中商品的数量
            // this.CountLength++
            // console.log(item.price);
            // 总计:商品的价格 * 件数
            return preValue + item.price * item.count;
          }, 0) //定义初始值为0
          .toFixed(2) //保留俩位小数
      );
    },
    // 总的商品数量
    checkLength() {
      // 找出选中的商品
      // 计算商品数量
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      //方法一: 目的:查找是否有商品没被选中,如果有length拿到个数就是>0,取反就是false,否则true
      // 没有数据取消全选
      // if(this.cartList.length === 0) return false;
      //  return !this.cartList  //对个数进行取反  !0 true 其他的数字都是false
      //   //  filter 返回的是数组  length 拿到个数
      //    //  找出没有选中的商品
      //   .filter(item => !item.checked).length

      //  方法二:  find()该方法主要应用于查找第一个符合条件的数组元素。返回的是满足条件的元素
      // 没有数据取消全选

      if (this.cartList.length === 0) return false;
      //   return !this.cartList.filter(item => !item.checked).length;
      //   return !this.cartList.find(item => !item.checked);

      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    // 全选按钮
    checkClick() {
      //   console.log(123654);
      // // 1.如果原来都是选中的,点击一次,全部不选中
      // if (this.isSelectAll) {
      //   this.cartList.forEach(item => item.checked= false);
      // } else {
      //   // 2.如果原来都是不选中(某些不选中),点击一次,全部选中
      //   this.cartList.forEach(item => item.checked = true);
      // }

      // 简化
      this.isSelectAll
        ? this.cartList.forEach(item => (item.checked = false))
        : this.cartList.forEach(item => (item.checked = true));
    },
    calcClick() {
      if (!this.isSelectAll) {
        // 使用this.$toast(自定义的弹窗插件) show() 函数 传入要显示的文字和时间
        this.$toast.show("请选择购买的商品", 1500);
      } else {
        this.$toast.show("结算成功！！！", 1500);
        // return (this.cartList.length = 0);
      }
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  line-height: 52px;
  height: 44px;
  background-color: #eeeeee;
}
.check-content {
  display: flex;
  /*垂直居中 */
  align-items: center;
  height: 49px;
  margin-left: 10px;
}
.chek-content span {
  margin-left: 5px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  height: 100%;
  background: red;
  line-height: 44px;
  text-align: center;
  color: #fff;
}
</style>