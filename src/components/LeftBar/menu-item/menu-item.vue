<template>
  <div>
    <template v-for="(item,index) in menuList">
      <el-menu-item :class="{'menu-item-active-background':active===item.url}" class="sn-menu-item" v-if="!item.children||item.children.length===0" :index="item.url" :key="index">
        <span class="sn-menu-item-title" :class="{spacing:item.name.length===2}" slot="title">
          {{item.name}}
        </span>
      </el-menu-item>
      <el-submenu class="sn-menu-item" v-else :key="index" :index="item.id">
        <template slot="title">
          <span class="sn-menu-item-title">
            {{item.name}}
          </span>
        </template>
        <menu-item v-if="item.children" :menuList="item.children" style="text-indent:40px"></menu-item>
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
    active () {
      let path = this.$route.path
      // if (path === '/track') {
      //   return '/person'
      // } else if (path === '/video/record') {
      //   return '/video'
      // } else if (path === '/system/permission') {
      //   return '/system/role'
      // } else if (path === '/importPerson') {
      //   return '/tempGroup'
      // } else if (path === '/person-hire' || path === '/person-staff/modify' || path === '/person-hire/modify') {
      //   return '/person-staff'
      // } else if (path === '/schoolfellow/graduate' || path === '/schoolfellow/staff' || path === '/schoolfellow/staff/detail' || path === '/schoolfellow/employer' ||
      //   path === '/schoolfellow/employer/detail') {
      //   return '/schoolfellow/undergraduate'
      // }
      return path
    }
  },
  props: {
    menuList: Array
  },
  filters: {
    toImgUrl (val) {
      return val + '?' + new Date().getTime()
    }
  }
}
</script>

<style lang="less">

.el-submenu__icon-arrow.el-icon-arrow-down {
  // color: #fff;
}

.sn-menu-item-title {
  font-size: 20px
}
.el-submenu__title {
  // padding-left: 24px !important;
}
.menu-item-active-background {
  background-color: rgba(255, 255, 255, .4) !important;
}
</style>
