<template>
  <div>
    <template v-for="(item,index) in menuList">
      <el-menu-item v-show="item.own === 1" :class="{'menu-item-active-background':active===item.url}" class="sn-menu-item" v-if="!item.child||item.child.length===0" :index="item.url" :key="index">
        <i :class="item.name | filterIcon"></i>
        <span class="sn-menu-item-title" :class="{spacing:item.name.length===2}" slot="title">
          {{item.name}}
        </span>
      </el-menu-item>
      <el-submenu v-show="item.own === 1" class="sn-menu-item" v-else :key="index" :index="item.id + ''">
        <template slot="title">
          <i :class="item.name | filterIcon"></i>
          <span class="sn-menu-item-title" v-if="!isCollapes">
            {{item.name}}
          </span>
        </template>
        <el-menu-item-group>
          <menu-item v-if="item.child" :menuList="item.child" style="text-indent:40px"></menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </div>
</template>

<script>

export default {
  name: 'menu-item',
  computed: {
    path () {
      return this.$route.path
    },

    // 菜单激活时的url
    active () {
      let path = this.$route.path
      // if (path === '/track') {
      //   return '/person'
      // }
      return path
    }
  },
  props: {
    menuList: Array,
    isCollapes: Boolean
  },
  filters: {
    toImgUrl (val) {
      return val + '?' + new Date().getTime()
    },
    filterIcon (val) {
      let icon = ''
      switch (val) {
        case '首页统计':
          icon = 'el-icon-s-home'
          break
        case '人员管理':
          icon = 'el-icon-user-solid'
          break
        case '系统管理':
          icon = 'el-icon-s-tools'
          break
        default:
          break
      }
      return icon
    }
  }
}
</script>

<style lang="less">
.sn-menu-item-title {
  font-size: 20px
}
.menu-item-active-background {
  background-color: rgba(255, 255, 255, .4) !important;
}
</style>
