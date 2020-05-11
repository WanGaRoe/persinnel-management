<template>
  <div class="top-bar">
    <div class="logo">
      <img src="../../assets/top-logo.png" alt="" style="vertical-align:middle">
    </div>
    <div class="content">今天也要努力呀！</div>
    <div class="menu">
      <div>{{name}} |</div>
      <div class="exit">
        <div class="menu-item">
          <div @click="exit" style="height:100%">退出系统<img src="../../assets/exit.svg" alt="" style="vertical-align:text-top;margin-left:4px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginService from '@/services/login.service'
import { mapMutations } from 'vuex'
export default {
  name: 'TopBar',
  data () {
    return {
      name: sessionStorage.getItem('loginName'),
      activeId: '1',
      menu: [
        {
          id: '1',
          name: '高管页面',
          url: '/home'
        },
        {
          id: '2',
          name: '员工管理',
          url: '/management'
        },
        {
          id: '3',
          name: '员工信息',
          url: '/info'
        }
      ]

    }
  },
  methods: {
    ...mapMutations(['SET_SHOW_PAGE']),
    // 点击上方菜单
    handleClickMenu (menu) {
      this.activeId = menu.id
      this.$router.push(menu.url)
    },
    async exit () {
      let res = await loginService.logout()
      if (res.status === 0) {
        this.SET_SHOW_PAGE(false)
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  height: 120px;
  line-height: 120px;
  background: rgba(73, 67, 57, 1);
  padding: 0 100px 0 100px;
  display: flex;
  .content {
    font-size: 36px;
    color: #fff;
    margin-left: 30px;
  }
  .menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-left: 60px;
    font-size: 32px;
    color: #fff;
    .menu-box {
      display: flex;
    }
    .menu-item {
      height: 100%;
      width: 200px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
