<template>
  <div>
    <router-view></router-view>
    <van-tabbar route v-model="active">
      <van-tabbar-item to="/home">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="profile">
        <template #icon>
          <span class="iconfont icon-wode"></span>
          <span class="text">{{
            $store.state.user.token ? '我的' : '未登录'
          }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .text {
    font-size: 0.32rem;
  }
  .iconfont {
    font-size: 0.5333rem;
  }
}
</style>
