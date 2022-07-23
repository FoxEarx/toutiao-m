<template>
  <div class="box">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      :offset="100"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
    >
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
      <!-- 正文 -->
      <div
        class="article-content markdown-body"
        v-html="info.content"
        ref="contentRef"
      ></div>
      <van-divider class="zwjs">正文结束</van-divider>
      <!-- 评论 -->
      <Comments @isShow="isShowFn" :commentsList="commentsList"></Comments>
      <van-popup v-model="isShow" position="bottom" :style="{ height: '100%' }">
        <van-nav-bar
          :title="num === 0 ? '暂无回复' : `${num}条回复`"
          left-arrow
          @click-left="onClickLeft"
        />
        <Comments></Comments>
      </van-popup>
      <!-- 图片详情 -->
      <van-image-preview
        v-model="showImg"
        :images="allImg"
        @change="onChange"
        :start-position="start"
      >
        <template v-slot:index>{{ index }}</template>
      </van-image-preview>
      <!-- 底部 -->
      <van-goods-action>
        <div class="pinglun" @click="show = !show">写评论</div>
        <div class="xtb">
          <van-goods-action-icon>
            <template #icon>
              <van-badge :content="commentsNum">
                <van-icon name="comment-o" />
              </van-badge>
            </template>
          </van-goods-action-icon>
          <van-goods-action-icon @click="collection">
            <template #icon>
              <van-icon
                name="star"
                :color="info.is_collected ? '#3296fa' : '#595c5a'"
              />
            </template>
          </van-goods-action-icon>
          <van-goods-action-icon @click="like">
            <template #icon>
              <van-badge :content="info.like_count">
                <van-icon
                  name="good-job-o"
                  :color="info.attitude === 1 ? '#ee0a24' : '#595c5a'"
                />
              </van-badge>
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
        <van-button type="default" @click="setComments">发布</van-button>
      </van-popup>
    </van-list>
  </div>
</template>
<script>
import {
  getDetails,
  cancelFocus,
  Focus,
  collection,
  cancelcollection,
  like,
  unlike,
  getComments,
  setComments
} from '@/api'
import Nav from '@/components/navber'
import dayjs from '@/utils/dayjs'
import { ImagePreview } from 'vant'
import Comments from '@/views/Details/components/comments'

export default {
  data () {
    return {
      jiazai: false,
      show: false,
      info: {},
      message: '',
      showImg: false,
      index: 0,
      allImg: [],
      start: 0,
      loading: false,
      error: false,
      commentsList: [],
      lastID: '',
      endID: '',
      finished: false,
      commentsNum: '',
      isShow: false,
      num: ''
    }
  },
  computed: {
    articleDesc () {
      const time = dayjs(this.info.pubdate).fromNow()
      return time
    }
  },
  updated () {
    this.previewImg()
  },
  methods: {
    previewImg () {
      const contentEl = this.$refs.contentRef
      const allImg = contentEl.querySelectorAll('img')
      const images = []
      allImg.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onChange (index) {
      this.index = index
    },
    // 文章详情请求
    async getDetails () {
      const { data } = await getDetails(this.$route.query.id)
      this.info = data.data
      this.$store.state.wenzhangID = data.data.art_id
      console.log('文章详情', data)
    },
    // 关注请求
    async Focus () {
      try {
        if (this.info.is_followed) {
          this.jiazai = true
          await cancelFocus(this.info.aut_id)
          this.getDetails()
          this.jiazai = false
        } else {
          this.jiazai = true
          await Focus(this.info.aut_id)
          this.getDetails()
          this.jiazai = false
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail(error.response.data.message)
      }
    },
    // 收藏文章
    async collection () {
      try {
        if (this.info.is_collected) {
          const data = await cancelcollection(this.info.art_id)
          console.log(data)
          this.getDetails()
        } else {
          const data = await collection(this.info.art_id)
          console.log(data)
          this.getDetails()
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail(error.response.data.message)
      }
    },
    // 点赞
    async like () {
      try {
        if (this.info.attitude === -1) {
          const data = await like(this.info.art_id)
          console.log(data)
          this.getDetails()
        } else {
          const data = await unlike(this.info.art_id)
          console.log(data)
          this.getDetails()
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail(error.response.data.message)
      }
    },
    // 评论请求
    async getComments () {
      try {
        if (this.commentsList.length > 0) {
          const { data } = await getComments('a', this.info.art_id, this.lastID)
          this.commentsList.push(...data.data.results)
          this.lastID = data.data.last_id
          console.log('打印', this.commentsList)
          this.loading = false
          if (this.lastID === this.endID) {
            this.finished = true
            return
          }
        } else {
          const { data } = await getComments('a', this.info.art_id)
          this.lastID = data.data.last_id
          this.endID = data.data.end_id
          this.commentsNum = data.data.total_count
          console.log('评论数据', data)
          this.commentsList.push(...data.data.results)
          if (this.endID === this.lastID) {
            this.finished = true
            return
          }
          console.log('打印', this.commentsList)
          this.loading = false
        }
      } catch (error) {
        console.log(error)
        this.error = true
      }
    },
    onLoad () {
      this.getComments()
    },
    // 发表评论
    async setComments () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await setComments(this.info.art_id, this.message)
        this.getDetails()
        this.commentsList = []
        this.getComments()
        console.log('发布评论', res)
        this.$toast.success('发布成功')
        this.show = false
      } catch (error) {
        console.log(error)
        this.$toast.fail('')
      }
      this.$toast.clear()
    },
    isShowFn (num) {
      this.isShow = true
      this.num = num
      this.getDetails()
      this.getComments()
    },
    onClickLeft () {
      this.isShow = false
    },
    fb (index) {
      this.show = index
    }
  },
  created () {
    this.getDetails()
  },
  components: {
    Nav,
    Comments
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
  margin-bottom: 100px;
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
.article-content {
  font-size: 20px;
  margin: 35px;
}
.add {
  background-color: #fff;
  color: #000;
  border: 1px solid #ebedf0;
}
.zwjs {
  padding: 32px 0;
}
</style>
