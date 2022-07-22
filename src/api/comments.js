import requset from '@/utils/request'
// 获取评论信息
export const getComments = (a, id, lastId) => {
  return requset({
    url: '/v1_0/comments',
    params: {
      type: a,
      source: id,
      offset: lastId
    }
  })
}
