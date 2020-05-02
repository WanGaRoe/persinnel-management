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
export default {
  name: 'LeftBar',
  data () {
    return {
      leftNav: [
        {
          id: '1',
          name: '首页',
          url: '/home'
        },
        {
          id: '2',
          name: '人员管理',
          url: '/management'
        },
        {
          id: '3',
          name: '考勤管理',
          url: '/attendance'
        },
        {
          id: '4',
          name: '工资管理',
          url: '/salary'
        },
        {
          id: '5',
          name: '系统管理',
          children: [
            {
              id: '6',
              name: '帐号管理',
              url: '/account'
            },
            {
              id: '7',
              name: '角色管理',
              url: '/role'
            }
          ]
        }
      ]
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
  
  methods: {
    onSelect (index, path) {
      // console.log(index, path)
      this.$router.push({
        path: index
      })
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
