<template>
  <div>
    <div class="box" v-for="(item, index) in commentsList" :key="index">
      <div class="img">
        <van-image round :src="item.aut_photo" />
      </div>
      <div class="comments">
        <div class="header">
          <div class="author">{{ item.aut_name }}</div>
          <div><van-icon name="good-job-o" />赞</div>
        </div>
        <p>{{ item.content }}</p>
        <div class="floor">
          <span>{{ articleDesc(item.pubdate) }}</span>
          <van-button
            plain
            hairline
            type="info"
            round
            @click="reply(item.com_id)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
    </div>
    <!-- 评论的评论 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
    </van-popup>
  </div>
</template>

<script>
// 评论请求
import dayjs from '@/utils/dayjs'
import { getComments } from '@/api'
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    commentsList: {
      type: Array,
      required: true
    }
  },
  methods: {
    articleDesc (tm) {
      const time = dayjs(tm).fromNow()
      return time
    },
    async reply (id) {
      this.show = true
      const res = await getComments('c', id)
      console.log(res)
    },
    onClickLeft () {
      this.show = false
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
</style>
