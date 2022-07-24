<template>
  <div>
    <van-nav-bar
      :title="
        replyInfo.total_count === 0
          ? '暂无回复'
          : `${replyInfo.total_count}条回复`
      "
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 楼主 -->
    <div class="box">
      <div class="img">
        <van-image round :src="master.aut_photo" />
      </div>
      <div class="comments">
        <div class="header">
          <div class="author">{{ master.aut_name }}</div>
          <div
            :style="master.is_liking ? 'color: red' : 'color:#222'"
            @click="likeH(master)"
          >
            <van-icon name="good-job-o" />赞
          </div>
        </div>
        <p>{{ master.content }}</p>
        <div class="floor">
          <span>{{ articleDesc(master.pubdate) }}</span>
          <van-button plain hairline type="info" round
            >回复{{ master.reply_count }}</van-button
          >
        </div>
      </div>
    </div>
    <!-- ---------------------------------------- -->
    <van-cell-group class="Allcomments">
      <van-cell title="全部回复" />
    </van-cell-group>
    <!-- 全部评论 -->
    <div class="box" v-for="(item, index) in replyInfo.results" :key="index">
      <div class="img">
        <van-image round :src="item.aut_photo" />
      </div>
      <div class="comments">
        <div class="header">
          <div class="author">{{ item.aut_name }}</div>
          <div
            @click="like(item)"
            :style="item.is_liking ? 'color: red' : 'color:#222'"
          >
            <van-icon name="good-job-o" />赞
          </div>
        </div>
        <p>{{ item.content }}</p>
        <div class="floor">
          <span>{{ articleDesc(item.pubdate) }}</span>
          <van-button plain hairline type="info" round
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
    </div>
    <!-- 发表评论 -->
    <van-nav-bar class="tabbar">
      <template #title>
        <van-button round @click="pinglun">评论</van-button>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'

export default {
  data () {
    return {
      error: false,
      finished: false,
      loading: false
    }
  },
  props: {
    replyInfo: {
      type: [Object, String, Array]
    },
    master: {
      type: [Object, String, Array]
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('close')
    },
    articleDesc (tm) {
      const time = dayjs(tm).fromNow()
      return time
    },
    pinglun () {
      this.$emit('reflyPL', this.master.com_id)
    },
    onLoad () {
      console.log(1)
    },
    like (item) {
      this.$store.state.master = item
      item.is_liking = !item.is_liking
      this.$emit('commentlike', item.is_liking)
    },
    likeH (master) {
      master.is_liking = !master.is_liking
      this.$emit('likeh', master.is_liking)
    }
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-style: normal;
}
.liuyanBox {
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  .liuyan {
    display: flex;
    width: 600px;
    height: 176px;
    padding: 20px 32px;
    background-color: #f5f7f9;
    .van-field {
      background-color: #f5f7f9;
    }
  }
  .van-button {
    color: #b5d1ec;
    width: 80px;
    height: 50px;
    border: transparent;
  }
}
.tabbar {
  width: 100%;
  background-color: #ff69b4;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #fff;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #000;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #ff69b4;
  }
}
.box {
  display: flex;
  width: 750;
  height: 236px;
  margin: 30px 32px;
  border-bottom: 1px solid #f5f6f7;
  .img {
    .van-image {
      width: 72px;
      height: 72px;
      margin-right: 40px;
    }
  }
  .comments {
    flex: 1;
    // width: 100%;
    .header {
      display: flex;
      font-size: 26px;
      justify-content: space-between;
      .van-icon {
        margin-right: 10px;
      }
      .author {
        color: #406599;
      }
    }
    p {
      margin: 32px 0;
      font-size: 32px;
      color: #222;
    }
    .floor {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #222;
      span {
        padding-right: 20px;
      }
      .van-button {
        height: 48px;
        width: 135px;
        font-size: 24px;
        color: #000;
        border-color: #ebedf0;
        text-align: center;
        padding-left: 20px;
      }
    }
  }
}
.Allcomments {
  height: 88px;
  width: 100%;
  padding: 20px 32px;
}
</style>
