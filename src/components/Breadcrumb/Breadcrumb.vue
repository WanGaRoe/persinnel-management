<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in routes" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['routes'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.Breadcrumb {
  .el-breadcrumb {
    font-size: 18px;
  }
}
</style>
