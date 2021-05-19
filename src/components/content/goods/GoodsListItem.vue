<template>
  <!-- 首页和详情页、分类都使用了这个组件 -->
  <!-- @click="itemClick" 监听点击进入详情页 -->
  <div class="goods-item" @click="itemClick">
    <!--商品的图片     原生:img.onload=function(){}  vue的 @load 监听图片是否加载完成-->
    <!--  v-lazy="showImage" :src="showImage"  -->
    <!-- goodsItem.show.img -->
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <!--商品介绍的文字-->
      <p :title="goodsItem.title">{{ goodsItem.title }}</p>
      <!-- 商品价格 orgPrice  或 price-->
      <span class="price">{{ goodsItem.price }}</span>
      <!--商品的收藏数量-->
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // 计算属性
  computed: {
    // 要显示图片的路径 因为有时一个组件有很多个页面都在用,接口可能不一样路径也是
    // 所以这里做了一个判断
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    }
  },
  methods: {
    imageLoad() {
      // 事件总线内的事件在vue全局都可以用
      // this.$bus.$emit发射事件到事件总线内,进行共享事件
      // if (this.$route.path.indexO("/home")) {
      this.$bus.$emit("itemImgLoad");
      // }
      // this.$router 相当于一个全局的路由器对象，包含了很多属性和对象（比如 history 对象），任何页面都可以调用其 push(), replace(), go() 等方法。
      //  this.$route 表示当前路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name, path, params, query 等属性。
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      //  if(this.$route.path.indexof('/home')){
      //    this.$bus.$emit('homeItemImageLoadaa');
      //   }else if(this.$route.path.indexof('/detail')){
      //     this.$bus.$emit('detailItemIngLoad')
      //   }
    },
    itemClick() {
      // this.$router 获取当前活跃的组件
      //  replace更改URl路径(浏览器不能前进和后退),push 可以
      // console.log('跳转到详情页');
      //  动态路由传递参数
      this.$router.push("/detail/" + this.goodsItem.iid);
      //或 this.$router.push({
      //   // 要跳转的路由地址
      //   path:'/detail',
      //   // 要传递的参数
      //   query:{
      //   }
      // })
    }
  }
};
</script>

<style scoped>
/*  width: 100%;
  当指定view为flex布局后，给子元素定义width是不起效果的
   原因：定义为flex布局元素的子元素，自动获得了flex-shrink的属性，这个属性是什么意思呢？就是告诉子元素当父元素宽度不够用时，自己调整自己所占的宽度比，这个flex-shrink设置为1时，表示所有子元素大家同时缩小来适应总宽度。当flex-shrink设置为0时，表示大家都不缩小适应。
   所以，倘若给父元素设置了flex布局后，若要其子元素的width有效果，必须给子元素设置flex-shrink为0。 
flex-shrink: 0;*/
.goods-item {
  width: 48%;
  padding-bottom: 10px;
}
.goods-item img {
  width: 100%;
  height: 240px;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  /* text-overflow 属性规定当文本溢出包含元素时发生的事情 
     clip	修剪文本。	测试
     ellipsis	显示省略符号来代表被修剪的文本。	测试
     string	使用给定的字符串来代表被修剪的文本。*/
  text-overflow: ellipsis;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  overflow: hidden;
  margin: 5px 0;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/home/goods-info-collect.svg") 0 0/14px 14px;
}
</style>