<template>
  <div>
    <van-nav-bar
      title="个人信息"
      color="#3296fa"
      left-arrow
      @click-left="toMy"
    />
    <van-cell
      class="touxiang cellele"
      title="头像"
      is-link
      value="内容"
      @click="avatar"
    >
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userInitial.name"
      class="cellele"
      @click="userNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      value="内容"
      class="cellele"
      @click="userSexShow = true"
    />
    <van-cell title="生日" is-link value="内容" class="cellele" />
    <input
      type="file"
      name=""
      id=""
      ref="img"
      hidden
      accept="image/png,image/jpeg"
    />
    <!-- 姓名 -->
    <van-popup
      v-model="userNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        class="Name"
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="userNameShow = false"
        @click-right="confirmName"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
        placeholder="请输入留言"
      />
    </van-popup>
    <!-- 性别 -->
    <van-popup
      v-model="userSexShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        item-height="30px"
        title="标题"
        v-show="userSexShow"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="userSexShow = false"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { UserProfile, getUserInfo } from '@/api'
export default {
  data () {
    return {
      message: '',
      userInitial: {},
      userNameShow: false,
      userSexShow: false,
      columns: ['男', '女']
    }
  },
  methods: {
    toMy () {
      this.$toast.clear()
      this.$router.back()
    },
    avatar () {
      this.$refs.img.click()
    },
    async UserProfile () {
      const res = await UserProfile({})
      console.log(res)
    },
    async getUserInfo () {
      const { data } = await getUserInfo()
      this.userInitial = data.data
      console.log('用户资料', data.data)
    },
    confirmName () {}
  },
  created () {
    this.getUserInfo()
    this.UserProfile()
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-style: normal;
}
:deep(.van-nav-bar__title) {
  color: #fff;
  font-size: 32px;
}
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
}
:deep(.van-icon-arrow-left) {
  color: #fff;
  font-size: 32px;
}
.cellele {
  height: 88px;
  padding: 20px 32px;
}
:deep(.van-field__value) {
  padding: 20px 32px;
}
.touxiang {
  height: 114px;
}
.van-popup {
  :deep(.van-nav-bar__content) {
    background-color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #000;
    font-size: 32px;
  }
}
</style>
