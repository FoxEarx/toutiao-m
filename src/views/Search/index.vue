<template>
  <div>
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backtoPreoage"
        @focus="visibleSearchSuggester"
      />
    </form>
    <components
      @SearchResult="SearchResult"
      :is="componentsName"
      :keywords="keyword"
    ></components>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
import SearchSuggestion from './components/SearchSuggestion'
export default {
  data () {
    return {
      keyword: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    backtoPreoage () {
      this.$router.go(-1)
    },
    onSearch () {
      this.isShowSearchResult = true
    },
    visibleSearchSuggester () {
      this.isShowSearchResult = false
    },
    SearchResult (q) {
      this.keyword = q
      this.isShowSearchResult = true
    }
  },
  computed: {
    componentsName () {
      if (this.keyword.trim() === '') {
        return SearchHistory
      }
      if (this.isShowSearchResult) {
        return SearchResult
      }
      return SearchSuggestion
    }
  }
}
</script>

<style scoped lang="less">
.van-search {
  background-color: #3296fa;
}
</style>
