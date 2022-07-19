import requset from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannels = () => {
  return requset({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannels = () => {
  return requset({
    url: '/v1_0/channels'
  })
}
export const delChannels = (target) => {
  return requset({
    url: `v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
export const addChannels = (id, seq) => {
  return requset({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const CHANNEL = 'HEIMA_CHANNEL'
export const getChannel = () => storage.get(CHANNEL)

export const setChannel = (token) => storage.set(CHANNEL, token)
