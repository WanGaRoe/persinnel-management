<template>
  <div class="account">
    <Breadcrumb :routes="routes"></Breadcrumb>
    <div class="info-table">
      <div>
        <el-input placeholder="请输入姓名" v-model="name" clearable></el-input>
        <el-select v-model="roleId" style="margin-left:20px" placeholder="请选择角色" clearable >
          <el-option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
        <el-button style="margin-left:20px" @click="search">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="roleName" label="角色"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page="pageIndex"
          @current-change="currentChange"
          layout="prev, pager, next"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div class="dialog-content">
        <el-form :model="formData" ref="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="formCol">
              <el-form-item
                label="账号"
                prop="loginName"
              >
                <el-input v-model="formData.loginName" placeholder="请输入帐号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="姓名"
                prop="name"
              >
                <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="角色"
                prop="roleId"
              >
                <el-select
                  v-model="formData.roleId"
                  placeholder="请选择角色"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in roleList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="性别"
                prop="sex"
              >
                <el-select
                  v-model="formData.sex"
                  placeholder="请选择性别"
                  style="width: 100%;"
                >
                  <el-option label="女" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="手机号"
                prop="telephone"
              >
                <el-input v-model="formData.telephone" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="密码"
                prop="password"
              >
                <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="确认密码"
                prop="rePassword"
              >
                <el-input v-model="formData.rePassword" type="password" placeholder="请重新输入密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
    <DeleteDialog title="提示" :deleteVisible="deleteVisible" @deleteOk="deleteOk" @cancel="deleteVisible=false"/>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import DeleteDialog from '@/components/DeleteDialog'
import accountService from '@/services/account.service'
import roleService from '@/services/role.service'
export default {
  name: 'Account',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.rePassword !== this.formData.password) {
          callback(new Error('两次密码输入不一致'))
        }
        callback()
      }
    }
    return {
      id: '',
      dialogVisible: false,
      deleteVisible: false,
      tableLoading: false,
      dialogTitle: '新增帐号',
      formCol: 12,
      roleList: [],
      roleId: '',
      formData: {
        loginName: '',
        name: '',
        roleId: '',
        sex: 0,
        telephone: '',
        password: '',
        rePassword: ''
      },
      dialogType: 'add',
      routes: [
        { name: '帐号管理' }
      ],
      name: '', // 搜索的姓名
      pageIndex: 1, // 分页-当前页是第几页
      tableData: [],
      // 验证规则
      rules: {
        loginName: [
          { required: true, message: '请输入帐号', trigger: ['change', 'blur'] }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: ['change', 'blur'] }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: ['change', 'blur'] }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] }
        ],
        rePassword: [
          { required: true, validator: validatePass }
        ]
      }
    }
  },
  mounted () {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList () {
      let res = await roleService.getRoleList()
      if (res.status === 0) {
        this.roleList = res.data
      }
    },
    // 获取用户列表
    async getUserList () {
      this.tableLoading = true
      let res = await accountService.getUserList({
        pageNum: this.pageIndex,
        pageSize: 10,
        userName: this.name,
        roleId: this.roleId
      })
      this.tableLoading = false
      if (res.status === 0) {
        this.tableData = res.data.records
      }
    },

    search () {
      // console.log(this.name, this.unit)
      this.getUserList()
    },
    // 点击新增
    handleAdd () {
      this.id = ''
      this.dialogVisible = true
      this.dialogTitle = '新增账号'
    },
    onSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res
          if (!this.id) {
            res = await accountService.addUser({
              loginName: this.formData.loginName,
              name: this.formData.name,
              password: this.formData.password,
              roleId: this.formData.roleId,
              sex: this.formData.sex,
              telephone: this.formData.telephone
            })
          } else {
            res = await accountService.updateUser({
              id: this.id,
              loginName: this.formData.loginName,
              name: this.formData.name,
              password: this.formData.password,
              roleId: this.formData.roleId,
              sex: this.formData.sex,
              telephone: this.formData.telephone
            })
          }
          if (res.status === 0) {
            this.$refs.form.resetFields()
            this.dialogVisible = false
            this.getUserList()
          }
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleEdit (row) {
      this.dialogTitle = '编辑帐号'
      this.id = row.id
      this.dialogVisible = true
      this.formData.loginName = row.loginName
      this.formData.name = row.name
      this.formData.roleId = +row.roleId
      this.formData.sex = row.sex
      this.formData.telephone = row.telephone
    },
    handleDelete (row) {
      this.id = row.id
      this.deleteVisible = true
    },
    async deleteOk () {
      let res = await accountService.deleteUser({
        id: this.id
      })
      if (res.status === 0) {
        this.$message.success('删除成功')
        this.deleteVisible = false
        this.getUserList()
      }
    },
    currentChange (pageIndex) {
      this.pageIndex = pageIndex
    }
  },
  components: {
    Breadcrumb,
    DeleteDialog
  }
}
</script>

<style lang="less" scoped>
.account {
  .info-table {
    padding: 20px 0;
    .el-input {
      width: 300px;
    }
    .table {
      margin-top: 20px;
      box-sizing: border-box;
      th {
        font-family: 'Microsoft YaHei';
        font-weight: bold !important;
      }
    }
    .pagination {
      text-align: right;
      margin-top: 20px;
      font-size: 18px;
    }
  }
}
</style>
