<template>
  <div class="left-bar">
    <el-menu
      :default-active="active"
      @select="onSelect"
      text-color="#c172f46"
      unique-opened
    >
      <menu-item :menuList="leftNav"></menu-item>
    </el-menu>
  </div>
</template>

<script>
import menuItem from './menu-item'
import { mapMutations } from 'vuex'
import menuService from '@/services/menu.service'
export default {
  name: 'LeftBar',
  data () {
    return {
      leftNav: []
    }
  },
  mounted () {
    this.getMenu()
  },
  computed: {
    active () {
      let path = this.$route.path
      // console.log(path)
      if (path === '/track') {
        return '/person'
      }
      return path
    }
  },

  methods: {
    ...mapMutations(['SET_SHOW_PAGE']),
    // 点击菜单
    onSelect (index, path) {
      // console.log(index, path)
      this.$router.push({
        path: index
      })
    },
    getFirstPage (tree) {
      let path
      if (tree instanceof Array) {
        for (let i = 0; i < tree.length; i++) {
          const el = tree[i]
          if (el.own === 1) {
            if (el.child.length > 0) {
              path = this.getFirstPage(el.child)
            } else {
              path = el.url
            }
            if (path) {
              break
            }
          }
        }
      }
      return path
    },
    async getMenu () {
      let res = await menuService.getMenu()
      if (res.status === 0) {
        this.leftNav = res.data
        let path = this.getFirstPage(res.data)
        if (this.$route.path === '/home') {
          if (path !== '/home') {
            this.$router.replace(path)
          }
        }
        this.SET_SHOW_PAGE(true)
      }
    }
  },
  components: {
    menuItem
  }
}
</script>

<style lang="less">
.left-bar {
  width: 256px;
  height: 100%;
  display: flex;
  text-align: center;
  font-size: 20px;
  flex-direction: column;
  align-items: center;
  .el-menu {
    // margin-top: 60px;
    height: 100%;
    width: 100%;
    border-right: none;
    background-color: #494339 !important;
    user-select: none;
    .el-submenu {
      color: #fff;
      //导航颜色
      .el-submenu__title {
        background-color: #494339 !important;
      }
      .el-submenu__title {
        color: #fff;
        & > i {
          color: #fff;
        }
      }
    }
    .el-menu-item {
      height: 64px;
      font-size: 20px;
      line-height: 64px;
      color: #fff;
      &:hover {
        background: rgba(255, 255, 255, .4)
      }
    }
  }
}
</style>
