<template>
  <div class="home">
    <!-- <MainTop /> -->
    <div class="show">
      <div class="show-item">
        <div class="search">
          <el-date-picker
            v-model="monthCount"
            type="month"
            :clearable="false"
            placeholder="选择月"
            @change="monthChange"
            format="yyyy-MM"
            value-format="yyyy-MM"
            >
          </el-date-picker>
          <el-select v-model="monthInOut" style="margin-left: 20px" @change="monthTypeChange">
            <el-option value="调入">调入</el-option>
            <el-option value="调出">调出</el-option>
          </el-select>
        </div>
        <!-- 月统计图 -->
        <div id="monthStatistics" style="width:80%; height:80%; margin: 0 auto"></div>
      </div>
      <div class="show-item">
        <div class="search">
          <el-date-picker
            v-model="yearCount"
            type="year"
            :clearable="false"
            placeholder="选择年"
            @change="yearChange"
            format="yyyy"
            value-format="yyyy"
            >
          </el-date-picker>
          <el-select v-model="yearInOut" style="margin-left: 20px" @change="yearTypeChange">
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
import personService from '@/services/person.service'
// import MainTop from '@/components/MainTop'
export default {
  name: 'Home',
  data () {
    return {
      monthCount: (new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1) < 10 ? '0' + ((new Date()).getMonth() + 1) : ((new Date()).getMonth() + 1)),
      yearCount: (new Date()).getFullYear().toString(),
      // monthCount: '',
      // yearCount: '',
      monthInOut: '调入',
      yearInOut: '调入',
      monthChart: '',
      yearChart: '',
      monthX: [],
      monthY: [],
      yearX: [],
      yearY: []
    }
  },
  async mounted () {
    this.monthChart = echarts.init(document.getElementById('monthStatistics'))
    this.yearChart = echarts.init(document.getElementById('yearStatistics'))
    await this.getData()
    this.getMonthStatistic()
    this.getYearStatistic()
  },
  methods: {
    monthTypeChange () {
      this.getMonthStatistics()
    },

    yearTypeChange () {
      this.getYearStatistics()
    },

    getData () {
      this.getMonthStatistics()
      this.getYearStatistics()
    },
    // 获取统计数据
    getMonthStatistic () {
      var option = {
        // color: ['#2C8CEC'],
        title: {
          text: '月职工调入调出情况'
        },
        tooltip: {},
        legend: {
          data: ['人数']
        },
        xAxis: {
          data: this.monthX
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: this.monthY
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
          data: ['人数']
        },
        xAxis: {
          data: this.yearX
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: this.yearY
        }]
      }
      this.yearChart.setOption(option)
    },
    // 获取月统计
    async getMonthStatistics () {
      this.monthChart.showLoading()
      let res = await personService.getStaffStatistics({
        type: this.monthInOut === '调入' ? 1 : 2,
        start: this.monthCount + '-01 00:00:00',
        end: this.monthCount + '-31 23:59:59'
      })
      this.monthChart.hideLoading()
      if (res.status === 0) {
        this.monthY = res.data.map(item => item.count)
        this.monthX = res.data.map(item => item.name)
        this.getMonthStatistic()
      }
    },
    // 获取年统计
    async getYearStatistics () {
      this.yearChart.showLoading()
      let res = await personService.getStaffStatistics({
        type: this.yearInOut === '调入' ? 1 : 2,
        start: this.yearCount + '-01-01 00:00:00',
        end: this.yearCount + '-12-31 23:59:59'
      })
      this.yearChart.hideLoading()
      if (res.status === 0) {
        this.yearY = res.data.map(item => item.count)
        this.yearX = res.data.map(item => item.name)
        this.getYearStatistic()
      }
    },
    // 月份改变
    monthChange (month) {
      console.log(month, this.monthCount)
      this.getMonthStatistics()
    },
    // 年份改变
    yearChange (year) {
      console.log(year)
      this.getYearStatistics()
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
