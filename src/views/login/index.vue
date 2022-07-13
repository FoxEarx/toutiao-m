<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar class="navbar" title="登录页面" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- form提交表单 -->
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        :name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号', trigger: 'onChange' }
        ]"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        :name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码', trigger: 'onChange' }
        ]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round class="code-btn" size="mini">获取验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 登录
    async login () {
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 返回上一层
    onClickLeft () {
      console.log(this)
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
// :deep()用来穿透scoped
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 15;
  }
  .iconfont {
    font-size: 40px;
  }
  .code-btn {
    background-color: #ededed;
    font-size: 11px;
    color: #666;
  }
}
</style>
