<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="0"
      :immediate-check="false"
    >
      <van-cell v-for="(item, index) in SearchResultList" :key="index">
        <template #title>
          <span>{{ item.title }}</span></template
        >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api'

export default {
  data () {
    return {
      SearchResultList: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.SearchResult(this.page, this.keywords)
        this.$store.commit('setSearch', this.keywords)
      }
    }
  },
  methods: {
    async SearchResult (i, q) {
      const { data } = await getSearchResults(i, q)
      this.SearchResultList.push(...data.data.results)
      this.page++
      console.log('数据', data)
      console.log(this.SearchResultList)
    },
    onLoad () {
      this.SearchResult(this.page, this.keywords)
      this.loading = false
    }
  }
}
</script>

<style></style>
