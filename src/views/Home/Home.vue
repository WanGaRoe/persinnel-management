<template>
  <div class="home">
    <!-- <MainTop /> -->
    <div class="show">
      <div class="show-item">
        <div class="search">
          月职工调入调出情况:
          <el-date-picker
            v-model="monthCount"
            type="month"
            :clearable="false"
            placeholder="选择月">
          </el-date-picker>
          <el-select v-model="monthInOut" style="margin-left: 20px" clearable>
            <el-option value="调入">调入</el-option>
            <el-option value="调出">调出</el-option>
          </el-select>
        </div>
        <!-- 月统计图 -->
        <div id="monthStatistics" style="width:80%; height:80%; margin: 0 auto"></div>
      </div>
      <div class="show-item">
        <div class="search">
          年职工调入调出情况:
          <el-date-picker
            v-model="yearCount"
            type="year"
            :clearable="false"
            placeholder="选择年">
          </el-date-picker>
          <el-select v-model="yearInOut" style="margin-left: 20px" clearable>
            <el-option value="调入">调入</el-option>
            <el-option value="调出">调出</el-option>
          </el-select>
        </div>
        <!-- 年统计图 -->
        <div id="yearStatistics" style="width:80%; height:80%; margin: 0 auto"></div>
      </div>
      <!-- <div class="show-item"></div>
      <div class="show-item"></div> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import MainTop from '@/components/MainTop'
export default {
  name: 'Home',
  data () {
    return {
      monthCount: (new Date()).getFullYear().toString(),
      yearCount: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1),
      monthInOut: '调入',
      yearInOut: '调入',
      monthChart: '',
      yearChart: ''
    }
  },
  mounted () {
    this.monthChart = echarts.init(document.getElementById('monthStatistics'))
    this.yearChart = echarts.init(document.getElementById('yearStatistics'))
    this.getMonthStatistic()
    this.getYearStatistic()
  },
  methods: {
    // 获取统计数据
    getMonthStatistic () {
      var option = {
        title: {
          text: '月职工调入调出情况'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      this.monthChart.setOption(option)
    },
    getYearStatistic () {
      var option = {
        title: {
          text: '年职工调入调出情况'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      this.yearChart.setOption(option)
    }
  },
  components: {
    // MainTop
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
      // height: 50%;
      width: 49%;
      &:first-of-type {
        border-right: 1px solid #F2F2F2;
        // border-bottom: 1px solid #F2F2F2;
      }
      // &:last-of-type {
      //   border-top: 1px solid #F2F2F2;
      //   border-left: 1px solid #F2F2F2;
      // }
      .search {
        padding: 10px;
        text-align: center;
      }
    }
  }
}
</style>
