import { handleService } from './common'

const prefix = '/api/user/manage'

const url = {
  getRoleList: prefix + '/roleList',
  addRole: prefix + '/addRole'
}

export default {
  // 获取角色列表
  getRoleList (data) {
    return handleService(url.getRoleList, data, 'post')
  },
  // 添加角色
  addRole (data) {
    return handleService(url.addRole, data, 'post')
  }
}
