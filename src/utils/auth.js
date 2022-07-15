import storage from '@/utils/storage'
const TOKEN = 'heima_tt'

export const getToken = () => storage.get(TOKEN)

export const setToken = (token) => storage.set(TOKEN, token)

export const removeToken = () => storage.remove(TOKEN)
