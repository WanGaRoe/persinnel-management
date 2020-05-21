<template>
  <div :class="{'left-bar': true, 'width256': !isCollapes}">
    <el-menu
      :collapse="isCollapes"
      :default-active="active"
      @select="onSelect"
      text-color="#c172f46"
      unique-opened
    >
      <menu-item :menuList="leftNav" :isCollapes="isCollapes"></menu-item>
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
      leftNav: [],
      isCollapes: false,
      screenWidth: 0
    }
  },
  mounted () {
    this.getMenu()
    const that = this
    if (document.body.clientWidth < 992) {
      that.isCollapes = true
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
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
  watch: {
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false
          if (that.screenWidth < 992) {
            that.isCollapes = true
          } else {
            that.isCollapes = false
          }
        }, 100)
      }
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
.width256{
  width: 256px;
};
.left-bar {
  // width: 256px;
  height: 100%;
  display: flex;
  text-align: center;
  font-size: 20px;
  flex-direction: column;
  align-items: center;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 256px;
    min-height: 400px;
  }
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
