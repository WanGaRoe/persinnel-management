import { handleService } from './common'

const prefix = '/api/user'

const url = {
  addUser: prefix + '/manage/addUser',
  getUserList: prefix + '/auth/page',
  updateUser: prefix + '/auth/editInformation',
  deleteUser: prefix + '/auth/deleteUser',
  changePassword: prefix + '/auth/changePassword'
}

export default {
  // 添加用户
  addUser (data) {
    return handleService(url.addUser, data, 'post')
  },
  // 获取用户列表
  getUserList (data) {
    return handleService(url.getUserList, data)
  },
  // 修改帐号
  updateUser (data) {
    return handleService(url.updateUser, data, 'post')
  },
  // 删除帐号
  deleteUser (data) {
    return handleService(url.deleteUser, data)
  },
  // 修改密码
  changePassword (data) {
    return handleService(url.changePassword, data, 'post')
  }
}
