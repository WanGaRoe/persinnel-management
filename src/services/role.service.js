import { handleService } from './common'

const prefix = '/api/user/manage'

const url = {
  getRoleList: prefix + '/roleList',
  addRole: prefix + '/addRole',
  getRoleMenu: '/user/auth/roleMenu'
}

export default {
  // 获取角色列表
  getRoleList (data) {
    return handleService(url.getRoleList, data)
  },
  // 添加角色
  addRole (data) {
    return handleService(url.addRole, data, 'post')
  },
  getRoleMenu (data) {
    return handleService(url.getRoleMenu, data)
  }
}
