import { handleService } from './common'

const prefix = '/api/user'

const url = {
  login: prefix + '/login',
  phoneCode: prefix + '/telephoneCode',
  capcha: '/api/captcha',
  findPassword: prefix + '/forget',
  logout: prefix + '/logout'
}

export default {
  // 登录
  login (data) {
    return handleService(url.login, data, 'gpost')
  },
  // 获取验证码（废弃）
  getCapcha (data = {}) {
    return handleService(url.capcha, data)
  },
  // 获取手机验证码
  phoneCode (data) {
    return handleService(url.phoneCode, data)
  },
  // 找回密码
  findPassword (data) {
    return handleService(url.findPassword, data, 'post')
  },
  // 退出登录
  logout (data = {}) {
    return handleService(url.logout, data)
  }
}
