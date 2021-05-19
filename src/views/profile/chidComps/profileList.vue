<template>
   <div class="profile-list">
    <div class="profile-list-item">
      <img src="~assets/img/profile/manager.svg" class="profile-list-icon" alt="">
      <!-- <van-icon class="profile-list-icon" name="manager" /> -->
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
       <img src="~assets/img/profile/point-gift.svg" class="profile-list-icon" alt="">
      <!-- <van-icon class="profile-list-icon" name="point-gift" /> -->
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
       <img src="~assets/img/profile/gem.svg" class="profile-list-icon" alt="">
      <!-- <van-icon class="profile-list-icon" name="gem" /> -->
      <span style="border-bottom: 0;">会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item">
       <img src="~assets/img/profile/shopping-cart.svg" class="profile-list-icon" alt="">
      <!-- <van-icon class="profile-list-icon" name="shopping-cart" /> -->
      <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
       <img src="~assets/img/profile/good-job.svg" class="profile-list-icon" alt="">
      <!-- <van-icon class="profile-list-icon" name="good-job" /> -->
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileList"
};
</script>

<style scoped>
.profile-list {
  width: 100%;
}
.profile-list-item {
  line-height: 45px;
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 20px;
}
.profile-list-item .profile-list-icon {
  font-size: 24px;
  display: inline-block;
  margin-right: 7px;
}
.profile-list-item span {
  font-size: 16px;
  display: inline-block;
  width: 100%;
  color: #333333;
  border-bottom: 1px solid #dddddd;
}
.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
</style>