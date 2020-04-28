<template>
  <div class="info">
    <MainTop />
    <div class="info-table">
      <div>
        <el-input placeholder="请输入姓名" v-model="name"></el-input>
        <el-select placeholder="请选择单位" v-model="unit" style="margin-left: 20px">
          <el-option v-for="(item, index) in unitOptions" :key="index" :value="item"></el-option>
        </el-select>
        <el-button style="margin-left:20px" @click="search">查询</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="type" label="工种"></el-table-column>
        <el-table-column prop="date" label="入职日期"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="pageIndex"
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="tableData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
import MainTop from '@/components/MainTop'
export default {
  name: 'Info',
  data () {
    return {
      name: '', // 搜索的姓名
      unit: '', // 单位选择的值
      unitOptions: ['东直门', '天桥', '莲花池', '北郊', '内勤', '保修厂'], // 初始化选项
      pageIndex: 1, // 分页-当前页是第几页
      tableData: [
        {
          name: '张三',
          gender: '男',
          age: '28',
          unit: '内勤',
          type: '司机',
          date: '2018/10/11'
        },
        {
          name: '邓超冰',
          gender: '男',
          age: '40',
          unit: '东直门',
          type: '干部',
          date: '2009/9/19'
        },
        {
          name: '何水容',
          gender: '女',
          age: '36',
          unit: '保修厂',
          type: '保养工',
          date: '2015/4/28'
        },
        {
          name: '王德发',
          gender: '男',
          age: '31',
          unit: '北郊',
          type: '加油',
          date: '2017/12/20'
        }
      ]
    }
  },
  methods: {
    search () {
      console.log(this.name, this.unit)
    },
    handleLook (row) {
      console.log(row)
    },
    currentChange (pageIndex) {
      this.pageIndex = pageIndex
    }
  },
  components: {
    MainTop
  }
}
</script>

<style lang="less">
.info {
  height: 100%;
  .info-table {
    padding: 20px;
    .el-input {
      width: 300px;
    }
    .el-table {
      margin-top: 40px;
      th {
        font-family: 'Microsoft YaHei';
        font-weight: bold !important;
      }
    }
  }
}
</style>
