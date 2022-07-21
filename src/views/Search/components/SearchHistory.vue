<template>
  <div>
    <van-cell
      >搜索历史
      <template #right-icon v-if="isShow">
        <van-icon name="delete-o" @click="isShow = false" />
      </template>
      <template #right-icon v-else>
        <div class="delete">
          <span @click="delAll">全部删除</span>
          <span @click="isShow = true">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in SearchHistoryList"
      :key="index"
      @click="Search(item)"
    >
      <template #title>
        <span>{{ item }}</span>
      </template>
      <template #right-icon v-if="!isShow">
        <van-icon name="close" @click.stop="delitem(index)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      SearchHistoryList: [],
      isShow: true
    }
  },
  created () {
    this.SearchHistoryList = this.$store.state.Search
  },
  methods: {
    Search (q) {
      this.$emit('SearchResult', q)
    },
    delAll () {
      this.$store.commit('removeSearchHistory')
      this.SearchHistoryList = this.$store.state.Search
    },
    delitem (index) {
      this.$store.commit('delItem', index)
    }
  }
  // watch: {
  //   keywords: {
  //     immediate: true,
  //     handler () {
  //       this.SearchHistoryList = this.$store.state.Search
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
.delete {
  font-size: 14px;
  color: #969799;
  span {
    padding-right: 10px;
  }
}
</style>
