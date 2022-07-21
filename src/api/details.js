import requset from '@/utils/request'

export const getDetails = (id) => {
  return requset({
    url: `/v1_0/articles/${id}`,
    params: {
      article_id: id
    }
  })
}

export const Focus = (id) => {
  return requset({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: id
    }
  })
}

export const cancelFocus = (id) => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`,
    data: {
      target: id
    }
  })
}
