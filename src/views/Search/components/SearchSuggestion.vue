<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightDate"
      :key="index"
      @click="SearchResult(item)"
    >
      <template #title> <span v-html="item"></span> </template>
      <template #icon>
        <van-icon name="search" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api'
export default {
  data () {
    return {
      searchItem: [],
      timer: ''
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    getSearchSuggestions () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        try {
          const { data } = await getSearchSuggestions(this.keywords)
          console.log(data)
          this.searchItem = data.data.options.filter(Boolean)
          if (this.searchItem.length === 0) {
            this.$toast.fail('没有数据了')
          }
        } catch (error) {
          this.$toast.fail('获取失败请重试')
        }
      }, 600)
    },
    async SearchResult (q) {
      const str = q.replace(/<[^>]*>/g, '')
      this.$emit('SearchResult', str)
      console.log(str)
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestions()
      }
    }
  },
  computed: {
    highlightDate () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.searchItem.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.van-icon-search {
  padding-top: 10px;
}
</style>
