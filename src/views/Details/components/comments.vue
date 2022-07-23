<template>
  <div>
    <div class="box" v-show="master.aut_id">
      <div class="img">
        <van-image round :src="master.aut_photo" />
      </div>
      <div class="comments">
        <div class="header">
          <div class="author">{{ master.aut_name }}</div>
          <div><van-icon name="good-job-o" />赞</div>
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
    <div
      v-show="commentsList"
      class="box"
      v-for="(item, index) in commentsList"
      :key="index"
    >
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
            @click="reply(item.com_id, item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
    </div>
    <van-cell-group class="Allcomments" v-show="commentsList ? false : true">
      <van-cell title="全部回复" />
    </van-cell-group>
    <div
      v-show="comments.length !== 0"
      class="box"
      v-for="item in comments"
      :key="item.com_id"
    >
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
            ref="cl"
            plain
            hairline
            type="info"
            round
            @click="reply(item.com_id, item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
    </div>
    <van-nav-bar class="tabbar" v-show="commentsList ? false : true">
      <template #title>
        <van-button round @click="pinglun">评论</van-button>
      </template>
    </van-nav-bar>
    <van-popup
      class="liuyanBox"
      round
      v-model="show"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <div class="liuyan">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入评论"
          show-word-limit
        />
      </div>
      <van-button type="default" @click="setComments">发布</van-button>
    </van-popup>
  </div>
</template>

<script>
// 评论请求
import dayjs from '@/utils/dayjs'
import { getComments, setComments } from '@/api'

export default {
  data () {
    return {
      master: this.$store.state.Master,
      comments: this.$store.state.comments,
      show: false,
      message: '',
      item: [],
      id: ''
    }
  },
  props: {
    commentsList: {
      type: Array
      // required: true
    }
  },
  methods: {
    articleDesc (tm) {
      const time = dayjs(tm).fromNow()
      return time
    },
    async reply (id, item) {
      this.id = id
      this.item = item
      try {
        const { data } = await getComments('c', this.id)
        // this.comments = data.data.results
        console.log(data)
        this.$emit('isShow', data.data.total_count)
        this.$store.state.Master = this.item
        this.$store.state.comments = data.data.results
        this.$store.state.commentID = this.id
      } catch (error) {
        console.log(error)
      }
    },
    async setComments () {
      try {
        await setComments(
          this.$store.state.commentID,
          this.message,
          this.$store.state.wenzhangID
        )
      } catch (error) {
        this.$toast.fail(error.response.data.message)
      }
    },
    pinglun () {
      this.show = true
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
