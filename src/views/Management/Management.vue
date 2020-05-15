<template>
  <div class="management">
    <Breadcrumb :routes="routes"></Breadcrumb>
    <div class="info-table">
      <div>
        <el-input placeholder="请输入姓名" v-model="name" clearable></el-input>
        <el-select placeholder="请选择单位" v-model="unit" style="margin-left: 20px" clearable>
          <el-option v-for="(item, index) in departOptions" :key="index" :value="item.id" :label="item.name"></el-option>
        </el-select>
        <el-button style="margin-left:20px" @click="search">查询</el-button>
        <el-button type="primary" @click="handleAdd">调入</el-button>
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              {{scope.row.sex ? '男' : '女'}}
            </template>
          </el-table-column>
          <el-table-column prop="nation" label="民族"></el-table-column>
          <el-table-column prop="departName" label="单位"></el-table-column>
          <!-- <el-table-column prop="role" label="工种"></el-table-column> -->
          <el-table-column prop="birth" label="入职日期"></el-table-column>
          <el-table-column prop="slavery" label="工资"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleTransferLog(scope.row)">调动记录</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">调出</el-button>
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
      :width="dialogWidth"
      @close="handleClose">
      <div class="dialog-content">
        <el-form v-show="dialogType === 'add'" :model="formData" ref="form" :rules="rules" label-width="90px">
          <el-row>
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
                label="性别"
                prop="sex"
              >
              <el-radio-group v-model="formData.sex">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
              </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="formCol">
              <el-form-item
                label="出生日期"
                prop="birth"
              >
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formData.birth"
                type="date"
                placeholder="选择日期"
                style="width:100%"
                >
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="单位"
                prop="departId"
              >
                <el-select
                  v-model="formData.departId"
                  placeholder="请选择单位"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item,index) in departOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="formCol">
              <el-form-item
                label="工种"
                prop="status"
              >
                <el-select
                  v-model="formData.status"
                  placeholder="请选择工种"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item,index) in workTypeOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="formCol">
              <el-form-item
                label="民族"
                prop="nation"
              >
              <el-select
                  v-model="formData.nation"
                  placeholder="请选择民族"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item,index) in nationOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="formCol">
              <el-form-item
                label="工资"
                prop="slavery"
              >
                <el-input v-model="formData.slavery" placeholder="请输入工资"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          v-show="dialogType === 'log'"
          v-loading="dialogTableLoading"
          :data="dialogTableData"
          style="width: 100%">
          <el-table-column prop="beforeDepartName" label="原单位"></el-table-column>
          <el-table-column prop="afterDepartName" label="现单位"></el-table-column>
          <el-table-column prop="beforeSalve" label="原薪资"></el-table-column>
          <el-table-column prop="afterSalve" label="现薪资"></el-table-column>
          <el-table-column prop="time" label="调动时间"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogType !== 'log'" type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
    <DeleteDialog title="提示" content="是否调出" :deleteVisible="deleteVisible" @deleteOk="deleteOk" @cancel="deleteVisible=false"/>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import DeleteDialog from '@/components/DeleteDialog'
import personService from '@/services/person.service'
export default {
  name: 'Management',
  data () {
    return {
      id: '',
      dialogVisible: false,
      deleteVisible: false,
      tableLoading: false,
      dialogType: 'add',
      dialogTitle: '新增帐号',
      dialogWidth: '50%',
      dialogTableLoading: false,
      dialogTableData: [],
      formCol: 12,
      formData: {
        name: '',
        sex: 0,
        departId: '',
        birth: '',
        nation: '',
        slavery: ''
      },
      routes: [
        { name: '人员管理' }
      ],
      name: '',
      unit: '', // 单位
      departOptions: [], // 初始化选项
      workTypeOptions: ['司机', '售票', '保养工', '高度', '核算', '窗口票', '加油', '护厂', '锅炉工', '炊事员', '保育员', '茶炉', '其它人员', '干部'],
      nationOptions: ['汉族', '满族', '回族', '朝鲜族', '其他'],
      tableData: [],
      pageIndex: 1,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        departId: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        birth: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'change' }
        ],
        slavery: [
          { required: true, message: '请输入工资', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.getPersonList()
    this.getDepartment()
  },
  methods: {
    // 获取单位
    async getDepartment () {
      let res = await personService.getDepList()
      if (res.status === 0) {
        this.departOptions = res.data
        console.log(this.departOptions)
      }
    },

    search () {
      this.getPersonList()
    },
    // 编辑
    handleEdit (row) {
      this.dialogTitle = '编辑人员'
      this.dialogWidth = '50%'
      this.dialogType = 'add'
      this.id = row.id
      this.dialogVisible = true
      this.formData.name = row.name
      this.formData.sex = row.sex
      this.formData.departId = row.departId
      this.formData.nation = row.nation
      this.formData.birth = row.birth
      this.formData.slavery = row.slavery
    },
    // 调入
    handleAdd () {
      this.id = ''
      this.dialogWidth = '50%'
      this.dialogType = 'add'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    onSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res
          if (!this.id) {
            res = await personService.staffIn({
              name: this.formData.name,
              sex: this.formData.sex,
              departId: this.formData.departId,
              nation: this.formData.nation,
              slavery: this.formData.slavery,
              birth: this.formData.birth
            })
          } else {
            res = await personService.updateStaff({
              id: this.id,
              name: this.formData.name,
              sex: this.formData.sex,
              departId: this.formData.departId,
              nation: this.formData.nation,
              slavery: this.formData.slavery,
              birth: this.formData.birth
            })
          }
          if (res.status === 0) {
            // this.$refs.form.resetFields()
            this.dialogVisible = false
            this.getPersonList()
          }
        }
      })
    },
    handleClose () {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 调出
    async handleDelete (row) {
      this.id = row.id
      this.deleteVisible = true
    },
    async deleteOk () {
      let res = await personService.staffOut({
        id: this.id
      })
      if (res.status === 0) {
        this.$message.success('调出成功')
        this.deleteVisible = false
        this.getPersonList()
      }
    },
    // 调动日志
    handleTransferLog (row) {
      this.id = row.id
      this.dialogType = 'log'
      this.dialogWidth = '60%'
      this.dialogVisible = true
      this.getTransferLog()
    },
    // 获取调动日志
    async getTransferLog () {
      this.dialogTableLoading = true
      let res = await personService.getTransferLog({
        id: this.id
      })
      this.dialogTableLoading = false
      if (res.status === 0) {
        this.dialogTableData = res.data
      }
    },
    // 页面改变
    currentChange (index) {
      this.pageIndex = index
      this.getPersonList()
    },

    async getPersonList () {
      this.tableLoading = true
      let res = await personService.getStaffList({
        name: this.name,
        departId: this.unit,
        pageNum: this.pageIndex,
        pageSize: 10
      })
      this.tableLoading = false
      if (res.status === 0) {
        this.tableData = res.data.records
        console.log(res)
      }
    }
  },
  components: {
    Breadcrumb,
    DeleteDialog
  }
}
</script>

<style lang="less" scoped>
.management {
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
