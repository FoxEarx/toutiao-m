import requset from '@/utils/request'

export const getMyChannels = () => {
  return requset({
    url: '/v1_0/user/channels'
  })
}
