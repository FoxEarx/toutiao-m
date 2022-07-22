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
// 对文章评论接口
export const setComments = (id, content, hfID) => {
  return requset({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target: id,
      content: content,
      art_id: hfID
    }
  })
}
