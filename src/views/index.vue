<template>
  <div class="main">
    <TopBar></TopBar>
    <div class="main-body">
      <div class="left-bar">
        <LeftBar/>
      </div>
      <div class="content-bar" v-if="showPage">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import LeftBar from '@/components/LeftBar'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['showPage'])
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
