<template>
  <div class="role">
    <Breadcrumb :routes="routes"></Breadcrumb>
    <div class="info-table">
      <div>
        <el-input placeholder="请输入姓名" v-model="name" clearable></el-input>
        <el-button style="margin-left:20px" @click="search">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="name" label="角色名称"></el-table-column>
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

    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
       <div class="dialog-content">
        <el-form :model="formData" ref="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="formCol">
              <el-form-item
                label="角色名"
                prop="roleName"
              >
                <el-input v-model="formData.roleName" placeholder="请输入帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="margin-left:30px;height:200px">
            <el-tree
              ref="menuTree"
              default-expand-all
              :data="menuTree"
              show-checkbox
              node-key="id"
              :props="defaultProps">
            </el-tree>
          </div>
        </el-form>
       </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import roleService from '@/services/role.service'
import menuService from '@/services/menu.service'
export default {
  name: 'Role',
  data () {
    return {
      dialogVisible: false, // 控制弹框显示隐藏
      dialogTitle: '', // 弹框标题
      dialogType: 'add',
      formCol: 22,
      tableLoading: false,
      routes: [
        { name: '角色管理' }
      ],
      // 表单数据
      formData: {
        roleName: ''
      },
      name: '', // 搜索的姓名
      pageIndex: 1, // 分页-当前页是第几页
      tableData: [],
      menuTree: [],
      // 树参数配置
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      // 表单规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名字', trgger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 获取菜单
    async getMenu () {
      let res = await menuService.getMenu()
      if (res.status === 0) {
        this.menuTree = res.data
      }
    },
    // 获取角色列表
    async getRoleList () {
      this.tableLoading = true
      let res = await roleService.getRoleList({
        name: this.name
      })
      this.tableLoading = false
      if (res.status === 0) {
        this.tableData = res.data
      }
    },
    // 获取选中树的节点d
    getCheckedKeys (nodes) {
      console.log(nodes)
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 搜索
    search () {
      this.getRoleList()
    },

    // 点击新增
    handleAdd () {
      this.getMenu()
      this.dialogTitle = '新增角色'
      this.dialogVisible = true
    },
    // 点击编辑
    async handleEdit (row) {
      this.dialogTitle = '编辑'
      this.dialogVisible = true
      this.formData.roleName = row.name
      // 获取角色菜单
      let res = await roleService.getRoleMenu({
        roleId: row.id
      })
      if (res.status === 0) {
        console.log(res)
      }
      console.log(row)
    },
    //  保存
    onSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let halfCheckedKeys = this.$refs.menuTree.getCheckedKeys()
          let checkedKeys = [...this.$refs.menuTree.getHalfCheckedKeys(), ...halfCheckedKeys]
          console.log(checkedKeys)
          let res = await roleService.addRole({
            roleName: this.formData.roleName,
            menuIds: checkedKeys
          })
          if (res.status === 0) {
            this.dialogVisible = false
            this.getRoleList()
          }
        }
      })
    },

    // 点击删除
    handleDelete (row) {
      console.log(row)
    },
    currentChange (pageIndex) {
      this.pageIndex = pageIndex
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
.role {
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
