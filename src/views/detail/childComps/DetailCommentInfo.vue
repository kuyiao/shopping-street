<template>
  <!-- 商品的评论 -->
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <!-- 标题部分 -->
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <!-- 用户头像和名称 -->
    <div class="info-user">
      <!--用户头像  -->
      <img :src="commentInfo.user.avatar" alt="" />
      <!--用户名 -->
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <!-- 评价的内容 -->
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <!-- 评价的时间 服务器返回的是秒为单位的 我们需要用筛选器做格式转换-->
        <span class="date">{{ commentInfo.created | shoWDate }}</span>
        <!-- 商品的样式 -->
        <span>{{ commentInfo.style }}</span>
      </div>
      <!-- 评价的图片 -->
      <div class="info-imgs">
        <img
          :src="item"
          v-for="(item, index) in commentInfo.images"
          :key="index"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
// 导入时间格式转换函数
import { formatDate } from "common/utils.js";
export default {
  neme: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // 筛选器
  filters: {
    shoWDate(value) {
      // 1.将时间戳转成Data对象 Data对象接收的是毫秒数所以 * 1000
      const date = new Date(value * 1000);

      // 2.将date进行格式转换
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.header-title {
  float: left;
  font-size: 15px;
}
.header-more {
  float: right;
  margin-right: 10px;
  font-size: 13px;
}
.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
  padding: 0 5px 15px;
}
.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date {
  margin-right: 8px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>