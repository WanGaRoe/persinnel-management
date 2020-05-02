<template>
  <div class="account">
    <Breadcrumb :routes="routes"></Breadcrumb>

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Account',
  data () {
    return {
      routes: [
        { name: '帐号管理' }
      ]
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>

</style>
