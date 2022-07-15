<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar class="navbar" title="登录页面" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- form提交表单 -->
    <van-form ref="form" class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <!-- // 验证码 -->
        <template #right-icon>
          <!-- // 验证码倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="60 * 1000"
            @finish="isShowCountDown = fales"
          />
          <van-button
            v-else
            round
            class="code-btn"
            size="mini"
            @click="sendCode"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
console.log()
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    // 登录
    async login () {
      try {
        // loading提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        // 表单提交获取登录信息
        const res = await login(this.mobile, this.code)
        // 获取用户token
        this.$store.commit('setUser', res.data.data)
        // 登陆成功提示
        this.$toast.success('登录成功')
        console.log(res)
      } catch (err) {
        console.log(err)
        const status = err.response.status
        let message = '登陆失败，请刷新~'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 返回上一层
    onClickLeft () {
      // console.log(this)
      this.$router.back()
    },
    // 获取验证码
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        // 请求后端验证码
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (err) {
        // console.dir(err)
        if (!err.response) {
          this.$toast.fail(err.message)
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
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
