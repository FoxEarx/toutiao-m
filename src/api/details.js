import requset from '@/utils/request'

export const getDetails = (id) => {
  return requset({
    url: `/v1_0/articles/${id}`,
    params: {
      article_id: id
    }
  })
}
// 关注博主
export const Focus = (id) => {
  return requset({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: id
    }
  })
}
// 取消关注博主
export const cancelFocus = (id) => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`,
    data: {
      target: id
    }
  })
}
// 收藏文章请求
export const collection = (id) => {
  return requset({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: id
    }
  })
}
// 取消收藏文章
export const cancelcollection = (id) => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`,
    data: {
      target: id
    }
  })
}
// 文章点赞
export const like = (id) => {
  return requset({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
// 取消点赞
export const unlike = (id) => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`,
    data: {
      target: id
    }
  })
}
