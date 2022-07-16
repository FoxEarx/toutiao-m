<template>
  <div class="my">
    <header>
      <div v-if="isLogin" class="user-info banner">
        <van-row> </van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="span-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="UserInfo.photo"
              />
              <span class="mobile">{{ UserInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" justify="end" align="center" class="code-row">
              <van-button round class="code-btn" size="mini"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ UserInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ UserInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ UserInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ UserInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="wrap">
          <img src="../../assets/images/mobile.png" alt="" />
          <span @click="gologin">登录/注册</span>
        </div>
      </div>
    </header>
    <main>
      <div>
        <van-grid column="2" class="grid" clickable column-num="2">
          <van-grid-item text="收藏">
            <template #icon>
              <span class="iconfont icon-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="iconfont icon-fenxiang"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-btn" @click="loginup"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      UserInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    loginup () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    gologin () {
      this.$router.push('/login')
    },
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.UserInfo = data
          console.log(data)
        } catch (error) {
          this.$toast.fail('登录失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
    .mobile {
      font-size: 0.4rem;
      color: #fff;
    }
    .code-btn {
      width: 1.53333rem;
      height: 0.42667rem;
      background: #fff;
      border-radius: 0.21333rem;
      font-size: 0.26667rem;
      color: #666;
      padding: 0;
    }

    .code-row {
      height: 100%;
    }
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.icon-fenxiang {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 10px;
      width: 200px;
    }
    span {
      font-size: 45px;
    }
  }
}
</style>
