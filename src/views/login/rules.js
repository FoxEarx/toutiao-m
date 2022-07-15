export const codeRules = [
  { required: true, message: '请填写验证码', trigger: 'onChange' },
  { pattern: /[0-9]{6}/, message: '请填写正确的验证码' }
]
export const mobileRules = [
  { required: true, message: '请输入手机号', trigger: 'onChange' },
  {
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    message: '请输入正确格式的手机号'
  }
]
