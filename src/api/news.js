import requset from '@/utils/request'

export const getArticleList = (channelId, timestamp) => {
  return requset({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
