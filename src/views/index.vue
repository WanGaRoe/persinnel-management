<template>
  <div class="main">
    <TopBar></TopBar>
    <div class="main-body">
      <div class="left-bar">
        <LeftBar/>
      </div>
      <div class="content-bar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import LeftBar from '@/components/LeftBar'
export default {
  name: 'index',
  data () {
    return {

    }
  },
  components: {
    TopBar,
    LeftBar
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .main-body {
    height: calc(100% - 120px);
    display: flex;
    .content-bar {
      padding: 20px;
      flex: 1;
    }
  }
}
</style>
