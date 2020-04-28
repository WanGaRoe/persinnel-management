<template>
  <div class="home">
    <MainTop />
    <div class="show">
      <div class="show-item">
        <div class="search">
          月职工调入调出情况:<el-select placeholder="月职工调入、调出情况" v-model="monthCount">
            <el-option v-for="item in 12" :key="item" :value="item">{{ item.toString() }}</el-option>
          </el-select>
          <el-select v-model="monthInOut" style="margin-left: 20px">
            <el-option value="调入">调入</el-option>
            <el-option value="调出">调出</el-option>
          </el-select>
        </div>
      </div>
      <div class="show-item">
        <div class="search">
          年职工调入调出情况:<el-select placeholder="年职工调入、调出情况" v-model="monthCount">
            <el-option v-for="item in 12" :key="item" :value="item">{{ item.toString() }}</el-option>
          </el-select>
          <el-select v-model="monthInOut" style="margin-left: 20px">
            <el-option value="调入">调入</el-option>
            <el-option value="调出">调出</el-option>
          </el-select>
        </div>
      </div>
      <div class="show-item"></div>
      <div class="show-item"></div>
    </div>
  </div>
</template>

<script>
import MainTop from '@/components/MainTop'
export default {
  name: 'Home',
  data () {
    return {
      monthCount: '',
      monthInOut: ''
    }
  },
  components: {
    MainTop
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .show {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .show-item {
      height: 50%;
      width: 49%;
      &:first-of-type {
        border-right: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
      }
      &:last-of-type {
        border-top: 1px solid #F2F2F2;
        border-left: 1px solid #F2F2F2;
      }
      .search {
        padding: 10px;
        text-align: center;
      }
    }
  }
}
</style>
