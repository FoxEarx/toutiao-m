<template>
  <div>
    <Nav :nav="'黑马头条'"></Nav>
    <h1 class="theme">{{ info.title }}</h1>
    <div class="author">
      <van-image width="34" height="34" round :src="info.aut_photo" />
      <div class="name">
        <p>{{ info.aut_name }}</p>
        <span>{{ articleDesc }}</span>
      </div>
      <van-button
        :loading="jiazai"
        type="info"
        round
        @click="Focus"
        :class="{ add: info.is_followed }"
        >{{ info.is_followed ? '已关注' : '+关注' }}</van-button
      >
    </div>
    <div class="article-content markdown-body" v-html="info.content"></div>
    <!-- 底部 -->
    <van-goods-action>
      <div class="pinglun" @click="show = !show">写评论</div>
      <div class="xtb">
        <van-goods-action-icon>
          <template #icon>
            <van-badge :content="0">
              <van-icon name="comment-o" />
            </van-badge>
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon @click="collection">
          <template #icon>
            <van-icon name="star-o" />
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon>
          <template #icon>
            <van-icon name="good-job-o" />
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon>
          <template #icon>
            <van-icon name="share" />
          </template>
        </van-goods-action-icon>
      </div>
    </van-goods-action>
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
      <van-button type="default">发布</van-button>
    </van-popup>
  </div>
</template>

<script>
import { getDetails, cancelFocus, Focus, collection } from '@/api'
import Nav from '@/components/navber'
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      jiazai: false,
      show: false,
      info: {},
      message: '',
      isFocus: ''
    }
  },
  computed: {
    articleDesc () {
      const time = dayjs(this.info.pubdate).fromNow()
      return time
    }
  },
  methods: {
    // 文章详情请求
    async getDetails (id) {
      const { data } = await getDetails(id)
      this.info = data.data
      console.log(data)
    },
    // 关注请求
    async Focus () {
      try {
        if (this.info.is_followed) {
          this.jiazai = true
          const data = await cancelFocus(this.info.aut_id)
          console.log('取关', this.isFocus)
          this.isFocus = data.data
          this.getDetails(this.$route.query.id)
          this.jiazai = false //
        } else {
          this.jiazai = true
          const data = await Focus(this.info.aut_id)
          this.isFocus = data.data
          console.log('关注', this.isFocus)
          this.getDetails(this.$route.query.id)
          this.jiazai = false //
        }
      } catch (error) {
        console.log(error)
      }
    },
    async collection () {
      if (this.info.is_followed) {
        this.jiazai = true
        const data = await collection(this.info.art_id)
        console.log('取关', this.isFocus)
        this.isFocus = data.data
        this.getDetails(this.$route.query.id)
        this.jiazai = false //
      } else {
        this.jiazai = true
        const data = await Focus(this.info.art_id)
        this.isFocus = data.data
        console.log('关注', this.isFocus)
        this.getDetails(this.$route.query.id)
        this.jiazai = false //
      }
    }
  },
  created () {
    this.getDetails(this.$route.query.id)
  },
  components: {
    Nav
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
.theme {
  width: 100%;
  font-size: 40px;
  padding: 50px 32px;
  text-align: center;
  color: #3a3a3a;
}
.author {
  display: flex;
  width: 100%;
  height: 84px;
  padding: 0 32px;
  align-items: center;
  // justify-items: center
  .name {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    width: 300px;
    flex: 1;
    p {
      font-size: 24px;
      color: #3a3a3a;
    }
    span {
      color: #b7b7b7;
      font-size: 24px;
      padding-top: 8px;
    }
  }
  .van-button {
    width: 170px;
    height: 60px;
  }
}
.van-goods-action {
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid #d8d8d8;
  .pinglun {
    // flex: 1;
    width: 300px;
    height: 46px;
    border: 1px solid #d8d8d8;
    border-radius: 23px;
    font-size: 30px;
    text-align: center;
    color: #a7a7a7;
  }
  .xtb {
    display: flex;
  }
}
.liuyanBox {
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
.article-content {
  font-size: 20px;
  margin: 35px;
}
.add {
  background-color: #fff;
  color: #000;
  border: 1px solid #ebedf0;
}
</style>
