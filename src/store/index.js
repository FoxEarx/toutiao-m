import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  setToken,
  getSearchHistory,
  setSearchHistory,
  removeSearchHistory
} from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的token
    user: getToken() || {},
    Search: getSearchHistory() || [],
    Master: [],
    comments: [],
    commentID: '',
    wenzhangID: ''
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(payload)
    },
    setSearch (state, payload) {
      state.Search.unshift(payload)
      function fn (arr) {
        return arr.filter((item, index, arr) => arr.indexOf(item) === index)
      }
      state.Search = fn(state.Search)
      setSearchHistory(state.Search)
    },
    removeSearchHistory (state) {
      removeSearchHistory()
      state.Search = []
    },
    delItem (state, payload) {
      state.Search.splice(payload, 1)
      setSearchHistory(state.Search)
    }
  }
})
