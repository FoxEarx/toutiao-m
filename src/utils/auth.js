import storage from '@/utils/storage'
const TOKEN = 'heima_tt'

const SearchHistory = 'SearchHistory'
export const getToken = () => storage.get(TOKEN)

export const setToken = (token) => storage.set(TOKEN, token)

export const removeToken = () => storage.remove(TOKEN)

export const getSearchHistory = () => storage.get(SearchHistory)

export const setSearchHistory = (code) => storage.set(SearchHistory, code)

export const removeSearchHistory = () => storage.remove(SearchHistory)
