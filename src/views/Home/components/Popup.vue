<template>
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '90%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button size="small" round class="edit-btn">编辑</van-button>
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="item in myChannel"
            :key="item.id"
          >
            <template #icon>
              <van-icon name="cross" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <div class="my-channel">
          <van-cell title="推荐频道">
            <van-button size="small" round class="edit-btn">编辑</van-button>
          </van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              v-for="item in recommendChannel"
              :key="item.id"
              :text="item.name"
              icon="plus"
            >
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  data () {
    return {
      show: false,
      allChannels: []
    }
  },
  props: {
    myChannel: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      console.log('全部推荐', data)
      this.allChannels = data.data.channels
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannels.filter((item) => {
        return !this.myChannel.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      background-color: #eee;
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          font-size: 26px;
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
        }
      }
    }
  }
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
