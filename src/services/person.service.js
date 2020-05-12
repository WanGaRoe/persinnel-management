import { handleService } from './common'

const prefix = '/api/manage'

const url = {
  getStaffList: prefix + '/staffPage',
  getDepList: prefix + '/departList',
  updateStaff: prefix + '/editStaff',
  staffIn: prefix + '/staffIn',
  staffInnerTransfer: prefix + '/staffInnerTransfer',
  staffOut: prefix + '/staffOut',
  getStaffStatistics: prefix + '/staffStatistics',
  getTransferLog: prefix + '/transferLog'
}

export default {
  // 获取人员列表
  getStaffList (data) {
    return handleService(url.getStaffList, data)
  },
  // 获取单位列表
  getDepList (data) {
    return handleService(url.getDepList, data)
  },
  // 修改人员
  updateStaff (data) {
    return handleService(url.updateStaff, data, 'post')
  },
  // 调入
  staffIn (data) {
    return handleService(url.staffIn, data, 'post')
  },
  // 内部调动
  staffInnerTransfer (data) {
    return handleService(url.staffInnerTransfer, data, 'post')
  },
  // 调出
  staffOut (data) {
    return handleService(url.staffOut, data)
  },
  // 获取统计详情
  getStaffStatistics (data) {
    return handleService(url.getStaffStatistics, data)
  },
  // 获取员工调动记录
  getTransferLog (data) {
    return handleService(url.getTransferLog, data)
  }
}
