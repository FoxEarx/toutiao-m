import request from '@/utils/request'
/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 请求验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 用户关注列表
export const getUserFocus = () => {
  return request({
    url: '/v1_0/user/followings'
  })
}
// 编辑用户信息

export const UserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
export const UserProfileInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 提交图片
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
