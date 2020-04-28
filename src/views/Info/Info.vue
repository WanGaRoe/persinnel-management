<template>
  <div class="info">
    <MainTop />
    <div class="info-table">
      <el-input placeholder="请输入姓名" v-model="name"></el-input>
      <el-select placeholder="请选择单位" v-model="unit" style="margin-left: 20px">
        <el-option v-for="(item, index) in unitOptions" :key="index" :value="item"></el-option>
      </el-select>
      <el-button style="margin-left:20px" @click="search">查询</el-button>
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
      unitOptions: ['东直门', '天桥', '莲花池', '北郊', '内勤', '保修厂'] // 初始化选项
    }
  },
  methods: {
    search () {
      console.log(this.name, this.unit)
    }
  },
  components: {
    MainTop
  }
}
</script>

<style lang="less" scoped>
.info {
  height: 100%;
  .info-table {
    padding: 20px;
    .el-input {
      width: 300px;
    }
  }
}
</style>
