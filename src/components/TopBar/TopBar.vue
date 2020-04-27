<template>
  <div class="top-bar">
    <div class="logo">
      <img src="../../assets/top-logo.png" alt="" style="vertical-align:middle">
    </div>
    <div class="content">今天也要努力呀！</div>
    <div class="menu">
      <div class="menu-box">
        <div v-for="item in menu" :key="item.id" :class="{'active': activeId === item.id, 'menu-item': true}" >
          <div @click="handleClickMenu(item)" style="height:100%">{{ item.name }}</div>
        </div>
      </div>
      <div></div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data () {
    return {
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
    // 点击上方菜单
    handleClickMenu (menu) {
      console.log(menu)
      this.activeId = menu.id
      // this.$router.push(menu.path)
    }
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  height: 120px;
  line-height: 120px;
  background: rgba(73, 67, 57, 1);
  padding: 0 100px;
  display: flex;
  .content {
    font-size: 36px;
    color: #fff;
    margin-left: 30px;
  }
  .menu {
    display: flex;
    margin-left: 60px;
    font-size: 30px;
    color: #fff;
    .menu-item {
      height: 100%;
      width: 200px;
      text-align: center;
      cursor: pointer;
    }
    .active {
      background: rgba(255,255,255,.5);
    }
  }
}
</style>
