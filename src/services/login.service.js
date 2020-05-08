import { handleService } from './common'

const prefix = '/api/user'

const url = {
  login: prefix + '/login',
  phoneCode: prefix + '/telephoneCode',
  capcha: '/api/captcha'
}

export default {
  login (data) {
    return handleService(url.login, data, 'gpost')
  },
  getCapcha (data = {}) {
    return handleService(url.capcha, data)
  },
  phoneCode (data) {
    return handleService(url.phoneCode, data)
  }
}
