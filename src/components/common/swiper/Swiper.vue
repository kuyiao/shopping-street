<template>
  <!-- 轮播图的封装组件  全局的大盒子-->
  <div id="hy-swiper">
    <!-- 　touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
    touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。 
    touchend事件：当手指从屏幕上离开的时候触发。-->
    <!-- 轮播图的图片 -->
    <div
      class="swiper"
      ref="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicator"> </slot>
    <!-- 小圆点(分页器)-->
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    // 定时器的延迟时间
    interval: {
      type: Number,
      default: 3000
    },
    // 过渡的时间
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25 //滚动的比例
    },
    showIndicator: {
      type: Boolean,
      default: true //是否显示小圆点(分页器)
    }
  },
  data() {
    return {
      slideCount: 0, //元素的个数(轮播图的个数)
      totalWidth: 0, //swiper的宽度(轮播图的宽度)
      swiperStyle: {}, //swiper的样式 (滚动的位置和过渡)
      currentIndex: 1, //当前的index (当前图片的索引)
      scrolling: false //是否正在滚动
    };
  },
  // metheds  函数提前定义（ 类似提前声明变量 进入页面内容全部渲染完成后自动引函数
  mounted() {
    // 1.操作DOM,在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      //  2.开启定时器
      this.startTimer();
    }, 200); //这里一定要>=200ms开启定时器,因为是异步操作开启定时器速度太快
    //还没有拿到返回的数据,模板已经渲染完了,后来拿到了数据,但并没有响应式的刷新
  },
  methods: {
    /**
     *定时器操作 实现自动轮播
     */
    startTimer() {
      this.playTimer = window.setInterval(() => {
        // 每隔this.interval秒就让currentIndex++,从而该变滚动的位置
        this.currentIndex++;
        // 调用scrollContent函数实现滚动
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer() {
      // 取消定时器
      window.clearInterval(this.playTimer); //clearInterval() 方法可取消由 setInterval() 函数设定的定时执行操作。
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent(currentPosition) {
      //  0.设置正在滚动
      this.scrolling = true;

      // 1.开始滚动动画  transition 过渡 transform要过渡的属性 用时this.animDuration + 'ms'
      this.swiperStyle.transition = "transform" + this.animDuration + "ms";
      this.setTransform(currentPosition);

      // 2.判断滚动到的位置(是否做无缝滚动)
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 效验正确的位置
     */
    checkPosition() {
      window.setTimeout(() => {
        //  1. 效验正确的位置  做无缝滚动
        // 停止过渡
        this.swiperStyle.transition = "0ms";
        // currentIndex索引   slideCount元素的个数
        // 判断:如果图片的索引>=图片的个数(不包括克隆的),那就证明轮播图已经滚动的我们克隆图片的位置
        // 这时我们就应该让图片不做过渡的快速滚动到第一张图片的位置
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          //图片移动的距离 = 索引* 图片的宽度 让轮播图回到第一张图片的位置
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          //反知 <= 就滚动到最后一张图片的位置
          this.currentIndex = this.slideCount;
          // 让轮播图滚到最后一张图片的位置
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 2.结束移动后的回调 this.$emit("function",param);   //其中function为父组件定义函数，param为需要传递参数
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    /**
     *  设置滚动的位置 translate3d（x,y,z） x轴往左边走是负
     */
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      // 做浏览器的兼容性处理
      this.swiperStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    /* *
     *  操作DOM,在前后添加Slide
     */
    handleDom() {
      //  1.获取要操作的元素
      // 轮播图的大盒子
      // let swiperEl = document.querySelector('.swiper');
      let swiperEl = this.$refs.swiper;
      // 轮播图,图片的盒子 在SwiperItem组件里
      let slideEls = swiperEl.getElementsByClassName("slide");

      // 2.保存轮播图刚开始的图片个数,不包括克隆的
      this.slideCount = slideEls.length;

      // 3.如果大于1个,那么在前后分别添加一个slide cloneNode() 方法克隆所有属性以及它们的值
      // 做无缝滚动
      if (this.slideCount > 1) {
        // 克隆第一张图片
        let cloneFirst = slideEls[0].cloneNode(true);
        // 克隆最后一张图片
        let cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
        //  insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
        swiperEl.insertBefore(cloneLast, slideEls[0]);
        // appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
        swiperEl.appendChild(cloneFirst);
        // 获取swiperEl元素(轮播图)自身的宽度
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
        // console.log(swiperEl.style);
        // console.log(this.swiperStyle);
        // console.log(swiperEl.style===this.swiperStyle);
      }
      //  4.让swiper元素,显示第一个(目前是显示前面添加的最后一个元素)
      // 调用setTransform方法把轮播图)自身的宽度传过去
      this.setTransform(-this.totalWidth);
    },

    /**
     * 拖动事件处理
       当手指触摸屏幕时候触发 
       */

    touchStart(e) {
      //  1.如果正在滚动,不可拖动
      if (this.scrolling) return;
      // 2.停止定时器
      this.stopTimer();

      // 3.报存开始滚动的位置(刚开始触摸屏幕的X轴坐标)
      this.startX = e.touches[0].pageX;
    },

    // touchmove事件：当手指在屏幕上滑动的时候连续地触发
    touchMove(e) {
      // 因为currentX和distance 的
      // 1.计算出用户拖动的距离
      // e.touches[0].pageX 手指滑动屏幕之后的X轴坐标
      // this多用于函数内部，它永远指向调用他的那个对象
      this.currentX = e.touches[0].pageX;
      // 手指滑动屏幕之后的X轴坐标 - 刚开始触摸屏幕的X轴坐标 = 手指移动的距离
      this.distance = this.currentX - this.startX;
      // 要移动的距离 = 索引 * 图片的宽度
      let currentPosition = -this.currentIndex * this.totalWidth;
      // 最终滑动后要移动的距离 = 要移动的距离 + 手指移动的距离
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置 调用setTransform方法让图片跟着手指滚动
      this.setTransform(moveDistance);
    },

    // 当手指从屏幕上离开的时候触发
    touchEnd(e) {
      // 因为要判断手指移动的距离所以 取个绝对值
      //  1.获取移动的距离  Math.abs(x) 函数返回指定数字 “x“ 的绝对值
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if (this.distance === 0) {
        return; //this.moveRatio 比例
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //左边移动超过0.5,就让索引减1,来改变滚动的位置
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 向右移动超过0.5,就让索引加1,来改变滚动的位置,否则不做操作
        this.currentIndex++;
      }

      // 3.调用scrollContent函数移动到正确的位置 (当前的图片索引+1*图片的宽度)x轴往左走时负值
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开始定时器
      this.startTimer();
    },

    /* *
     *控制上一个,下一个
     */
    previous() {
      this.changeItem(-1);
    },

    next: function() {
      this.changeItem(1);
    },

    changeItem(num) {
      //  1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    }
  }
};
</script>
 
<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  /* 弹性布局子元素居中紧挨着填充 */
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  /* css3 盒子模型 */
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>