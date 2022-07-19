<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round><van-icon name="search" />搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="showPopup"></span>
    </van-tabs>
    <Popup
      ref="popup"
      :myChannel="myChannels"
      @delChannel="delChannel"
      @changeActive="changeActive"
      @addChannel="addChannel"
    ></Popup>
  </div>
</template>

<script>
import {
  getMyChannels,
  getChannel,
  setChannel,
  delChannels,
  addChannels
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import Popup from './components/Popup'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  components: {
    ArticleList,
    Popup
  },
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  computed: {},
  methods: {
    islogin () {
      return !!this.$store.state.user.token
    },
    async getMyChannels () {
      try {
        if (!this.islogin()) {
          const myChannels = getChannel()
          this.myChannels = myChannels
        } else {
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取列表频道')
        console.log(error)
      }
    },
    showPopup () {
      this.$refs.popup.show = true
    },
    async delChannel (id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.islogin()) {
        setChannel(this.myChannels)
      } else {
        try {
          await delChannels(id)
          this.$toast.success('删除成功')
        } catch (error) {
          this.$toast.fail('删除失败')
        }
      }
    },
    changeActive (index) {
      this.active = index
    },
    async addChannel (item) {
      this.myChannels.push(item)
      if (!this.islogin()) {
        setChannel(this.myChannels)
      } else {
        try {
          await addChannels(item.id, this.myChannels.length)
          this.$toast.success('添加成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('添加失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 9999;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
