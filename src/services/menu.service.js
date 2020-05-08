import { handleService } from './common'

const prefix = '/api/user/auth'

const url = {
  getMenu: prefix + '/menu'
}

export default {
  // 获取用户菜单
  getMenu (data) {
    return handleService(url.getMenu, data, 'get')
  }
}
