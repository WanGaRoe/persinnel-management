import { handleService } from './common'

const prefix = '/api/user'

const url = {
  addUser: prefix + '/manage/addUser',
  getUserList: prefix + '/auth/page'
}

export default {
  // 添加用户
  addUser (data) {
    return handleService(url.addUser, data, 'post')
  },
  getUserList (data) {
    return handleService(url.getUserList, data)
  }
}
