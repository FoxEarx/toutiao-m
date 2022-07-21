import requset from '@/utils/request'
export const getSearchSuggestions = (q) => {
  return requset({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

export const getSearchResults = (i, q) => {
  return requset({
    url: '/v1_0/search',
    params: {
      per_page: 15,
      page: i,
      q
    }
  })
}
