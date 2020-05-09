import { handleService } from './common'

const prefix = '/api/user/manage'

const url = {
  getRoleList: prefix + '/roleList',
  addRole: prefix + '/addRole',
  getRoleMenu: '/api/user/auth/roleMenu',
  updateRole: prefix + '/roleAuthMenu',
  deleteRole: prefix + '/deleteRole'
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
  // 获取角色菜单
  getRoleMenu (data) {
    return handleService(url.getRoleMenu, data)
  },
  // 修改角色
  updateRole (data) {
    return handleService(url.updateRole, data, 'post')
  },
  // 删除角色
  deleteRole (data) {
    return handleService(url.deleteRole, data)
  }
}
