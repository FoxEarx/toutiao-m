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
      @click="$refs.img.click()"
    >
      <template #default>
        <van-image width="30" height="30" round :src="userInitial.photo" />
      </template>
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
      :value="userInitial.gender === 1 ? '女' : '男'"
      class="cellele"
      @click="userSexShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="userInitial.birthday"
      class="cellele"
      @click="userBirthdayShow = true"
    />
    <input
      type="file"
      name=""
      id=""
      ref="img"
      hidden
      accept="image/png,image/jpeg"
      @change="Upload"
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
        @confirm="UserSexFn"
        @cancel="userSexShow = false"
      />
    </van-popup>
    <!-- 生日 -->
    <van-popup
      v-model="userBirthdayShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="userBirthdayShowFn"
        @cancel="userBirthdayShow = false"
      />
    </van-popup>
    <!-- 头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <Img
        :img="img"
        @close="isUpdatePhotoShow = false"
        @updateUserPhoto="photo"
      />
    </van-popup>
  </div>
</template>

<script>
import { UserProfile, UserProfileInfo } from '@/api'
import dayjs from '@/utils/dayjs'
import Img from '@/views/Userinfo/components/img'
export default {
  data () {
    return {
      message: '',
      userInitial: {},
      userNameShow: false,
      userSexShow: false,
      columns: ['男', '女'],
      userBirthdayShow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      img: '',
      isUpdatePhotoShow: false
    }
  },
  methods: {
    photo (img) {
      this.userInitial.photo = img
    },
    Upload (e) {
      // 拿到图片file
      const file = e.target.files[0]
      // 转换成地址
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.img.value = ''
    },
    toMy () {
      this.$toast.clear()
      this.$router.back()
    },
    async UserProfile () {
      try {
        const res = await UserProfile({
          name: this.message,
          gender: this.userInitial.gender,
          birthday: this.userInitial.birthday
        })
        console.log(res)
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
    },
    async UserProfileInfo () {
      try {
        const { data } = await UserProfileInfo()
        this.userInitial = data.data
        console.log('用户资料', data.data)
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
    },
    confirmName () {
      this.UserProfile()
      this.userInitial.name = this.message
      // this.UserProfileInfo()
      this.userNameShow = false
    },
    UserSexFn (ele) {
      if (ele === '男') {
        this.userInitial.gender = 0
      } else if (ele === '女') {
        this.userInitial.gender = 1
      }
      this.userSexShow = false
      this.UserProfile()
    },
    userBirthdayShowFn (value) {
      this.userBirthdayShow = false
      this.userInitial.birthday = dayjs(value).format('YYYY-MM-DD')
      this.UserProfile()
      console.log(this.userInitial.birthday)
    }
  },
  created () {
    this.UserProfileInfo()
    this.UserProfile()
  },
  components: {
    Img
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
