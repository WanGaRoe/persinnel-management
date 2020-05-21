/*
 * @Author: your name
 * @Date: 2020-05-12 21:10:49
 * @LastEditTime: 2020-05-22 03:00:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \persinnel-management\src\services\login.service.js
 */
import { handleService } from './common'

const prefix = '/api/user'

const url = {
  login: prefix + '/login',
  phoneCode: prefix + '/telephoneCode',
  capcha: '/api/captcha',
  findPassword: prefix + '/forget',
  logout: prefix + '/logout',
  getInfomation: prefix + '/auth/getInformation'
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
  },
  // 获取登录信息
  getInformation (data = {}) {
    return handleService(url.getInfomation, data)
  }
}
