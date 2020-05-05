<template>
  <div class="management">
    <Breadcrumb :routes="routes"></Breadcrumb>
    <div class="info-table">
      <div>
        <el-input placeholder="请输入姓名" v-model="name" clearable></el-input>
        <el-select placeholder="请选择单位" v-model="unit" style="margin-left: 20px" clearable>
          <el-option v-for="(item, index) in unitOptions" :key="index" :value="item"></el-option>
        </el-select>
        <el-button style="margin-left:20px" @click="search">查询</el-button>
        <el-button type="primary" @click="handleAdd">调入</el-button>
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="role" label="性别"></el-table-column>
          <el-table-column prop="role" label="民族"></el-table-column>
          <el-table-column prop="role" label="单位"></el-table-column>
          <el-table-column prop="role" label="工种"></el-table-column>
          <el-table-column prop="role" label="入职日期"></el-table-column>
          <el-table-column prop="role" label="工资"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleInTransfer(scope.row)">内部调动</el-button>
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
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Management',
  data () {
    return {
      routes: [
        { name: '人员管理' }
      ],
      name: '',
      unit: '', // 单位
      unitOptions: ['东直门', '天桥', '莲花池', '北郊', '内勤', '保修厂'], // 初始化选项
      tableData: [],
      pageIndex: 1
    }
  },
  methods: {
    search () {

    },
    // 编辑
    handleEdit () {

    },
    // 调入
    handleAdd () {

    },
    // 调出
    handleDelete () {

    },
    // 内部调动
    handleInTransfer () {

    },
    // 页面改变
    currentChange () {

    }
  },
  components: {
    Breadcrumb
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
